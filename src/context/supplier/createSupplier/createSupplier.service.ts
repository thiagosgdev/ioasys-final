import { Injectable, Inject } from '@nestjs/common';
import { CreateSupplierDTO } from 'src/shared/dto/createSupplier.dto';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateSupplierService {
  constructor(
    @Inject('SUPPLIER_REPOSITORY')
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const supplier = this.supplierRepository.create(data);
    await this.supplierRepository.save(supplier);

    return supplier;
  }
}
