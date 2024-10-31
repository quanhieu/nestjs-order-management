import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  // Retrieve all products
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Retrieve a single product by ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  // Update a product by ID
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!existingProduct)
      throw new NotFoundException(`Product #${id} not found`);
    return existingProduct;
  }

  // Delete a product by ID
  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct)
      throw new NotFoundException(`Product #${id} not found`);
    return deletedProduct;
  }
}
