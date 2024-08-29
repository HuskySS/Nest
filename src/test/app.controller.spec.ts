import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app/app.controller';
import { DataService } from '../data/data.service';
import { dataServiceMock } from '../data/data.service.mock'; 

describe('AppController', () => {
  let appController: AppController;
  let dataService: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: DataService, useValue: dataServiceMock }, 
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    dataService = module.get<DataService>(DataService);
  });

  it('everything allright', () => {
    expect(appController).toBeDefined();
  });

  it('return all customers', () => {
    const result = appController.findAll();
    expect(result).toEqual([
      { id: 1, name: 'nobody', email: 'nobody@nobody.com' },
      { id: 2, name: 'mock', email: 'mock@mock.com' },
    ]);
    expect(dataService.findAll).toHaveBeenCalled();
  });

  it('find customers by ID', () => {
    const result = appController.findOne(1);
    expect(result).toEqual({ id: 1, name: 'nobody', email: 'nobody@nobody.com' });
    expect(dataService.findOne).toHaveBeenCalledWith(1);
  });

  it('create customers', () => {
    const customerData = { name: 'somebody', email: 'somebody@somebody.com' };
    const result = appController.create(customerData);
    expect(result).toEqual({ id: 3, ...customerData });
    expect(dataService.create).toHaveBeenCalledWith(customerData);
  });

  it('update customers', () => {
    const updateData = { name: 'newname' };
    const result = appController.update(1, updateData);
    expect(result).toEqual({ id: 1, ...updateData });
    expect(dataService.update).toHaveBeenCalledWith(1, updateData);
  });
});
