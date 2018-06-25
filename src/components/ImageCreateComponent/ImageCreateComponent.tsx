import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import {
  customPropTypes,
  getComponentClassName,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'
import createComponent from '../../lib/createComponent'

/**
 * An image is a graphic representation of something.
 */
class ImageCreateComponent extends React.Component<any> {
  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,
  }

  static defaultProps = {
    as: 'img',
  }

  render() {
    const { classes } = this.props
    const ElementType = getElementType(ImageCreateComponent, this.props)
    const rest = getUnhandledProps(ImageCreateComponent, this.props)

    const classNames = cx(getComponentClassName(ImageCreateComponent), classes.root)

    return <ElementType {...rest} className={classNames} />
  }
}

export default createComponent(ImageCreateComponent, {
  rules: imageRules,
  variables: imageVariables,
})
