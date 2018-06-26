export default {
  root: ({ props, variables }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    ...(props.circular && {
      borderRadius: variables.circularRadius,
      width: variables.circularWidth,
    }),
  }),
}
