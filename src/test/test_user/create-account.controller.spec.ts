import { AppModule } from '../../app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { Model } from 'mongoose'
import { User } from '../../schemas/User.schema'
import { getModelToken } from '@nestjs/mongoose'

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

  it('[POST] /users', async () => {
    const userData = {
      email: 'johnDoe1597@example2.com',
      password: '123456',
      name: 'John Doe',
    }

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData)

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await mongBD
      .findOne({ email: userData.email })
      .exec()
    expect(userOnDatabase).toBeTruthy()
  })
})
