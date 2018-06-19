const buttonRules = ({ circular, color, variables }) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    ...(circular && { borderRadius: variables.buttonRadius, width: variables.buttonWidth }),
    color,
  },
})

export default buttonRules
