import { pxToRem } from '../../lib'

const inputRules = {
  root: ({ props, variables }) => {
    return {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      border: variables.defaultBorder,
      borderRadius: variables.borderRadius,
      outline: 0,
      padding: `${pxToRem(6)} 0 ${pxToRem(6)} ${pxToRem(10)}`,
    }
  },

  input: ({ props, variables }) => {
    return {
      outline: 0,
      border: 0,
    }
  },
}

export default inputRules
