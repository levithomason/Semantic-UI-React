import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import { createComponent, getElementType, SUI, customPropTypes } from '../../lib'

import rules from './iconRules'

class Icon extends React.Component<any, any> {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Color of the icon. */
    color: PropTypes.oneOf(SUI.COLORS),

    /** Name of the icon. */
    name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),

    /** Size of the icon. */
    size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

    /** The type of font that needs to be used */
    kind: PropTypes.string,

    /** FELA styles */
    styles: PropTypes.object,
  }

  static defaultProps = {
    as: 'i',
    kind: 'FontAwesome',
  }

  render() {
    const { className, styles } = this.props
    const classes = cx(className, styles.root)
    const ElementType = getElementType(Icon, this.props)
    return <ElementType className={classes} />
  }
}

export default createComponent(Icon, { rules })
