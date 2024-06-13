import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  price: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string

  @IsString()
  @IsOptional()
  stock: string
}
