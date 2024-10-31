import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  // Create a payment
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, amount, status, method } = createPaymentDto;
    const payment = new this.paymentModel({
      orderId: new Types.ObjectId(orderId),
      amount,
      status,
      method,
    });
    return payment.save();
  }

  // Retrieve all payments
  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  // Retrieve payment by ID
  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  // Update payment status
  async update(id: string, status: string): Promise<Payment> {
    const payment = await this.paymentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }
}
