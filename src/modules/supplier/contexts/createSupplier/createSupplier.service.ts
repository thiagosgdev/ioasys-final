import { Injectable } from '@nestjs/common';
import { CreateSupplierDTO } from 'src/shared/dtos/supplier/createSupplier.dto';
import { Supplier } from 'src/shared/entities/supplier.entity';
import { SupplierRepo } from 'src/modules/supplier/repository/supplier.repository';

@Injectable()
export class CreateSupplierService {
  constructor(private supplierRepository: SupplierRepo) {}

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const supplier = await this.supplierRepository.create(data);
    return supplier;
  }
}
