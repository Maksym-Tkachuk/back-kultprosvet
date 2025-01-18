import type { UserType } from '../../shared/constants/userType'

export type TicketT = {
  id: string
  title: string
  image: string
  description: string
  date: string
  location: string
  userType: UserType
}
