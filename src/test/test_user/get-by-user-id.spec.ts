import { AppModule } from '../../app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { Model } from 'mongoose'
import { User } from '../../schemas/User.schema'
import { getModelToken } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'

describe('UserController', () => {
  let app: INestApplication
  let mongBD: Model<User>

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

    mongBD = moduleRef.get<Model<User>>(getModelToken(User.name))
  })

  afterEach(async () => {
    await mongBD.deleteMany({})
  })

  it('[GET] /users/:id', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10)
    const createdUser = await mongBD.create({
      email: 'johnDoe10@example.com',
      password: hashedPassword,
      name: 'John Doe',
    })

    const createdUserId = createdUser._id

    const response = await request(app.getHttpServer()).get(
      `/users/${createdUserId}`,
    )

    expect(response.statusCode).toBe(200)
  })
})
