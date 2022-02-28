import { UpdateStockDTO } from 'src/shared/dtos/stock/updateStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';

export interface UpdateStock {
  update(data: UpdateStockDTO): Promise<Stock>;
}
