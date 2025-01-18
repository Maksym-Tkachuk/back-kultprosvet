import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { ConfigValidationService } from './modules/shared/services/config-validation-service'
import { TicketModule } from './modules/ticket/ticket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationService.createSchema(),
    }),
    ScheduleModule.forRoot(),
    TicketModule,
  ],
})
export class AppModule {}
