import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from '../schemas/Product.schema'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

import { UsersModule } from '../users/users.module'
import { User, UserSchema } from '../schemas/User.schema'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
