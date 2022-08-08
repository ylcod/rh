import { ObjectType, Field } from '@nestjs/graphql';
import { Occupation } from '@prisma/client';

@ObjectType()
export class OccupationEntity implements Occupation {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  companyId: string;
}
