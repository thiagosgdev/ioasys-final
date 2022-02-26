import { OrderProduct } from 'src/shared/entities/order_product.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDTO } from '../../../shared/dtos/order/CreateOrderProduct.dto';

export class OrderProductRepo {
  constructor(private readonly repository: Repository<OrderProduct>) {}

  async create(data: CreateOrderProductDTO): Promise<OrderProduct> {
    const orderProduct = this.repository.create(data);
    await this.repository.save(orderProduct);
    return orderProduct;
  }
}
