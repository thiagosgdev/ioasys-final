import { Injectable } from '@nestjs/common';

import { Supplier } from 'src/shared/entities/supplier.entity';
import { SupplierRepo } from 'src/modules/supplier/repository/supplier.repository';
import { UpdateSupplierDTO } from 'src/shared/dtos/supplier/updateSupplier.dto';

@Injectable()
export class UpdateSupplierService {
  constructor(private supplierRepository: SupplierRepo) {}

  async update(data: UpdateSupplierDTO): Promise<Supplier> {
    const supplier = await this.supplierRepository.update(data);
    if (!supplier) {
      return null;
    }
    return supplier;
  }
}
