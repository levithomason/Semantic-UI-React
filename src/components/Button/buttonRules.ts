import { IButtonVariables } from './buttonVariables'

export default {
  root: ({ props, theme, trackVariables }) => {
    const v = trackVariables()

    return {
      backgroundColor: v.backgroundColor,
      display: 'inline-block',
      verticalAlign: 'middle',
      cursor: 'pointer',
      borderWidth: 0,
      ':hover': {
        backgroundColor: v.backgroundColorHover,
      },

      ...(props.circular && { borderRadius: v.circularRadius, width: v.circularWidth }),

      ...(props.type === 'primary' && {
        color: v.typePrimaryColor,
        backgroundColor: v.typePrimaryBackgroundColor,
        borderColor: v.typePrimaryBorderColor,
        ':hover': {
          backgroundColor: v.typePrimaryBackgroundColorHover,
        },
      }),

      ...(props.type === 'secondary' && {
        color: v.typeSecondaryColor,
        backgroundColor: v.typeSecondaryBackgroundColor,
        borderColor: v.typeSecondaryBorderColor,
        borderWidth: '2px',
        ':hover': {
          borderColor: 'transparent',
          backgroundColor: v.typeSecondaryBackgroundColorHover,
        },
      }),
    }
  },
}
