import { pxToRem } from '../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.borderRadius = `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`

  vars.defaultBorder = `${pxToRem(1)} solid #222426`
  vars.defaultBorderFocus = `${pxToRem(1)} solid #85b7d9`
  vars.defaultBorderError = `${pxToRem(1)} solid #e0b4b4`

  vars.themeBackgroundColor = siteVars.gray10
  vars.themeFontColor = '#252424'
  vars.themeInputPadding = `${pxToRem(6)} ${pxToRem(32)} ${pxToRem(6)} ${pxToRem(12)}`
  vars.themeFocusBorderBottom = `${pxToRem(2)} solid #6264a7`

  return vars
}
