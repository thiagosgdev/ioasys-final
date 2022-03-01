import { Test } from '@nestjs/testing';
import MockDate from 'mockdate';
import { CreateSupplierDTO } from 'src/shared/dtos/supplier/createSupplier.dto';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { mockResponse } from 'src/shared/tests/http';

import { CreateSupplierController } from './createSupplier.controller';
import { CreateSupplierService } from './createSupplier.service';

const mockCreateSupplierService = {
  create: jest.fn((dto) => {
    return mockCreateSupplierResponse();
  }),
};

const mockCreateSupplierDTO = (): CreateSupplierDTO => ({
  email: 'test@test.com',
  name: 'Test name',
  company_registration: 'Test registration',
  phone: 123456789,
  representative_name: 'Test',
  website: 'test.com.br',
});

const mockCreateSupplierResponse = (): Supplier => ({
  id: '02a9c9b1-c291-45bd-a382-629ed0c767bb',
  email: 'test@test.com',
  name: 'Test name',
  company_registration: 'Test registration',
  phone: 123456789,
  representative_name: 'Test',
  website: 'test.com.br',
  created_at: new Date(),
  products: null,
  updated_at: null,
  deleted_at: null,
});

describe('Create Supplier Controller', () => {
  let SupplierController: CreateSupplierController;

  beforeEach(async () => {
    MockDate.set(new Date());

    const moduleRef = await Test.createTestingModule({
      controllers: [CreateSupplierController],
      providers: [CreateSupplierService],
    })
      .overrideProvider(CreateSupplierService)
      .useValue(mockCreateSupplierService)
      .compile();

    SupplierController = moduleRef.get<CreateSupplierController>(
      CreateSupplierController,
    );
  });

  describe('Create Supplier', () => {
    it('Should return the Created Supplier', async () => {
      const result: Supplier = mockCreateSupplierResponse();
      expect(
        await SupplierController.create(mockCreateSupplierDTO(), mockResponse),
      ).toEqual(result);
    });
  });
});
