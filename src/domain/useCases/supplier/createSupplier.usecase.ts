import { CreateSupplierDTO } from 'src/shared/dtos/supplier/createSupplier.dto';
import { Supplier } from 'src/shared/entities/supplier.entity';

export interface CreateSupplier {
  create(data: CreateSupplierDTO): Promise<Supplier>;
}
