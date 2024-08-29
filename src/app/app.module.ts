import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { DataService } from '../data/data.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DataService],
})
export class AppModule {}
