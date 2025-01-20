import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'

import { UserType } from '../../shared/constants/userType'
import { sanitize } from '../../shared/helpers/sanitize'

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
  @Transform(({ value }) => sanitize(value))
  @IsString()
  @IsOptional()
  searchTitle?: string

  @ApiProperty({
    required: false,
    description: 'Search tickets by description',
  })
  @Transform(({ value }) => sanitize(value))
  @IsString()
  @IsOptional()
  searchDescription?: string
}
