import { Injectable, Inject } from '@nestjs/common';
import { UpdateStockDTO } from 'src/shared/dto/updateStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateStockService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private stockRepository: Repository<Stock>,
  ) {}

  async update(data: UpdateStockDTO): Promise<Stock> {
    const stock = await this.stockRepository.find({ id: data.id });

    const newStock = await this.stockRepository.create(data);
    await this.stockRepository.save({
      ...stock,
      ...newStock,
    });

    return newStock;
  }
}
