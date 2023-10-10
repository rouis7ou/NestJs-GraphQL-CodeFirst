import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { DrinkResultUnion } from 'src/common/unions/drinks-result.union';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinkResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinkResultUnion)[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Blcak coffee';

    const tea = new Tea();
    tea.name = 'Lipton';

    return [tea, coffee];
  }
}
