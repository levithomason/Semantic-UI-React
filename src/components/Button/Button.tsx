import PropTypes from 'prop-types'
import React from 'react'

import { UIComponent, customPropTypes } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'

/**
 * A button.
 */
class Button extends UIComponent<any, any> {
  static displayName = 'Button'

  static className = 'ui-button'

  static rules = buttonRules

  static variables = buttonVariables

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can appear circular. */
    circular: PropTypes.bool,
  }

  static handledProps = ['as', 'circular', 'className']

  static defaultProps = {
    as: 'button',
  }

  render({ ElementType, classes, rest }) {
    return <ElementType {...rest} className={classes.root} />
  }
}

export default Button
