import { CreateOccupationInput } from './create-occupation.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateOccupationInput extends PartialType(CreateOccupationInput) {
  @Field(() => String, { description: 'Occupation ID' })
  @IsMongoId()
  id: string;
}