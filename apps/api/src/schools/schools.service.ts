import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchoolsService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: any) { return this.prisma.school.create({ data }); }
  findAll() { return this.prisma.school.findMany({ orderBy: { name: 'asc' } }); }
  findOne(id: string) { return this.prisma.school.findUnique({ where: { id } }); }
}
