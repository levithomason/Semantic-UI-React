import { pxToRem } from '../../lib'

export default ({ error, focus, icon, themes, variables }) => ({
  root: {
    display: 'inline-flex',
    position: 'relative',
    '>input': {
      borderRadius: variables.borderRadius,
      padding: `${pxToRem(6)} ${pxToRem(10)}`,
      outline: 0,
      border: variables.defaultBorder,
    },
    '>input:focus': { border: variables.defaultBorderFocus },
  },

  focus: {
    '>input': { border: variables.defaultBorderFocus },
  },

  error: {
    '>input': {
      border: variables.defaultBorderError,
      backgroundColor: '#fff6f6',
    },
  },
  icon: {
    '>input': {
      padding: `${pxToRem(6)} ${pxToRem(25)} ${pxToRem(6)} ${pxToRem(10)}`,
    },
    '>i': {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 0,
      height: '100%',
      width: pxToRem(26),
      fontSize: pxToRem(13),
      verticalAlign: 'middle',
      '::before': {
        left: 0,
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        marginTop: '-5px',
        width: '100%',
      },
    },
  },

  themes: {
    ...(themes === 'teams' && {
      '>input': {
        backgroundColor: variables.themeBackgroundColor,
        color: variables.themeFontColor,
        height: '100%',
        padding: variables.themeInputPadding,
        borderColor: 'transparent',
        margin: 0,
        borderBottom: `solid ${pxToRem(2)} transparent`,
        ':focus, ::selection': {
          borderColor: 'transparent',
          borderBottom: variables.themeFocusBorderBottom,
        },
      },
      '>i': {
        color: '#222426',
      },
    }),
  },
})
