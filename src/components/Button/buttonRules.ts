import { pxToRem } from '../../lib'
import { IButtonVariables } from './buttonVariables'

export default {
  root: ({ props, theme, variables }) => {
    const {
      backgroundColor,
      backgroundColorHover,
      circularRadius,
      circularWidth,
      typePrimaryColor,
      typePrimaryBackgroundColor,
      typePrimaryBackgroundColorHover,
      typePrimaryBorderColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
    }: IButtonVariables = variables

    return {
      backgroundColor,
      display: 'inline-block',
      margin: `0 ${pxToRem(8)} 0 0`,
      height: pxToRem(32),
      width: pxToRem(96),
      verticalAlign: 'middle',
      cursor: 'pointer',
      borderWidth: 0,
      borderRadius: pxToRem(4),
      ':hover': {
        backgroundColor: backgroundColorHover,
      },
      ...(props.circular && { borderRadius: circularRadius, width: circularWidth }),

      ...(props.type === 'primary' && {
        color: typePrimaryColor,
        backgroundColor: typePrimaryBackgroundColor,
        borderColor: typePrimaryBorderColor,
        ':hover': {
          backgroundColor: typePrimaryBackgroundColorHover,
        },
      }),

      ...(props.type === 'secondary' && {
        color: typeSecondaryColor,
        backgroundColor: typeSecondaryBackgroundColor,
        borderColor: typeSecondaryBorderColor,
        borderWidth: '2px',
        ':hover': {
          borderColor: 'transparent',
          backgroundColor: typeSecondaryBackgroundColorHover,
        },
      }),
    }
  },
}
