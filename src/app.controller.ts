import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('customers')
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dataService.findOne(id);
  }

  @Post()
  create(@Body() createCustomerDto) {
    return this.dataService.create(createCustomerDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto) {
    return this.dataService.update(id, updateCustomerDto);
  }
}
