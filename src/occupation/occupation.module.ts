import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OccupationService } from './occupation.service';
import { OccupationResolver } from './occupation.resolver';
import { OccupationRepository } from './repositories/occupation.repository';

@Module({
  providers: [
    OccupationResolver,
    OccupationService,
    PrismaService,
    OccupationRepository,
  ],
})

export class OccupationModule {}
