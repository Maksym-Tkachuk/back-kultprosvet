import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { EnvVar } from './modules/shared/constants/envVar'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  const corsDomains = config.get(EnvVar.CORS_DOMAINS).split(',')

  // enable cors
  app.enableCors({
    origin(origin, callback) {
      if (!origin || corsDomains.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })

  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  )

  const swagger = new DocumentBuilder()
    .setTitle('Faktastisch API')
    .setVersion('2.0')
    .addBearerAuth()
    .build()

  // init swagger
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('api', app, document)

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
    fallback: true,
  })

  await app.listen(config.get(EnvVar.PORT))
}

bootstrap()
