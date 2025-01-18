import { Test } from '@nestjs/testing'
import request from 'supertest'

import type { TicketT } from '../../modules/ticket/types/ticket'
import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'

import { AppModule } from '../../app.module'
import { UserType } from '../../modules/shared/constants/userType'
import { initApplication } from '../helpers/init-application'

describe('Ticket Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = await initApplication(moduleFixture)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /tickets', () => {
    it('should return 10 tickets and a nextCursor by default', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets')
        .expect(200)

      expect(body).toHaveProperty('tickets')
      expect(body).toHaveProperty('nextCursor')

      expect(Array.isArray(body.tickets)).toBe(true)
      expect(body.tickets).toHaveLength(10)
    })

    it('should filter results by userType', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets')
        .query({ userType: UserType.LOCAL })
        .expect(200)

      expect(Array.isArray(body.tickets)).toBe(true)

      body.tickets.forEach((ticket: TicketT) => {
        expect(ticket.userType).toBe(UserType.LOCAL)
      })
    })

    it('should filter results by searchTitle (case-insensitive)', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets')
        .query({ searchTitle: 'some part of title' })
        .expect(200)

      expect(Array.isArray(body.tickets)).toBe(true)

      body.tickets.forEach((ticket: TicketT) => {
        expect(ticket.title.toLowerCase()).toContain(
          'some part of title'.toLowerCase(),
        )
      })
    })

    it('should paginate tickets based on cursor and limit', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets')
        .query({ cursor: '2', limit: 2 })
        .expect(200)

      expect(body.tickets).toHaveLength(2)
      expect(body).toHaveProperty('nextCursor')
    })

    it('should return 400 if limit is negative', async () => {
      const res = await request(app.getHttpServer())
        .get('/tickets')
        .query({ limit: -5 })
        .expect(400)

      expect(res.body.message).toContain('limit must not be less than 0')
    })

    it('should return 400 if userType is invalid', async () => {
      const res = await request(app.getHttpServer())
        .get('/tickets')
        .query({ userType: 'INVALID_TYPE' })
        .expect(400)

      expect(res.body.message).toContain(
        'userType must be one of the following values: local, tourist',
      )
    })
  })
})
