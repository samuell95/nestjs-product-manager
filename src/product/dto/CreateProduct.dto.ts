import { IsNotEmpty, IsString } from 'class-validator'
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  price: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  stock: string
}
