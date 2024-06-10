import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { User } from './User.schema'

@Schema()
export class Product {
  @Prop({ required: true })
  nome: string

  @Prop({ required: true })
  descricao: string

  @Prop({ required: true, type: Number })
  preco: number

  @Prop({ required: true })
  categoria: string

  @Prop({ required: true, type: Number })
  estoque: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

export const ProductSchema = SchemaFactory.createForClass(Product)
