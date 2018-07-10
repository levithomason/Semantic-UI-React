import { pxToRem } from '../../lib'

const solidBorder = (color: string) => ({
  border: `1px solid ${color}`,
})

export default ({ type, shape, variables }) => ({
  root: {
    display: 'flex',
    ...(shape !== 'pills' &&
      shape !== 'underlined' && {
        ...solidBorder(variables.defaultBorderColor),
        ...(type === 'primary' && {
          ...solidBorder(variables.typePrimaryBorderColor),
        }),
        borderRadius: pxToRem(4),
      }),
    ...(shape === 'underlined' && {
      borderBottom: `1px solid ${variables.defaultBorderColor}`,
    }),
    minHeight: pxToRem(28),
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})
