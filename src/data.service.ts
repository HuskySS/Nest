import { Injectable, OnModuleInit } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export interface Customer {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class DataService implements OnModuleInit {
  private customers: Customer[] = [];
  private currentId = 1;

  async onModuleInit() {
    this.seedData(); 
   }

  // Metoda pro generování náhodných dat
  private seedData() {
    for (let i = 0; i < 10; i++) {
      this.create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
      });
    }
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: number): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  create(customerData: Omit<Customer, 'id'>): Customer {
    const newCustomer: Customer = {
      id: this.currentId++,
      ...customerData,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, updateCustomerDto: Partial<Omit<Customer, 'id'>>): Customer | undefined {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex > -1) {
      this.customers[customerIndex] = { ...this.customers[customerIndex], ...updateCustomerDto };
      return this.customers[customerIndex];
    }
    return undefined;
  }
}
