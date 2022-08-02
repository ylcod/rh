import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { CompanyEntity } from './entities/company.entity';
import { CompanyRepository } from './repositories/company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}
  async create(createCompanyInput: CreateCompanyInput): Promise<CompanyEntity> {
    const companyAlreadyExists = await this.repository.findByCnpj(
      createCompanyInput.cnpj,
    );

    if (companyAlreadyExists) {
      throw new ConflictException('Company already exists');
    }

    return this.repository.create(createCompanyInput);
  }

  async findAll(): Promise<CompanyEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const isObjectId = isMongoId(id);

    if (!isObjectId) {
      throw new BadRequestException('Mongo ID is invalid');
    }

    const company = await this.repository.findOne(id);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.repository.findOne(id);
  }

  async update(id: string, updateCompanyInput: UpdateCompanyInput) {
    const isObjectId = isMongoId(id);

    if (!isObjectId) {
      throw new BadRequestException('Mongo ID is invalid');
    }

    const company = await this.repository.findOne(id);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.repository.update(id, updateCompanyInput);
  }

  async remove(id: string) {
    const isObjectId = isMongoId(id);

    if (!isObjectId) {
      throw new BadRequestException('Mongo ID is invalid');
    }

    const company = await this.repository.findOne(id);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.repository.remove(id);
  }
}
