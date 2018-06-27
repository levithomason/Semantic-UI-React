import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, renderComponent } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'

/**
 * A button.
 */
class Button extends React.Component<any> {
  static displayName = 'Button'

  static className = 'ui-button'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** A bunch of styles we might not need. */
    styles: PropTypes.object,
  }

  static handledProps = ['as', 'circular', 'className', 'styles']

  static defaultProps = {
    as: 'button',
  }

  render() {
    return renderComponent(
      {
        props: this.props,
        component: Button,
        rules: buttonRules,
        variables: buttonVariables,
      },
      ({ ElementType, classes, rest }) => <ElementType {...rest} className={classes.root} />,
    )
  }
}

export default Button
