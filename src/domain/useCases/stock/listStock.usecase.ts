import { Stock } from 'src/shared/entities/stock.entity';

export interface ListStock {
  list(): Promise<Stock[]>;
}
