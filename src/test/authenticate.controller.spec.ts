import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../app.module'
import { UsersService } from '../users/users.service'

import { createHash } from 'crypto'
import { hash } from 'bcrypt'

jest.mock('../users/users.service')

describe('Autenticado o usuário', () => {
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
    const user = {
      email: 'wildiane@gmail.com',
      password: hash('123456', 8),
    }

    await createdUsers.push(user)

    const response = await request(app.getHttpServer())
      .post('/users/sessions')
      .send({
        email: 'wildiane@gmail.com',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)
    console.log(response.body)
  })
})
