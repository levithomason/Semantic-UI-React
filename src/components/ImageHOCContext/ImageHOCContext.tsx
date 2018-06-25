import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import {
  customPropTypes,
  getClasses,
  getComponentClassName,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import Provider from '../Provider'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
// eslint-disable-next-line react/prefer-stateless-function
class ImageHOCContext extends React.Component {
  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    theme: PropTypes.string,
  }

  static defaultProps = {
    as: 'img',
  }

  render() {
    const ElementType = getElementType(ImageHOCContext, this.props)
    const rest = getUnhandledProps(ImageHOCContext, this.props)

    return (
      <Provider.Consumer
        render={theme => {
          const classes: any = getClasses(this.props, imageRules, imageVariables, theme)
          const classNames = cx(getComponentClassName(ImageHOCContext), classes.root)

          return <ElementType {...rest} className={classNames} />
        }}
      />
    )
  }
}

export default ImageHOCContext
