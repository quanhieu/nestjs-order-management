import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDto, description: 'Data to create a new payment' })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all payments' })
  async findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve details of a specific payment by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the payment', example: 'pay-12345' })
  async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the status of a payment by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the payment', example: 'pay-12345' })
  @ApiBody({ description: 'New status for the payment', schema: { example: 'COMPLETED' } })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.paymentService.update(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the payment', example: 'pay-12345' })
  async remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}