import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from 'src/shared/dtos/createOrder.dto';
import { Order } from 'src/shared/entities/order.entity';
import { Stock } from 'src/shared/entities/stock.entity';
import { OrderRepo } from 'src/modules/orders/repository/order.repository';
import { StockRepo } from 'src/shared/repositories/stock.repository';
import { OrderProductRepo } from '../../repository/orderProduct.repository';

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepo,
    private stockRepository: StockRepo,
    private orderProductRepository: OrderProductRepo,
  ) {}

  async create(data: CreateOrderDTO): Promise<Order> {
    let stock: Stock;

    data.products.forEach(async (product) => {
      stock = await this.stockRepository.findByProduct(product.product_id);
      if (stock.amount < product.quantity || !stock) {
        console.info('E-mail sent to employee responsable for stock');
        throw new Error(`Stock of too low! Order not processed!`);
      }
    });

    const order = await this.orderRepository.create(data);

    data.products.forEach(async (product, i) => {
      await this.orderProductRepository.create({
        product_id: product.product_id,
        order_id: order.id,
        quantity: product.quantity,
      });
    });

    return order;
  }
}
