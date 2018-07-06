import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenExist,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  UIComponent,
} from '../../lib'
import HeaderSubheader from './HeaderSubheader'
import HeaderContent from './HeaderContent'
import headerRules from './headerRules'
import headerVariables from './headerVariables'

/**
 * A header provides a short summary of content
 */
class Header extends UIComponent<any, any> {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    styles: PropTypes.object,

    /** Shorthand for Header.Subheader. */
    subheader: customPropTypes.itemShorthand,

    /** Align header content. */
    textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'content',
    'styles',
    'subheader',
    'textAlign',
  ]

  static rules = headerRules

  static variables = headerVariables

  static Content = HeaderContent
  static Subheader = HeaderSubheader

  render() {
    const { children, className, content, subheader, textAlign, styles } = this.props

    const classes = cx('ui-header', styles.root, className)
    const rest = getUnhandledProps(Header, this.props)
    const ElementType = getElementType(Header, this.props)

    if (childrenExist(children)) {
      return (
        <ElementType {...rest} className={classes}>
          {children}
        </ElementType>
      )
    }

    const subheaderElement = HeaderSubheader.create(subheader, { autoGenerateKey: false })

    return (
      <ElementType {...rest} className={classes}>
        {content}
        {subheaderElement}
      </ElementType>
    )
  }
}

export default Header
