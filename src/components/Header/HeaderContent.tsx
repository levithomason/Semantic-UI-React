import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

/**
 * Header content wraps the main content when there is an adjacent Icon or Image.
 */
class HeaderContent extends UIComponent<any, any> {
  static className = 'ui-header__content'

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

  static handledProps = ['as', 'children', 'className', 'content']

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props
    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

HeaderContent.create = createShorthandFactory(HeaderContent, content => ({ content }))

export default HeaderContent
