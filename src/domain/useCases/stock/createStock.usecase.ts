import { CreateStockDTO } from 'src/shared/dtos/stock/createStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';

export interface CreateStock {
  create(data: CreateStockDTO): Promise<Stock>;
}
