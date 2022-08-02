import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @MaxLength(14)
  cnpj: string;
}
