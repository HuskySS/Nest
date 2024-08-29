import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { Customer } from '../data/data.service'; 

@Controller('customers')
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  findAll(): Customer[] { 
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Customer | undefined { // Použití typu Customer
    return this.dataService.findOne(id);
  }

  @Post()
  create(@Body() createCustomerDto: Omit<Customer, 'id'>): Customer { // Použití typu Customer
    return this.dataService.create(createCustomerDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto: Partial<Omit<Customer, 'id'>>): Customer | undefined { // Použití typu Customer
    return this.dataService.update(id, updateCustomerDto);
  }
}
