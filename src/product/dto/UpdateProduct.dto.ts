import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  descricao: string

  @IsNumber()
  @IsOptional()
  preco: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @IsOptional()
  categoria: string

  @IsNumber()
  @IsOptional()
  estoque: number
}
