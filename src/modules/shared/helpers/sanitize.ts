export const sanitize = (input?: string): string => {
  return input?.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
}
