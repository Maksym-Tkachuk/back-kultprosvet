import { filterByRegex } from '.'

describe('filterByRegex', () => {
  const testData = [
    { id: 1, title: 'Hello World', description: 'First description' },
    { id: 2, title: 'HELLO Universe', description: 'Another Description' },
    { id: 3, title: 'Example Title', description: 'desc HELLO' },
  ]

  it('should return the original array if searchTerm is undefined', () => {
    const result = filterByRegex(testData, 'title', undefined)

    expect(result).toEqual(testData)
  })

  it('should return the original array if searchTerm is empty', () => {
    const result = filterByRegex(testData, 'title', '')

    expect(result).toEqual(testData)
  })

  it('should filter items by the specified field (case-insensitive match)', () => {
    const result = filterByRegex(testData, 'title', 'hello')

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      { id: 1, title: 'Hello World', description: 'First description' },
      { id: 2, title: 'HELLO Universe', description: 'Another Description' },
    ])
  })

  it('should filter items with a partial match', () => {
    const result = filterByRegex(testData, 'description', 'desc')

    expect(result).toHaveLength(3)
    expect(result).toEqual([
      { id: 1, title: 'Hello World', description: 'First description' },
      { id: 2, title: 'HELLO Universe', description: 'Another Description' },
      { id: 3, title: 'Example Title', description: 'desc HELLO' },
    ])
  })

  it('should return an empty array if there are no matches', () => {
    const result = filterByRegex(testData, 'title', 'xyz123')
    expect(result).toHaveLength(0)
  })
})
