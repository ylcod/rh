import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyRepository } from './repositories/company.repository';

@Module({
  providers: [
    CompanyResolver,
    CompanyService,
    PrismaService,
    CompanyRepository,
  ],
})
export class CompanyModule {}
