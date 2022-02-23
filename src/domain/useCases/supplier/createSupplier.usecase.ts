import { CreateSupplierDTO } from 'src/shared/dtos/createSupplier.dto';
import { Supplier } from 'src/shared/entities/supplier.entity';

export interface CreateSupplier {
  create(data: CreateSupplierDTO): Promise<Supplier>;
}
