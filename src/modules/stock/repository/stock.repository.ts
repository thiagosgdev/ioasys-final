import { InjectRepository } from '@nestjs/typeorm';
import { CreateStock } from 'src/domain/useCases/stock/createStock.usecase';
import { FindStockByProductId } from 'src/domain/useCases/stock/findStockByProductId.usecase';
import { ListStock } from 'src/domain/useCases/stock/listStock.usecase';
import { UpdateStock } from 'src/domain/useCases/stock/updateStock.usecase';
import { UpdateOrderDTO } from 'src/shared/dtos/order/updateOrder.dto';
import { Order } from 'src/shared/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateStockDTO } from '../../../shared/dtos/stock/createStock.dto';
import { UpdateStockDTO } from '../../../shared/dtos/stock/updateStock.dto';
import { Stock } from '../../../shared/entities/stock.entity';

export class StockRepo
  implements CreateStock, ListStock, UpdateStock, FindStockByProductId
{
  constructor(
    @InjectRepository(Stock)
    private readonly repository: Repository<Stock>,
  ) {}

  async create(data: CreateStockDTO): Promise<Stock> {
    const stock = this.repository.create(data);
    await this.repository.save(stock);
    return stock;
  }

  async list(): Promise<Stock[]> {
    return await this.repository.find();
  }

  async update(data: UpdateStockDTO): Promise<Stock> {
    const stock = await this.repository.findOne({ id: data.id });
    const newStock = await this.repository.save({
      ...stock,
      ...data,
    });

    return newStock;
  }

  async findByProduct(product_id: string): Promise<Stock> {
    const stock = await this.repository.findOne({
      where: {
        product_id,
      },
    });
    return stock;
  }
  async findById(id: string): Promise<Stock> {
    const stock = await this.repository.findOne(id);
    return stock;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
