import { AppModule } from '../../app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { Model } from 'mongoose'

import { getModelToken } from '@nestjs/mongoose'
import { Product } from '../../schemas/Product.schema'
import { JwtService } from '@nestjs/jwt'
import { User } from '@/schemas/User.schema'

describe('UserController', () => {
  let app: INestApplication
  let mongBDPro: Model<Product>
  let mongBDUser: Model<User>
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

    mongBDPro = moduleRef.get<Model<Product>>(getModelToken(Product.name))
    mongBDUser = moduleRef.get<Model<User>>(getModelToken(User.name))
    jwt = moduleRef.get(JwtService)
  })

  afterEach(async () => {
    await mongBDPro.deleteMany({})
    await mongBDUser.deleteMany({})
  })

  it('[POST] /products', async () => {
    const user = await mongBDUser.create({
      email: 'johnDoe50@example.com',
      password: '123456',
      name: 'John Doe',
    })

    const access_token = jwt.sign({ sub: user._id })

    const productData = {
      name: 'novo produto',
      description: 'novo produto',
      price: '1000.0',
      category: 'categoria 4',
      stock: '100',
      userId: user._id,
    }

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${access_token}`)
      .send(productData)

    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
  })
})
