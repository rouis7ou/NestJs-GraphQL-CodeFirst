import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tea } from './entities/tea.entity/tea.entity';
import { TeasService } from './tea.service';
import { CreateTeaInput } from './dto/create-tea.input/create-tea.input';

@Resolver(() => Tea)
export class TeasResolver {
  constructor(private readonly teasService: TeasService) {}

  @Query(() => [Tea], { name: 'tea' })
  async findAll() {
    return this.teasService.findAll();
  }

  @Mutation(() => Tea, { name: 'createTea' })
  async create(@Args('createTeaInput') createTeaInput: CreateTeaInput) {
    return this.teasService.create(createTeaInput);
  }
}
