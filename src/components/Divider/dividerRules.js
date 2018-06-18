import { rem, hasChildren } from '../../lib'

const dividerBorderRule = size => ({
  height: rem(size * 0.1),
  background: 'lightgray',
})

const beforeAndAfter = (size, radius) => ({
  content: '""',
  flex: 1,
  borderRadius: rem(radius),
  ...dividerBorderRule(size),
})

export default props => ({
  root: {
    marginTop: rem(props.size * 0.75),
    marginBottom: rem(props.size * 0.75),
    ...(hasChildren(props)
      ? {
        display: 'flex',
        alignItems: 'center',
        ':before': {
          ...beforeAndAfter(props.size, props.variables.borderRadius),
          marginRight: rem(1 + props.size * 0.2),
        },
        ':after': {
          ...beforeAndAfter(props.size, props.variables.borderRadius),
          marginLeft: rem(1 + props.size * 0.2),
        },
      }
      : {
        textAlign: 'center',
        lineHeight: 0,
        fontSize: rem(1.4 + props.size * 0.1),
        borderRadius: rem(props.variables.borderRadius),
        ...dividerBorderRule(props.size, props.variables.borderRadius),
      }),
  },
})
