// src/data/data.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a customer', () => {
    const customerData = { name: 'Johnny Silverhand', email: 'johnnysilverhand@2077.com' };
    const createdCustomer = service.create(customerData);

    expect(createdCustomer).toEqual({
      id: expect.any(Number),
      name: 'Johnny Silverhand',
      email: 'johnnysilverhand@2077.com',
    });
    expect(service.findAll()).toContainEqual(createdCustomer);
  });

  it('should return all customers', () => {
    const customerData1 = { name: 'Johnny Silverhand', email: 'johnnysilverhand@2077.com' };
    const customerData2 = { name: 'David Martinez', email: 'DMartinez@2077.com' };

    service.create(customerData1);
    service.create(customerData2);

    const customers = service.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(expect.objectContaining(customerData1));
    expect(customers).toContainEqual(expect.objectContaining(customerData2));
  });

  it('find customers by ID', () => {
    const customerData = { name: 'Johnny Silverhand', email: 'johnnysilverhand@2077.com' };
    const createdCustomer = service.create(customerData);

    const foundCustomer = service.findOne(createdCustomer.id);

    expect(foundCustomer).toEqual(createdCustomer);
  });

  it('should update a customer by ID', () => {
    const customerData ={ name: 'Johnny Silverhand', email: 'johnnysilverhand@2077.com' };
    const createdCustomer = service.create(customerData);

    const updateData = { name: 'V',email:'v@2077.com' };
    const updatedCustomer = service.update(createdCustomer.id, updateData);

    expect(updatedCustomer).toEqual({
      id: createdCustomer.id,
      name: 'V',
      email: 'v@2077.com' ,
    });
    expect(service.findOne(createdCustomer.id)).toEqual(updatedCustomer);
  });

  it('error ', () => {
    const updateData = { name: 'Non Existing' };
    const updatedCustomer = service.update(999, updateData); // Neexistující ID

    expect(updatedCustomer).toBeUndefined();
  });
});
