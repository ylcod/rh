import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateOccupationInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String)
  @MaxLength(14)
  code: string;

  @Field(() => String)
  @IsMongoId()
  companyId: string
}
