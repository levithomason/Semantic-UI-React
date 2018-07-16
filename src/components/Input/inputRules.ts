import { pxToRem } from '../../lib'

const inputRules = {
  root: ({ props, variables }) => {
    return {
      display: 'inline-flex',
      position: 'relative',
    }
  },

  input: ({ props, variables }) => {
    return {
      borderRadius: variables.borderRadius,
      padding: `${pxToRem(6)} ${pxToRem(10)}`,
      outline: 0,
      border: variables.defaultBorder,
      ':focus': { border: variables.defaultBorderFocus },
    }
  },

  icon: ({ props, variables }) => {
    return {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 0,
      height: `100%`,
      width: pxToRem(26),
      fontSize: pxToRem(13),
      verticalAlign: 'middle',
      ':before, :after': {
        left: 0,
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        marginTop: '2px',
        width: '100%',
      },
    }
  },

  inputWithIcon: ({ props, variables }) => {
    return {
      padding: `${pxToRem(6)} ${pxToRem(25)} ${pxToRem(6)} ${pxToRem(10)}`,
    }
  },
}

export default inputRules
