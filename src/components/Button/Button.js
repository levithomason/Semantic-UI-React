import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import { customPropTypes, createComponent, getElementType, getUnhandledProps } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'

/**
 * A button.
 */
const Button = (props) => {
  const ElementType = getElementType(Button, props)
  const rest = getUnhandledProps(Button, props)
  const { styles } = props

  return <ElementType {...rest} className={cx('ui-button', styles.root)} />
}

Button.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A button can show it is currently the active user selection. */
  active: PropTypes.bool,

  /** An image can appear circular. */
  circular: PropTypes.bool,

  /** A button can have different colors */
  color: PropTypes.oneOf(['red', 'green', 'yellow', 'blue']),

  /** A button can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,

  /** A button can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(['left', 'right']),

  /** A button can take the width of its container. */
  fluid: PropTypes.bool,

  /** A button can have different sizes. */
  size: PropTypes.oneOf(['10rem', '30rem', '70rem']),

  /** A button can be formatted to toggle on and off. */
  toggle: PropTypes.bool,

  /** A bunch of styles we might not need. */
  styles: PropTypes.object,
}

Button.defaultProps = {
  as: 'button',
}

export default createComponent(Button, {
  rules: buttonRules,
  variables: buttonVariables,
})
