import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OccupationService } from './occupation.service';
import { OccupationEntity } from './entities/occupation.entity';
import { CreateOccupationInput } from './dto/create-occupation.input';

@Resolver(() => OccupationEntity)
export class OccupationResolver {
  constructor(private readonly occupationService: OccupationService) {}

  @Mutation(() => OccupationEntity)
  createOccupation(
    @Args('createOccupationInput') createOccupationInput: CreateOccupationInput,
  ) {
    return this.occupationService.create(createOccupationInput);
  }

  @Query(() => [OccupationEntity], { name: 'allOccupations' })
  findAll() {
    return this.occupationService.findAll();
  }

  @Query(() => OccupationEntity, { name: 'occupation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.occupationService.findOne(id);
  }

  @Mutation(() => OccupationEntity)
  removeOccupation(@Args('id', { type: () => String }) id: string) {
    return this.occupationService.remove(id);
  }
}
