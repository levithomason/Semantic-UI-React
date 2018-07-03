import { pxToRem } from '../../lib'

export default ({ active, pointing, type }) => ({
  root: {
    color: 'rgba(0, 0, 0, .87)',
    lineHeight: 1,
    position: 'relative',
    verticalAlign: 'middle',
    padding: `${pxToRem(14)} ${pxToRem(18)}`,
    cursor: 'pointer',
    display: 'block',
    ...(type === 'secondary' && {
      ...(!pointing && {
        margin: `0 ${rem(0.8)} 0 0`,
        borderRadius: rem(0.5),
      }),
      ...(pointing && {
        margin: '0',
        background: 'transparent',
        borderColor: '#1b1c1d',
        boxShadow: 'none',
        color: 'rgba(0,0,0,.95)',
      }),
    }),

    ':hover': {
      ...(!pointing && {
        background: 'rgba(0, 0, 0, .03)',
      }),
      color: 'rgba(0, 0, 0, .95)',
    },

    ...(active && {
      ...(!pointing && {
        background: 'rgba(0, 0, 0, .05)',
      }),
      color: 'rgba(0, 0, 0, .95)',
      ':hover': {
        ...(!pointing && {
          background: 'rgba(0, 0, 0, .05)',
        }),
        color: 'rgba(0, 0, 0, .95)',
      },
      ...(pointing && {
        ...(type === 'primary' && {
          ':after': {
            visibility: 'visible',
            backgroundColor: '#f2f2f2',
            background: '0 0',
            position: 'absolute',
            content: '""',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
            margin: '.5px 0 0',
            width: rem(1),
            height: rem(1),
            border: 'none',
            borderBottom: '1px solid #d4d4d5',
            borderRight: '1px solid #d4d4d5',
            zIndex: '2',
            transition: 'background .1s ease',
          },
        }),
        ...(type === 'secondary' && {
          fontWeight: '700',
          borderColor: '#1b1c1d',
          borderBottom: 'solid 2px',
          marginBottom: '-2px',
          transition: 'color .1s ease',
        }),
      }),
    }),

    ...(type === 'default ' && {
      ':before': {
        position: 'absolute',
        content: '""',
        top: 0,
        right: 0,
        height: '100%',
        width: '1px',
        background: 'rgba(34, 36, 38, .1)',
      },
    }),
  },
  anchor: {
    color: 'inherit',
    ':hover': {
      color: 'inherit',
    },
  },
})
