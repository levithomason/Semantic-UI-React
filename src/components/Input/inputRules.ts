export default ({ error, focus }) => ({
  root: {
    // ...(focus && { borderColor: 'blue' }),
    ...(error && { borderColor: 'red' }),
  },
})
