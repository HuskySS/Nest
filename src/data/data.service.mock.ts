
export const dataServiceMock = {
  findAll: jest.fn(() => [
    { id: 1, name: 'nobody', email: 'nobody@nobody.com' },
    { id: 2, name: 'mock', email: 'mock@mock.com' },
  ]),
  findOne: jest.fn((id: number) => ({ id, name: 'nobody', email: 'nobody@nobody.com' })),
  create: jest.fn((customerData) => ({ id: 3, ...customerData })),
  update: jest.fn((id: number, updateCustomerDto) => ({ id, ...updateCustomerDto })),
};
