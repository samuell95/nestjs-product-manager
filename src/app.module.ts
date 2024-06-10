import { Module } from '@nestjs/common'

import { MongooseModule } from '@nestjs/mongoose'

import { ProductModule } from './product/product.module'

import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://root:docker@localhost:27017'),
    UsersModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
