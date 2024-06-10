import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  nome: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  descricao: string

  @IsNumber()
  preco: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  categoria: string

  @IsNumber()
  estoque: number
}
