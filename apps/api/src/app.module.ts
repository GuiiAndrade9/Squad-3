import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SchoolsController } from './schools/schools.controller';
import { SchoolsService } from './schools/schools.service';
import { ClassroomsController } from './classrooms/classrooms.controller';
import { ClassroomsService } from './classrooms/classrooms.service';

@Module({
  controllers: [SchoolsController, ClassroomsController],
  providers: [PrismaService, SchoolsService, ClassroomsService],
})
export class AppModule {}
