import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({ description: 'A brief description of the product', example: 'A high-performance laptop' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ description: 'The price of the product', example: 1500 })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'The stock quantity of the product', example: 20 })
  @IsNumber()
  readonly stock: number;

  @ApiPropertyOptional({ description: 'The category of the product', example: 'Electronics' })
  @IsOptional()
  @IsString()
  readonly category?: string;
}