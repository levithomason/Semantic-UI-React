import _ from 'lodash'

const hasDocument = typeof document === 'object' && document !== null
const hasWindow = typeof window === 'object' && window !== null && window.self === window

// eslint-disable-next-line no-confusing-arrow
const isBrowser = () => hasDocument && hasWindow

export default isBrowser
