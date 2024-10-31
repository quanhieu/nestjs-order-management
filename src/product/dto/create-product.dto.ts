import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'A brief description of the product', example: 'A high-performance laptop' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The price of the product', example: 1500 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The discount of the product', example: 20 })
  @IsNumber()
  discount: number;

  @ApiPropertyOptional({ description: 'The category of the product', example: 'Electronics' })
  @IsOptional()
  @IsString()
  category?: string;
}