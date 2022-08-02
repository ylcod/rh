import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyInput } from '../dto/create-company.input';
import { UpdateCompanyInput } from '../dto/update-company.input';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyInput: CreateCompanyInput) {
    return this.prisma.company.create({
      data: {
        ...createCompanyInput,
      },
    });
  }

  async findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  async findByCnpj(cnpj: string) {
    return this.prisma.company.findUnique({
      where: { cnpj },
    });
  }

  async update(id: string, { cnpj, name }: UpdateCompanyInput) {
    return this.prisma.company.update({
      where: { id },
      data: { cnpj, name },
    });
  }

  async remove(id: string) {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
