import { Injectable, Inject } from '@nestjs/common';
import { CreateStockDTO } from 'src/shared/dto/createStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateStockService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private stockRepository: Repository<Stock>,
  ) {}

  async create(data: CreateStockDTO): Promise<Stock> {
    const stock = this.stockRepository.create(data);
    await this.stockRepository.save(stock);

    return stock;
  }
}
