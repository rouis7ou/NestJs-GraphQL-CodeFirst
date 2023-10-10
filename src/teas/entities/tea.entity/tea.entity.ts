import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Drink } from '../../../common/interfaces/drink.interface/drink.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({
  implements: () => Drink, // ( or an array of interface such as: [Drink] )
})
export class Tea implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  name: string;
}
