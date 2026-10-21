import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Shift } from '@prisma/client';
import { ClassroomsService } from './classrooms.service';

class CreateClassroomDto {
  @IsString() @IsNotEmpty() academicYearId!: string;
  @IsString() @IsNotEmpty() gradeLevelId!: string;
  @IsString() @IsNotEmpty() name!: string;
  @IsEnum(Shift) shift!: Shift;
  @IsOptional() @IsString() room?: string;
  @IsOptional() @IsInt() capacity?: number;
}

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly service: ClassroomsService) {}
  @Get() list(@Headers('x-school-id') schoolId:string){ return this.service.findBySchool(schoolId); }
  @Post() create(@Headers('x-school-id') schoolId:string,@Body() dto:CreateClassroomDto){ return this.service.create(schoolId,dto); }
}
