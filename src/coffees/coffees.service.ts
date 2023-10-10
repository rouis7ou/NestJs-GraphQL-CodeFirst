import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';
import { UpdateCoffeeInput } from './dto/update-coffee.input/update-coffee.input';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}

  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffe ${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    const newCoffeeEntity = await this.coffeesRepository.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
    return newCoffeeEntity;
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }
}
