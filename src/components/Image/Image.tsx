import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import {
  LegacyContextComponent as Component,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
class Image extends Component {
  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,
  }

  static defaultProps = {
    as: 'img',
  }

  static handledProps = ['as', 'avatar', 'circular', 'className', 'styles']

  render() {
    const ElementType = getElementType(Image, this.props)
    const rest = getUnhandledProps(Image, this.props)
    const classes = this.getClasses(this.props, imageRules, imageVariables)
    const { className } = this.props

    const classNames = cx('ui-image', classes.root, className)

    return <ElementType {...rest} className={classNames} />
  }
}

export default Image
