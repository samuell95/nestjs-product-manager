import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from '../schemas/Product.schema'
import { CreateProductDto } from './dto/CreateProduct.dto'
import { User } from '../schemas/User.schema'
import { UpdateProductDto } from './dto/UpdateProduct.dto'
import { UserPayload } from '../auth/jwt.strategy'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, user: UserPayload) {
    const findUser = await this.userModel.findById(user.sub)

    if (!findUser) throw new HttpException('Usuário não encontrado', 404)

    const newProduct = new this.productModel(createProductDto)

    const savedProduct = await newProduct.save()
    await findUser.updateOne({
      $push: {
        products: savedProduct._id,
      },
    })

    return savedProduct
  }

  getProducts() {
    return this.productModel.find()
  }

  getProductsById(id: string) {
    return this.productModel.findById(id)
  }

  async updateProduct(
    id: string,
    user: UserPayload,
    updateProductDto: UpdateProductDto,
  ) {
    const findUser = await this.userModel.findById(user.sub)
    if (!findUser) {
      throw new HttpException('Usuário não encontrado', 404)
    }

    const isProductAssociatedWithUser = findUser.products.some(
      (productId) => productId.toString() === id,
    )

    if (!isProductAssociatedWithUser) {
      throw new HttpException(
        'Produto não encontrado ou não pertence ao usuário',
        403,
      )
    }

    const product = await this.productModel.findById(id)
    if (!product) {
      throw new HttpException('Produto não encontrado', 404)
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    )

    return updatedProduct
  }

  async deleteProduct(id: string, user: UserPayload) {
    const findUser = await this.userModel.findById(user.sub)

    if (!findUser) {
      throw new HttpException('Usuário não encontrado', 404)
    }

    const isProductAssociatedWithUser = findUser.products.some(
      (productId) => productId.toString() === id,
    )

    if (!isProductAssociatedWithUser) {
      throw new HttpException(
        'Produto não encontrado ou não pertence ao usuário',
        403,
      )
    }

    const deletedProduct = await this.productModel.findByIdAndDelete(id)

    if (!deletedProduct) {
      throw new HttpException('Falha ao excluir o produto', 500)
    }

    findUser.products = findUser.products.filter(
      (productId) => productId.toString() !== id,
    )
    await findUser.save()

    return { message: 'Produto deletado com sucesso', product: deletedProduct }
  }
}
