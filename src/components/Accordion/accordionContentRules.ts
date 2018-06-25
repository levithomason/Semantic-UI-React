const accordionContentRules = ({ active, variables }) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    ...(active && variables.active),
  },
})

export default accordionContentRules
