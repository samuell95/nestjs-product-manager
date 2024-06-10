import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Product } from './Product.schema'
import mongoose from 'mongoose'

@Schema()
export class User {
  @Prop({ unique: true, required: [true, 'Email já existe'] })
  email: string

  @Prop({ select: false, required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[]
}

export const UserSchema = SchemaFactory.createForClass(User)
