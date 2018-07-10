import cx from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import dividerRules from './dividerRules'
import dividerVariables from './dividerVariables'

import { customPropTypes, createComponent, getElementType, getUnhandledProps } from '../../lib'

const Divider: any = (props: any) => {
  const ElementType = getElementType(Divider, props)
  const { children, className, styles } = props
  const rest = getUnhandledProps(Divider, props)

  return (
    <ElementType {...rest} className={cx('ui-divider', styles.root, className)}>
      {children}
    </ElementType>
  )
}

Divider.propTypes = {
  as: customPropTypes.as,

  /** Size multiplier (default 0) * */
  size: PropTypes.number,

  /** TODO: this is not a prop we want here... */
  styles: PropTypes.object,

  /** Child content * */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A Divider can be formatted to show different levels of emphasis. */
  type: PropTypes.oneOf(['primary', 'secondary']),

  /** A divider can appear more important and draw the user's attention. */
  important: PropTypes.bool,
}

Divider.handledProps = ['as', 'children', 'className', 'important', 'size', 'styles', 'type']

Divider.defaultProps = {
  size: 0,
}

export default createComponent(Divider, {
  rules: dividerRules,
  variables: dividerVariables,
})
