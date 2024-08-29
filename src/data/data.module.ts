import { Module } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Module({
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
