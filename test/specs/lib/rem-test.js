import { rem } from 'src/lib'
import * as siteVariables from 'src/themes/teams/siteVariables'

describe('rem', () => {
  it('should return 1rem value with base font size of 10px.', () => {
    siteVariables.htmlFontSize = '10px'

    expect(rem(1)).toEqual('1rem')
  })

  it('should return .714rem value with a base font size of 14px.', () => {
    siteVariables.htmlFontSize = '14px'

    expect(rem(1)).toEqual('.714rem')
  })

  it('should return 1.25rem value with a base font size of 8px.', () => {
    siteVariables.htmlFontSize = '8px'

    expect(rem(1)).toEqual('1.25rem')
  })

  it('should return 0 value when value passed in is 0', () => {
    expect(rem(0)).toEqual('0')
  })
})
