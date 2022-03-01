import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrder } from 'src/domain/useCases/order/createOrder.usecase';
import { DeleteOrder } from 'src/domain/useCases/order/deleteOrder.usecase';
import { FindOrderById } from 'src/domain/useCases/order/findOrderById.usecase';
import { ListOrders } from 'src/domain/useCases/order/listOrders.usecase';
import { UpdateOrder } from 'src/domain/useCases/order/updateOrder.usecase';
import { UpdateOrderDTO } from 'src/shared/dtos/order/updateOrder.dto';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../../../shared/dtos/order/createOrder.dto';
import { Order } from '../../../shared/entities/order.entity';

export class OrderRepo
  implements CreateOrder, FindOrderById, ListOrders, DeleteOrder, UpdateOrder
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
    const order = await this.repository.findOne({
      where: { id: id },
      relations: ['orderProduct', 'orderProduct.product'],
    });
    return order;
  }
  async list(): Promise<Order[]> {
    const orders = await this.repository.find();
    return orders;
  }
  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async update(data: UpdateOrderDTO): Promise<Order> {
    const order = await this.repository.findOne(data.id);

    const updatedOrder = {
      ...order,
      ...data,
    };

    await this.repository.save(updatedOrder);

    return updatedOrder;
  }
}
