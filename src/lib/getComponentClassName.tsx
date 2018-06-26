import _ from 'lodash'

// TODO we need to fix this in order to work for the child components (ex: ui-list__item)
const getComponentClassName = displayName => `ui-${_.kebabCase(displayName)}`

export default getComponentClassName
