import { UpdateSupplierDTO } from 'src/shared/dtos/supplier/updateSupplier.dto';
import { Supplier } from 'src/shared/entities/supplier.entity';

export interface UpdateSupplier {
  update(data: UpdateSupplierDTO): Promise<Supplier>;
}
