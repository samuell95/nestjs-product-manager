import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { User } from './User.schema'

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true, type: Number })
  price: string

  @Prop({ required: true })
  category: string

  @Prop({ required: true, type: Number })
  stock: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User
}

export const ProductSchema = SchemaFactory.createForClass(Product)
