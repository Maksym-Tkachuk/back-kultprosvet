import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'

import { UserType } from '../../shared/constants/userType'

export class GetTicketsQueryDto {
  @ApiProperty({ required: false, description: 'Cursor for pagination' })
  @IsString()
  @IsOptional()
  cursor?: string

  @ApiProperty({
    required: false,
    description: 'Number of tickets to return',
    default: 10,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  limit?: number

  @ApiProperty({
    required: false,
    description: 'Filter tickets by user type',
    enum: UserType,
  })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType

  @ApiProperty({ required: false, description: 'Search tickets by title' })
  @IsString()
  @IsOptional()
  searchTitle?: string

  @ApiProperty({
    required: false,
    description: 'Search tickets by description',
  })
  @IsString()
  @IsOptional()
  searchDescription?: string
}
