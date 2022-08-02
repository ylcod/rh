import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from '@prisma/client';

@ObjectType()
export class CompanyEntity implements Company {
  @Field(() => String)
  id: string;

  @Field(() => String)
  cnpj: string;

  @Field(() => String)
  name: string;
}
