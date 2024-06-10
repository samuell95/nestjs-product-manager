import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { User } from '../schemas/User.schema'
import { createUserDto } from './dto/CreateUser.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { loginUserDto } from './dto/LoginUser.dto'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: createUserDto) {
    const isUser = await this.userModel.findOne({
      email: createUserDto.email,
    })

    if (isUser) {
      throw new HttpException('Usuário já está cadastrado', 400)
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      })

      const savedUser = await newUser.save()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = savedUser.toObject()

      return { userWithoutPassword }
    } catch (error) {
      throw new HttpException('Erro ao criar usuário', 500)
    }
  }

  async loginUser(loginDto: loginUserDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password')

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado ou credenciais inválidas',
      )
    }

    const isPasswordValid = await compare(loginDto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Usuário não encontrado ou credenciais inválidas',
      )
    }

    const accessToken = this.jwtService.sign({ sub: user._id })

    return { access_token: accessToken }
  }

  async getUsers() {
    const users = await this.userModel.find().exec()
    if (users.length === 0) {
      throw new HttpException('Nenhum usuário encontrado', 404)
    }
    return users
  }

  getUserById(id: string) {
    return this.userModel.findById(id)
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}
