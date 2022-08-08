import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOccupationInput } from './dto/create-occupation.input';
import { UpdateOccupationInput } from './dto/update-occupation.input';
import { OccupationEntity } from './entities/occupation.entity';
import { OccupationRepository } from './repositories/occupation.repository';
import { CompanyRepository } from 'src/company/repositories/company.repository';

@Injectable()
export class OccupationService {
  constructor(
    private readonly repository: OccupationRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}
  async create(createOccupationInput: CreateOccupationInput): Promise<OccupationEntity> {
    const { code, companyId } = createOccupationInput;

    const existsCompany = companyId && await this.companyRepository.findOne(companyId);

    if (companyId && !existsCompany) {
      throw new ConflictException('Company not found');
    }

    const occupationAlreadyExists = await this.repository.findByCode(
      code
    );

    if (occupationAlreadyExists) {
      throw new ConflictException('Occupation already exists');
    }
    
    return this.repository.create(createOccupationInput);
  }

  async findAll(): Promise<OccupationEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const occupation = await this.repository.findOne(id);

    if (!occupation) {
      throw new NotFoundException('Occupation not found');
    }

    return this.repository.findOne(id);
  }

  async remove(id: string) {
    const occupation = await this.repository.findOne(id);

    if (!occupation) {
      throw new NotFoundException('Occupation not found');
    }

    return this.repository.remove(id);
  }

  async update(id: string, { companyId, ...properties }: UpdateOccupationInput) {

    const existsCompany = companyId && await this.companyRepository.findOne(companyId);

    if (companyId && !existsCompany) {
      throw new ConflictException('Company not found');
    }

    const occupation = await this.repository.findOne(id);

    if (!occupation) {
      throw new NotFoundException('Occupation not found');
    }
    
    return this.repository.update(id, properties );
  }
}
