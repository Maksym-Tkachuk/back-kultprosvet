import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'

import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'

import { AppModule } from '../../app.module'

export const initApplication = async (
  module: TestingModule,
): Promise<INestApplication> => {
  const app = module.createNestApplication()
  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  )

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
    fallback: true,
  })

  await app.init()

  return app
}
