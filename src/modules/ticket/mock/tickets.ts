import type { TicketT } from '../types/ticket'

import { UserType } from '../../shared/constants/userType'

export const tickets: TicketT[] = Array.from({ length: 40 }, (_, index) => ({
  id: `${index + 1}`,
  title: `Event Title ${index + 1}`,
  image: 'https://th.bing.com/th/id/OIG3.80EN2JPNx7kp5VqoB5kz',
  description: `[Description] for event ${index + 1}`,
  date: new Date().toISOString(),
  location: `Location ${index + 1}`,
  userType: index % 2 === 0 ? UserType.LOCAL : UserType.TOURIST,
}))
