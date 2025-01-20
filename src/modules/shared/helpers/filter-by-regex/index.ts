export const filterByRegex = <T extends Record<string, any>>(
  list: T[],
  field: keyof T,
  searchTerm?: string,
): T[] => {
  if (!searchTerm) {
    return list
  }

  const regex = new RegExp(searchTerm, 'i')

  return list.filter(item => regex.test(item[field]))
}
