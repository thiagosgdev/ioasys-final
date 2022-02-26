import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { SupplierRepo } from 'src/shared/repositories/supplier.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ListSuppliersService {
  constructor(private supplierRepository: SupplierRepo) {}

  async list(): Promise<Supplier[]> {
    const suppliers = await this.supplierRepository.list();
    if (suppliers.length < 0) {
      throw new HttpException('Not stock Found!', HttpStatus.NOT_FOUND);
    }
    return suppliers;
  }
}
