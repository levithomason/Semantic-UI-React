import { rem, childrenExist } from '../../lib'

const dividerBorderRule = size => ({
  height: rem(0.1 + size * 0.1),
  background: 'lightgray',
})

const beforeAndAfter = (size, radius) => ({
  content: '""',
  flex: 1,
  borderRadius: rem(radius),
  ...dividerBorderRule(size),
})

export default {
  root: ({ props, variables }) => ({
    marginTop: rem(0.1 + props.size * 0.75),
    marginBottom: rem(0.1 + props.size * 0.75),
    ...(childrenExist(props.children)
      ? {
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          lineHeight: 0,
          fontSize: rem(1.4 + props.size * 0.1),
          ':before': {
            ...beforeAndAfter(props.size, variables.borderRadius),
            marginRight: rem(1 + props.size * 0.2),
          },
          ':after': {
            ...beforeAndAfter(props.size, variables.borderRadius),
            marginLeft: rem(1 + props.size * 0.2),
          },
        }
      : {
          borderRadius: rem(variables.borderRadius),
          ...dividerBorderRule(props.size),
        }),
  }),
}
