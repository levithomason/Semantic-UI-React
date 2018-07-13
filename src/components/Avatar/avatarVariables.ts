import { pxToRem } from '../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.avatarRadius = pxToRem(9999)
  vars.avatarSize = pxToRem(32)

  return vars
}
