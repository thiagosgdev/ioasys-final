import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from 'src/domain/useCases/user/createUser.usecase';
import { DeleteUser } from 'src/domain/useCases/user/deleteUser.usecase';
import { FindUserByEmail } from 'src/domain/useCases/user/findUserByEmail.usecase';
import { FindUserById } from 'src/domain/useCases/user/findUserById.usecase';
import { ListOrdersByUser } from 'src/domain/useCases/user/listOrdersByUser.usecase';
import { ListShipmentsByUser } from 'src/domain/useCases/user/ListShipmentsByUser.usecase';
import { ListUsers } from 'src/domain/useCases/user/listUsers.usecase';
import { UpdateUser } from 'src/domain/useCases/user/updateUser.usecase';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepo
  implements
    CreateUser,
    FindUserByEmail,
    FindUserById,
    ListUsers,
    ListOrdersByUser,
    DeleteUser,
    UpdateUser,
    ListShipmentsByUser
{
  userRepository: any;
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async listOrders(id: string): Promise<User[]> {
    const userOrders = await this.repository.find({
      where: { id: id },
      relations: ['orders'],
    });

    return userOrders;
  }
  async list(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  }
  async create(data: CreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async listAddresses(id: string): Promise<User> {
    const userAddreses = await this.repository.findOne({
      where: { id: id },
      relations: ['addresses'],
    });

    return userAddreses;
  }

  async listShipments(id: string): Promise<User> {
    const userShipments = await this.repository.findOne({
      where: { id: id },
      relations: ['shipment'],
    });

    return userShipments;
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    console.log('USER ' + data.first_name);
    console.log('ID ' + id);
    data.id = id;
    const user = await this.repository.findOne(id);

    const updatedUser = {
      ...user,
      ...data,
    };

    await this.repository.save(updatedUser);

    return updatedUser;
  }
}
