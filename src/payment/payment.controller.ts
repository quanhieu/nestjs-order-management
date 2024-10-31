import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.paymentService.update(id, status);
  }
}
