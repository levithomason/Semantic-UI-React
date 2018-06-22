import { rem } from '../../lib'

export default ({ textAlign }) => ({
  root: {
    ...(textAlign && { textAlign }),
  },
})
