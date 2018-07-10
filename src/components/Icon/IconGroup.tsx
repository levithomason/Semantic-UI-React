import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { createComponent, customPropTypes, getElementType, SUI } from '../../lib'
import rules from './iconGroupRules'

/**
 * Several icons can be used together as a group.
 */
const IconGroup: any = props => {
  const { children, className, styles } = props

  // TODO: Ensure that side effects from 'icons' are removed
  const classes = cx('icons', className, styles.root)
  const ElementType = getElementType(IconGroup, props)
  return <ElementType className={classes}>{children}</ElementType>
}

IconGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Size of the icon group. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

  /** FELA styles */
  styles: PropTypes.object,
}

IconGroup.defaultProps = {
  as: 'i',
}

export default createComponent(IconGroup, {
  rules,
})
