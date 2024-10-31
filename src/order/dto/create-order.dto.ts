import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Unique identifier for the product', example: 'prod-12345' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Price of the product', example: 50.0 })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Unique identifier for the customer', example: 'cust-98765' })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ description: 'Total amount for the order', example: 100.0 })
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'Current status of the order',
    example: 'PENDING',
    enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
  })
  @IsNotEmpty()
  @IsString()
  orderStatus: string;
}