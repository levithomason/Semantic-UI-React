import hasChildren from 'src/lib/hasChildren'

describe('hasChildren', () => {
  test('should return true for empty array', () => {
    expect(hasChildren([])).toBe(false)
  })
  test('should return false for array with length >= 1', () => {
    expect(hasChildren([0, 1])).toBe(true)
  })
  test('should return true for null', () => {
    expect(hasChildren(null)).toBe(false)
  })
  test('should return true for void 0', () => {
    expect(hasChildren(void 0)).toBe(false) // eslint-disable-line no-void
  })
  test('should return false for NaN', () => {
    expect(hasChildren(NaN)).toBe(true)
  })
  test('should return true for undefined', () => {
    expect(hasChildren(undefined)).toBe(false)
  })
})
