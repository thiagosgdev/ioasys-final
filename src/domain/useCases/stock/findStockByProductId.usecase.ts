import { Stock } from 'src/shared/entities/stock.entity';

export interface FindStockByProductId {
  findByProduct(id: string): Promise<Stock>;
}
