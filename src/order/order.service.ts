import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderItem, OrderItemDocument } from './schemas/order-item.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items, totalAmount, orderStatus } = createOrderDto;

    const order = new this.orderModel({
      customerId: new Types.ObjectId(customerId),
      totalAmount,
      orderStatus,
    });
    const savedOrder = await order.save();

    const orderItems = items.map((item) => ({
      orderId: savedOrder._id,
      productId: new Types.ObjectId(item.productId),
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      totalPrice: 100 * item.quantity * item.price * (1 - item.discount / 100),
    }));

    const itemCreated = await this.orderItemModel.insertMany(orderItems);
    savedOrder.items = itemCreated.map((item) => item._id) as unknown as OrderItem[];

    return savedOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('items').exec();

    if (!order) throw new NotFoundException(`Order #${id} not found`);

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
    if (!updatedOrder) throw new NotFoundException(`Order #${id} not found`);
    return updatedOrder;
  }

  async delete(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) throw new NotFoundException(`Order #${id} not found`);

    await this.orderItemModel.deleteMany({ orderId: id }).exec();
    return deletedOrder;
  }
}
