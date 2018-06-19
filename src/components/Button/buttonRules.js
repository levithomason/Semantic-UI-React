const buttonRules = ({ active, circular, color, variables }) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    ...(circular && { borderRadius: variables.borderRadius }),
    color,
    active,
  },
})

export default buttonRules
