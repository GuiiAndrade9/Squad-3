import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { SchoolsService } from './schools.service';

class CreateSchoolDto {
  @IsString() name!: string;
  @IsOptional() @IsString() legalName?: string;
  @IsOptional() @IsString() cnpj?: string;
  @IsOptional() @IsString() inepCode?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() zipCode?: string;
}

@Controller('schools')
export class SchoolsController {
  constructor(private readonly service: SchoolsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateSchoolDto) { return this.service.create(dto); }
}
