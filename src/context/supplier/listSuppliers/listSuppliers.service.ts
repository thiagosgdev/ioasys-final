import { Injectable, Inject } from '@nestjs/common';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListSuppliersService {
  constructor(
    @Inject('SUPPLIER_REPOSITORY')
    private supplierRepository: Repository<Supplier>,
  ) {}

  async list(): Promise<Supplier[]> {
    const suppliers = await this.supplierRepository.query(
      `SELECT * FROM suppliers`,
    );

    return suppliers;
  }
}
