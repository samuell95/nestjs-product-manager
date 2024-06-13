import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'

import mongoose from 'mongoose'
import { createUserDto } from './dto/CreateUser.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'

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

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers()

    return { users }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.userService.getUserById(id)
    return { findUser }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto)

    return { updatedUser }
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
