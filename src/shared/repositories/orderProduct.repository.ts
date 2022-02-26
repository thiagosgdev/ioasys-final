import { Repository } from 'typeorm';
import { CreateOrderProductDTO } from '../dtos/order/CreateOrderProduct.dto';
import { OrderProduct } from '../entities/order_product.entity';

export class OrderProductRepo {
  constructor(private readonly repository: Repository<OrderProduct>) {}

  async create(data: CreateOrderProductDTO): Promise<OrderProduct> {
    const orderProduct = this.repository.create(data);
    await this.repository.save(orderProduct);
    return orderProduct;
  }
}
