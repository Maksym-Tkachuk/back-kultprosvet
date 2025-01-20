import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'

import type { GetTicketsQueryDto } from './dtos/get-tickets-query.dto'
import type { GetTicketsResponseDto } from './dtos/get-tickets-response.dto'

import { filterByRegex } from '../shared/helpers/filter-by-regex'

import { tickets } from './mock/tickets'

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name)

  async get(query: GetTicketsQueryDto): Promise<GetTicketsResponseDto> {
    try {
      const {
        cursor,
        limit = 10,
        userType,
        searchTitle,
        searchDescription,
      } = query

      let filteredTickets = [...tickets]

      if (cursor) {
        const startIndex = cursor
          ? tickets.findIndex(ticket => ticket.id === cursor) + 1
          : 0

        filteredTickets = filteredTickets.slice(startIndex)
      }

      if (userType) {
        filteredTickets = filteredTickets.filter(
          ticket => ticket.userType === userType,
        )
      }

      if (searchTitle) {
        filteredTickets = filterByRegex(filteredTickets, 'title', searchTitle)
      }

      if (searchDescription) {
        filteredTickets = filterByRegex(
          filteredTickets,
          'description',
          searchDescription,
        )
      }

      const paginatedTickets = filteredTickets.slice(0, 10)

      const nextCursor =
        limit > paginatedTickets.length ? null : paginatedTickets?.at(-1).id

      return { tickets: paginatedTickets, nextCursor }
    } catch (error) {
      this.logger.error(`get: ${error}`)
      throw new InternalServerErrorException()
    }
  }
}
