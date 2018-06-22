export default ({ textAlign }) => ({
  root: {
    display: 'block',
    ...(textAlign && { textAlign }),
  },
})
