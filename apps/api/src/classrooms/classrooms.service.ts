import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Shift } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const periods = [
  ['1º','07:00','07:50'],['2º','07:50','08:40'],['3º','08:40','09:30'],
  ['4º','09:50','10:40'],['5º','10:40','11:30'],['6º','11:30','12:20']
] as const;

@Injectable()
export class ClassroomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(schoolId: string, dto: { academicYearId:string; gradeLevelId:string; name:string; shift:Shift; room?:string; capacity?:number }) {
    return this.prisma.$transaction(async (tx) => {
      const school = await tx.school.findUnique({ where: { id: schoolId } });
      if (!school) throw new NotFoundException('Escola não encontrada.');
      const year = await tx.academicYear.findFirst({ where: { id:dto.academicYearId, schoolId } });
      if (!year) throw new NotFoundException('Ano letivo não pertence à escola.');
      const grade = await tx.gradeLevel.findFirst({ where: { id:dto.gradeLevelId, OR:[{schoolId},{schoolId:null}] } });
      if (!grade) throw new NotFoundException('Série não encontrada.');
      const template = await tx.curriculumTemplate.findFirst({ where:{ gradeLevelId:dto.gradeLevelId, isDefault:true, OR:[{schoolId},{schoolId:null}] }, include:{ subjects:{ include:{subject:true} } } });
      if (!template) throw new BadRequestException('Matriz curricular padrão não encontrada.');

      const classroom = await tx.classroom.create({ data:{ schoolId, academicYearId:dto.academicYearId, gradeLevelId:dto.gradeLevelId, curriculumTemplateId:template.id, name:dto.name, shift:dto.shift, room:dto.room, capacity:dto.capacity } });
      const classSubjects:any[]=[];
      for(const item of template.subjects){
        classSubjects.push(await tx.classSubject.create({data:{ classroomId:classroom.id, subjectId:item.subjectId, weeklyHours:item.weeklyHours, annualHours:item.annualHours, weeklyClasses:item.weeklyClasses }}));
      }
      await this.generateSchedule(tx, classroom.id, classSubjects);
      return tx.classroom.findUnique({where:{id:classroom.id},include:{subjects:{include:{subject:true}},schedules:true}});
    });
  }

  private async generateSchedule(tx: Prisma.TransactionClient, classroomId:string, subjects:any[]) {
    const days=[1,2,3,4,5]; const queue:string[]=[];
    for(const s of subjects) for(let i=0;i<s.weeklyClasses;i++) queue.push(s.id);
    let cursor=0;
    for(const day of days){
      const used=new Set<string>();
      for(const slot of periods){
        if(!queue.length) return;
        let pos=queue.findIndex(id=>!used.has(id)); if(pos<0) pos=0;
        const subjectId=queue.splice(pos,1)[0]; used.add(subjectId);
        await tx.classSchedule.create({data:{classroomId,classSubjectId:subjectId,weekday:day,period:periods.indexOf(slot)+1,startTime:slot[1],endTime:slot[2]}});
        cursor++;
      }
    }
  }

  findBySchool(schoolId:string){ return this.prisma.classroom.findMany({where:{schoolId},include:{subjects:{include:{subject:true}},schedules:true},orderBy:{name:'asc'}}); }
}
