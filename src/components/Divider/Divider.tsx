import React from 'react'
import PropTypes from 'prop-types'

import dividerRules from './dividerRules'
import dividerVariables from './dividerVariables'

import { customPropTypes, renderComponent } from '../../lib'

class Divider extends React.Component<any> {
  static displayName = 'Divider'

  static className = 'ui-divider'

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

  render() {
    const { children } = this.props
    return renderComponent(
      {
        component: Divider,
        props: this.props,
        rules: dividerRules,
        variables: dividerVariables,
      },
      ({ ElementType, classes, rest }) => (
        <ElementType {...rest} className={classes.root}>
          {children}
        </ElementType>
      ),
    )
  }
}

export default Divider
