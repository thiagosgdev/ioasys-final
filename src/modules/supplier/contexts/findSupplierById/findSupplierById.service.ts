import { Injectable } from '@nestjs/common';
import { SupplierRepo } from 'src/modules/supplier/repository/supplier.repository';
import { Supplier } from 'src/shared/entities/supplier.entity';

@Injectable()
export class FindSupplierByIdService {
  constructor(private supplierRepository: SupplierRepo) {}

  async find(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      return null;
    }
    return supplier;
  }
}
