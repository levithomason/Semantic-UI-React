import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import { createComponent, getElementType, SUI, customPropTypes } from '../../lib'

import IconGroup from './IconGroup'
import rules from './iconRules'

class Icon extends React.Component<any, any> {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Formatted to appear bordered. */
    bordered: PropTypes.bool,

    /** Icon can formatted to appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Color of the icon. */
    color: PropTypes.oneOf(SUI.COLORS),

    /** Show that the icon is inactive. */
    disabled: PropTypes.bool,

    /** Icon can flipped. */
    flipped: PropTypes.oneOf(['horizontally', 'vertically']),

    /** Formatted to have its colors inverted for contrast. */
    inverted: PropTypes.bool,

    /** Icon can be formatted as a link. */
    link: PropTypes.bool,

    /** Icon can be used as a simple loader. */
    loading: PropTypes.bool,

    /** Name of the icon. */
    name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),

    /** Icon can rotated. */
    rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

    /** Size of the icon. */
    size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

    /** Icon can have an aria label. */
    'aria-label': PropTypes.string,

    /** The type of font that needs to be used */
    kind: PropTypes.string,

    /** FELA styles */
    styles: PropTypes.object,
  }

  static defaultProps = {
    as: 'i',
    kind: 'FontAwesome',
  }

  static Group = IconGroup

  getIconAriaOptions() {
    const ariaOptions = {}
    const { 'aria-label': ariaLabel } = this.props
    if (!ariaLabel) {
      ariaOptions['aria-hidden'] = 'true'
    }
    return ariaOptions
  }

  render() {
    const { className, styles } = this.props
    const classes = cx(className, styles.root)
    const ElementType = getElementType(Icon, this.props)
    const ariaOptions = this.getIconAriaOptions()
    return <ElementType {...ariaOptions} className={classes} />
  }
}

export default createComponent(Icon, { rules })
