import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from 'src/common/eenums/coffe-type.enum';

@InputType()
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String)
  name: string;

  brand: string;

  flavors: string[];

  type: CoffeeType;
}
