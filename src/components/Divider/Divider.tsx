import React from 'react'
import PropTypes from 'prop-types'

import dividerRules from './dividerRules'
import dividerVariables from './dividerVariables'

import { customPropTypes, UIComponent } from '../../lib'

class Divider extends UIComponent<any, any> {
  static displayName = 'Divider'

  static className = 'ui-divider'

  static rules = dividerRules

  static variables = dividerVariables

  static propTypes = {
    as: customPropTypes.as,

    /** Size multiplier (default 0) * */
    size: PropTypes.number,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,
  }

  static handledProps = ['as', 'children', 'className', 'size']

  static defaultProps = {
    size: 0,
  }

  // TODO: exists only for doc detection, remove once react-docgen is replaced
  render() {
    return null
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {children}
      </ElementType>
    )
  }
}

export default Divider
