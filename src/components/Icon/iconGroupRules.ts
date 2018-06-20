import { getSize } from './iconCommonRules'

export default ({ size }) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    fontSize: getSize(size),
  },
})
