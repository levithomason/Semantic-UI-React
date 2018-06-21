import { rem } from '../../lib'

export default ({ active }) => ({
  root: {
    color: 'rgba(0, 0, 0, .87)',
    lineHeight: 1,
    position: 'relative',
    verticalAlign: 'middle',
    padding: `${rem(0.92857143)} ${rem(1.14285714)}`,

    cursor: 'pointer',
    ':hover': {
      background: 'rgba(0, 0, 0, .03)',
      color: 'rgba(0, 0, 0, .95)',
    },
    ...(active && {
      background: 'rgba(0, 0, 0, .05)',
      color: 'rgba(0, 0, 0, .95)',
      ':hover': {
        background: 'rgba(0, 0, 0, .05)',
        color: 'rgba(0, 0, 0, .95)',
      },
    }),

    ':before': {
      position: 'absolute',
      content: '""',
      top: '0%',
      right: '0px',
      height: '100%',
      width: '1px',
      background: 'rgba(34, 36, 38, .1)',
    },
  },
})
