import { loginUserDto } from '../users/dto/LoginUser.dto'
import { UsersService } from '../users/users.service'
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

@Controller('/sessions')
export class AuthenticateController {
  constructor(private userService: UsersService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: loginUserDto) {
    return await this.userService.loginUser(loginUserDto)
  }
}
