import { pxToRem } from '../../lib'
import { truncateStyle } from '../../styles/customCSS'
import { IButtonVariables } from './buttonVariables'
import { IButtonProps } from './Button'

export default {
  root: ({ props, variables }: { props: IButtonProps; variables: IButtonVariables }) => {
    const { children, circular, content, icon, type } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      backgroundColorHover,
      circularRadius,
      paddingLeftRightValue,
      typePrimaryColor,
      typePrimaryBackgroundColor,
      typePrimaryBackgroundColorHover,
      typePrimaryBorderColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
    } = variables

    return {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      display: 'inline-flex',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      cursor: 'pointer',
      borderWidth: `${secondary ? (circular ? 1 : 2) : 0}px`,
      borderRadius: pxToRem(2),
      ':hover': {
        backgroundColor: backgroundColorHover,
      },

      ...(children && {
        display: 'inline-block',
        ...truncateStyle,
      }),

      ...(icon &&
        !content && {
          minWidth: height,
          padding: 0,
        }),

      ...(circular && {
        minWidth: height,
        padding: 0,
        borderRadius: circularRadius,
      }),

      ...(primary && {
        color: typePrimaryColor,
        backgroundColor: typePrimaryBackgroundColor,
        borderColor: typePrimaryBorderColor,
        ':hover': {
          backgroundColor: typePrimaryBackgroundColorHover,
        },
      }),

      ...(secondary && {
        color: typeSecondaryColor,
        backgroundColor: typeSecondaryBackgroundColor,
        borderColor: typeSecondaryBorderColor,
        ':hover': {
          borderColor: 'transparent',
          backgroundColor: typeSecondaryBackgroundColorHover,
        },
      }),
    }
  },

  span: ({ props, variables }: { props: IButtonProps; variables: IButtonVariables }) => {
    const { icon, iconPosition } = props
    const paddingLeftOrRight = pxToRem(variables.paddingLeftRightValue / 2)

    return {
      margin: 'auto',
      ...truncateStyle,
      ...(icon && {
        padding:
          iconPosition === 'right' ? `0 ${paddingLeftOrRight} 0 0` : `0 0 0 ${paddingLeftOrRight}`,
      }),
    }
  },
}
