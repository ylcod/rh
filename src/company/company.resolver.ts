import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';

@Resolver(() => CompanyEntity)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => CompanyEntity)
  createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companyService.create(createCompanyInput);
  }

  @Query(() => [CompanyEntity], { name: 'allCompanies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => CompanyEntity, { name: 'getCompany' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => CompanyEntity)
  updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companyService.update(
      updateCompanyInput.id,
      updateCompanyInput,
    );
  }

  @Mutation(() => CompanyEntity)
  removeCompany(@Args('id', { type: () => String }) id: string) {
    return this.companyService.remove(id);
  }
}
