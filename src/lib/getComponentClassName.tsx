import _ from 'lodash'

const getComponentClassName = displayName => `ui-${_.kebabCase(displayName)}`

export default getComponentClassName
