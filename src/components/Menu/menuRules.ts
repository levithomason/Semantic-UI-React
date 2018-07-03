import { pxToRem } from '../../lib'

export default ({ type, pointing }) => ({
  root: {
    display: 'flex',
    ...(type === 'default' && {
      border: '1px solid rgba(34, 36, 38, .15)',
      borderRadius: pxToRem(4),
    }),
    ...(type === 'secondary' &&
      pointing && {
        borderBottom: '2px solid rgba(34, 36, 38, .15)',
      }),
    minHeight: pxToRem(28),
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})
