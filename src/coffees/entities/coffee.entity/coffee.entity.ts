import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from '../flavor.entity/flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { CoffeeType } from 'src/common/eenums/coffe-type.enum';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';

@Entity()
@ObjectType({ description: 'Coffee model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  @JoinTable()
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: CoffeeType;
}
