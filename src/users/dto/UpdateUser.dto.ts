import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string

  @IsNotEmpty()
  @IsOptional()
  password: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string
}
