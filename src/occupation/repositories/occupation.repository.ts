import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOccupationInput } from '../dto/create-occupation.input';

@Injectable()
export class OccupationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOccupationInput: CreateOccupationInput) {
    return this.prisma.occupation.create({
      data: {
        ...createOccupationInput,
      },
    });
  }

  async findAll() {
    return this.prisma.occupation.findMany();
  }

  async findOne(id: string) {
    return this.prisma.occupation.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string) {
    return this.prisma.occupation.findUnique({
      where: { code },
    });
  }
 
  async remove(id: string) {
    return this.prisma.occupation.delete({
      where: { id },
    });
  }
}
