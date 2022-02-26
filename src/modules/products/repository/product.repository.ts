import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProduct } from 'src/domain/useCases/product/createProduct.usecase';
import { DeleteProduct } from 'src/domain/useCases/product/deleteProduct.usecase';
import { FindProductById } from 'src/domain/useCases/product/findProductById.usecase';
import { ListProducts } from 'src/domain/useCases/product/listProducts.usecase';
import { UpdateProduct } from 'src/domain/useCases/product/updateProduct.usecase';
import { Repository } from 'typeorm';
import { CreateProductDTO } from '../../../shared/dtos/createProduct.dto';
import { UpdateProductDTO } from '../../../shared/dtos/updateProduct.dto';
import { Product } from '../../../shared/entities/product.entity';

@Injectable()
export class ProductRepo
  implements
    CreateProduct,
    FindProductById,
    ListProducts,
    UpdateProduct,
    DeleteProduct
{
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const product = this.repository.create(data);
    await this.repository.save(product);
    return product;
  }
  async find(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);
    return product;
  }
  async list(): Promise<Product[]> {
    const products = await this.repository.find();
    return products;
  }

  async update(data: UpdateProductDTO): Promise<Product> {
    const product = this.repository.findOne({ id: data.id });

    const updatedProduct = {
      ...product,
      ...data,
    };

    await this.repository.save(updatedProduct);

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
