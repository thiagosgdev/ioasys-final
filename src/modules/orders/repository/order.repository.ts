import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrder } from 'src/domain/useCases/order/createOrder.usecase';
import { DeleteOrder } from 'src/domain/useCases/order/deleteOrder.usecase';
import { FindOrderById } from 'src/domain/useCases/order/findOrderById.usecase';
import { ListOrders } from 'src/domain/useCases/order/listOrders.usecase';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../../../shared/dtos/order/createOrder.dto';
import { Order } from '../../../shared/entities/order.entity';

export class OrderRepo
  implements CreateOrder, FindOrderById, ListOrders, DeleteOrder
{
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}
  async create(data: CreateOrderDTO): Promise<Order> {
    const order = this.repository.create(data);
    await this.repository.save(order);

    return order;
  }
  async findById(id: string): Promise<Order> {
    const order = await this.repository.findOne(id);
    return order;
  }
  async list(): Promise<Order[]> {
    const orders = await this.repository.find();
    return orders;
  }
  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
