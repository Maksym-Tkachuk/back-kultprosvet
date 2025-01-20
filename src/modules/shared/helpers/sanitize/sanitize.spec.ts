import { sanitize } from '.'

describe('sanitize', () => {
  it('should return undefined if input is undefined', () => {
    expect(sanitize(undefined)).toBeUndefined()
  })

  it('should return empty string if input is an empty string', () => {
    expect(sanitize('')).toBe('')
  })

  it('should escape special characters in a string', () => {
    const input = 'hello.world'
    const output = sanitize(input)

    expect(output).toBe('hello\\.world')
  })

  it('should not alter strings without special characters', () => {
    const input = 'helloworld'
    const output = sanitize(input)
    expect(output).toBe(input)
  })

  it('should properly escape multiple special characters', () => {
    const input = 'a*b?c(d)e'

    const output = sanitize(input)
    expect(output).toBe('a\\*b\\?c\\(d\\)e')
  })
})
