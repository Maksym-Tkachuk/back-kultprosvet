import { Controller, Get, Query } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { GetTicketsQueryDto } from './dtos/get-tickets-query.dto'
import { GetTicketsResponseDto } from './dtos/get-tickets-response.dto'
import { TicketService } from './ticket.service'

@Controller('/tickets')
@ApiTags('Tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: GetTicketsResponseDto,
  })
  async get(
    @Query() query: GetTicketsQueryDto,
  ): Promise<GetTicketsResponseDto> {
    return this.ticketService.get(query)
  }
}
