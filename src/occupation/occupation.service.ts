import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOccupationInput } from './dto/create-occupation.input';
import { OccupationEntity } from './entities/occupation.entity';
import { OccupationRepository } from './repositories/occupation.repository';

@Injectable()
export class OccupationService {
  constructor(private readonly repository: OccupationRepository) {}
  async create(createOccupationInput: CreateOccupationInput): Promise<OccupationEntity> {
    const { code } = createOccupationInput;

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
}
