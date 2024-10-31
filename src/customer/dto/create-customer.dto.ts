import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiPropertyOptional({ description: 'Street address', example: '123 Main St' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ description: 'City of the address', example: 'New York' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State of the address', example: 'NY' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Zip code of the address', example: '10001' })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiPropertyOptional({ description: 'Country of the address', example: 'USA' })
  @IsOptional()
  @IsString()
  country?: string;
}

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
    description: 'The address of the customer',
    type: AddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  readonly address?: AddressDto;
}