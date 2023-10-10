import { Injectable } from '@nestjs/common';
import { Tea } from './entities/tea.entity/tea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeaInput } from './dto/create-tea.input/create-tea.input';

@Injectable()
export class TeasService {
  constructor(
    @InjectRepository(Tea)
    private readonly teasRepository: Repository<Tea>,
  ) {}

  async findAll() {
    return this.teasRepository.find();
  }

  async create(createTeaInput: CreateTeaInput) {
    const tea = this.teasRepository.create(createTeaInput);
    return this.teasRepository.save(tea);
  }
}
