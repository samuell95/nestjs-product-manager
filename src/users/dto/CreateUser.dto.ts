import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class createUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Por favor, insira um endereço de email válido.' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Sua senha precisa ter no mínimo 6 caracteres' })
  password: string

  @IsNotEmpty()
  @IsString()
  name: string
}
