import { ApiProperty } from '@nestjs/swagger'

import { UserType } from '../../shared/constants/userType'

export class TicketDto {
  @ApiProperty({ example: '669e3e2a27817db27a285b23' })
  id: string

  @ApiProperty({ example: 'Event Title 1' })
  title: string

  @ApiProperty({ example: 'Description for event 1' })
  description: string

  @ApiProperty({ example: 'https://image.com' })
  image: string

  @ApiProperty({ example: '2025-01-18T12:00:00Z' })
  date: string

  @ApiProperty({ example: 'Location 1' })
  location: string

  @ApiProperty({ example: UserType.LOCAL })
  userType: UserType
}

export class GetTicketsResponseDto {
  @ApiProperty({ type: [TicketDto], description: 'Array of ticket objects' })
  tickets: TicketDto[]

  @ApiProperty({ required: false, description: 'Cursor for the next page' })
  nextCursor: string | null
}
