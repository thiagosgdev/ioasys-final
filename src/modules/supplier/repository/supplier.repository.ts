import { InjectRepository } from '@nestjs/typeorm';
import { CreateSupplier } from 'src/domain/useCases/supplier/createSupplier.usecase';
import { ListSuppliers } from 'src/domain/useCases/supplier/listSuppliers.usecase';
import { Repository } from 'typeorm';
import { CreateSupplierDTO } from '../../../shared/dtos/supplier/createSupplier.dto';
import { Supplier } from '../../../shared/entities/supplier.entity';

export class SupplierRepo implements CreateSupplier, ListSuppliers {
  constructor(
    @InjectRepository(Supplier)
    private readonly repository: Repository<Supplier>,
  ) {}
  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const supplier = this.repository.create(data);
    await this.repository.save(supplier);

    return supplier;
  }
  async list(): Promise<Supplier[]> {
    return await this.repository.find();
  }
}
