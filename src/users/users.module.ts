import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../schemas/User.schema'
import { UsersService } from './users.service'
import { UsersController } from './user.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env } from '../env'
import { JwtStrategy } from '../auth/jwt.strategy'
import { AuthenticateController } from '../auth/authenticate-controller'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env, true>) => {
        const privateKey = configService.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true })

        if (!privateKey || !publicKey) {
          throw new Error(
            'As chaves JWT não foram definidas nas variáveis de ambiente',
          )
        }

        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.get<string | number>('JWT_EXPIRE'),
          },
        }
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController, AuthenticateController],
})
export class UsersModule {}
