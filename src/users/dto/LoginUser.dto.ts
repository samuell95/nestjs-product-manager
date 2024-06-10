import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class loginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Por favor, insira um endereço de email válido.' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string
}
