import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Unique identifier for the order', example: '123456' })
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'Payment amount', example: 100.5 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Status of the payment',
    example: 'PENDING',
    // enum: ['PENDING', 'COMPLETED', 'FAILED'],
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Method of payment used',
    example: 'Credit Card',
  })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}