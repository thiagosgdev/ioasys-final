import { Supplier } from 'src/shared/entities/supplier.entity';

export interface ListSuppliers {
  list(): Promise<Supplier[]>;
}
