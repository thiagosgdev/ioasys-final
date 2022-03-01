import { Injectable } from '@nestjs/common';
import { SupplierRepo } from 'src/modules/supplier/repository/supplier.repository';

@Injectable()
export class DeleteSupplierService {
  constructor(private supplierRepository: SupplierRepo) {}

  async delete(id: string): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}
