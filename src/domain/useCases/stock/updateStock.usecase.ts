import { UpdateStockDTO } from 'src/shared/dtos/updateStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';

export interface UpdateStock {
  update(data: UpdateStockDTO): Promise<Stock>;
}
