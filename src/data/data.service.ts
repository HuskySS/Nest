import { Injectable, OnModuleInit } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export interface Customer {
  id: number;
  name: string;
  email: string;
}

@Injectable()//available to be injected into other class
export class DataService implements OnModuleInit {
  //initiation array 
  private customers: Customer[] = [];
  private currentId = 1;

  async onModuleInit() {
    this.seedData(); 
   }

 //create seed from 1-10 for generated random customers
  private seedData() {
    for (let i = 0; i < 10; i++) {
      this.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
    }
  }
//findall customers
  findAll(): Customer[] {
    return this.customers;
  }
//find only one by id 
  findOne(id: number): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }
//create customer
  create(customerData: Omit<Customer, 'id'>): Customer {
    const newCustomer: Customer = {
      id: this.currentId++,
      ...customerData,//operator ... use to merge data 
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
//Find id of the customer with the specified ID in the array.If found soemone proceed with the update.
  update(id: number, updateCustomerDto: Partial<Omit<Customer, 'id'>>): Customer | undefined {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex > -1) {
      this.customers[customerIndex] = { ...this.customers[customerIndex], ...updateCustomerDto };
      return this.customers[customerIndex];
    }
    //if cannot find customer retirn undef
    return undefined;
  }
}
