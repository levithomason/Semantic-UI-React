import { rem } from '../../lib'

export interface IButtonVariables {
  circularRadius: string
  circularWidth: string
  typePrimaryColor: string
  typePrimaryBackgroundColor: string
  typePrimaryBorderColor: string
  typeSecondaryColor: string
  typeSecondaryBackgroundColor: string
  typeSecondaryBorderColor: string
}

export default (siteVars: any): IButtonVariables => {
  const { white, black, btnPrimaryColor, btnSecondaryColor, btnSecondaryBorderColor } = siteVars

  return {
    circularRadius: rem(10),
    circularWidth: '32px', // TODO-Bugaa92: convert to using rem when it allows input as px
    typePrimaryColor: white,
    typePrimaryBackgroundColor: btnPrimaryColor,
    typePrimaryBorderColor: 'transparent',
    typeSecondaryColor: black,
    typeSecondaryBackgroundColor: btnSecondaryColor,
    typeSecondaryBorderColor: btnSecondaryBorderColor,
  }
}
