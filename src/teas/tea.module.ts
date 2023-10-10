import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity/tea.entity';
import { TeasService } from './tea.service';
import { Module } from '@nestjs/common';
import { TeasResolver } from './teas.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tea])],
  providers: [TeasResolver, TeasService],
})
export class TeasModule {}
