import { Stock } from 'src/shared/entities/stock.entity';

export interface FindStockById {
  findById(id: string): Promise<Stock>;
}
