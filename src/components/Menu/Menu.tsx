import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'

class Menu extends UIComponent<any, any> {
  static className = 'ui-menu'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = ['as', 'children', 'className', 'styles']

  static Item = MenuItem

  static rules = menuRules

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Menu.create = createShorthandFactory(Menu, content => ({ content }))

export default Menu
