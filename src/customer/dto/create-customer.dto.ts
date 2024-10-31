import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @ApiProperty({ description: 'The name of the customer', example: 'John Doe' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The email address of the customer', example: 'johndoe@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional({ description: 'The phone number of the customer', example: '+1234567890' })
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiPropertyOptional({
    description: 'Address, including street, city, state, zip code, and country',
    example: '123 Main St, Springfield, IL, 62701, USA',
  })
  @IsString()
  @IsOptional()
  // @ValidateNested()
  readonly address?: string;
}