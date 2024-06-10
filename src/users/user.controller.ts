import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'

import mongoose from 'mongoose'
import { createUserDto } from './dto/CreateUser.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'

import { loginUserDto } from './dto/LoginUser.dto'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: createUserDto) {
    const user = await this.userService.createUser(createUserDto)
    return {
      user,
    }
  }

  @Post('/sessions')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: loginUserDto) {
    const token = await this.userService.loginUser(loginUserDto)
    return { token }
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers()

    return { users }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Usuario não encontrado', 404)
    const findUser = await this.userService.getUserById(id)

    if (!findUser) throw new HttpException('Usuario não encontrado', 404)

    return findUser
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Invalid ID', 400)
    const updatedUser = await this.userService.updateUser(id, updateUserDto)
    if (!updatedUser) throw new HttpException('User Not Found', 404)
    return updatedUser
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) throw new HttpException('ID inválido', 400)

    const deletedUser = await this.userService.deleteUser(id)

    if (!deletedUser) throw new HttpException('User Not Found', 404)
  }
}
