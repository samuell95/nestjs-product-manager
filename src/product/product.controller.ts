import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateProductDto } from './dto/CreateProduct.dto'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/UpdateProduct.dto'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../auth/current-user-decorator'
import { UserPayload } from '../auth/jwt.strategy'

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createProducts(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.productService.createProduct(createProductDto, user)
  }

  @Get()
  getProducts() {
    return this.productService.getProducts()
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const findProduct = await this.productService.getProductsById(id)

    return { findProduct }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.productService.updateProduct(id, user, updateProductDto)
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteProduct(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return this.productService.deleteProduct(id, user)
  }
}
