import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../app.module'
import { UsersService } from '../users/users.service'
import mongoose from 'mongoose'

jest.mock('../users/users.service')

describe('Criando um usuário', () => {
  let app: any
  let userService: jest.Mocked<UsersService>
  const createdUsers: any[] = []

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    userService = moduleFixture.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /users', async () => {
    const mockedUserId = new mongoose.Types.ObjectId()
    const mockedUserIdString = mockedUserId.toHexString()

    userService.createUser.mockResolvedValueOnce({
      userWithoutPassword: {
        _id: mockedUserId,
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        products: [],
      },
    })

    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    createdUsers.push({
      _id: mockedUserIdString,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      products: [],
    })

    expect(createdUsers.length).toBeGreaterThan(0)
  })
})
