import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDTO } from 'src/shared/dto/createOrder.dto';
import { Order } from 'src/shared/entities/order.entity';
import { OrderProduct } from 'src/shared/entities/order_product.entity';
import { Stock } from 'src/shared/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateOrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('STOCK_REPOSITORY')
    private stockRepository: Repository<Stock>,
    @Inject('ORDER_PRODUCT_REPOSITORY')
    private orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(data: CreateOrderDTO): Promise<Order> {
    let stock: Stock;
    data.products.forEach(async (product) => {
      stock = await this.stockRepository.findOne({
        where: {
          product_id: product.product_id,
        },
      });
      if (stock.amount < product.quantity || !stock) {
        throw new Error(`Stock of too low! Order not processed!`);
      }
    });

    const order = this.orderRepository.create(data);
    const order_product = [];
    await this.orderRepository.save(order);

    data.products.forEach(async (product, i) => {
      order_product[i] = this.orderProductRepository.create({
        product_id: product.product_id,
        order_id: order.id,
        quantity: product.quantity,
      });

      await this.orderProductRepository.save(order_product);
    });

    return order;
  }
}
