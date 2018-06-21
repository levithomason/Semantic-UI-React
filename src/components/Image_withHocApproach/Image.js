import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import { customPropTypes, getElementType, getUnhandledProps, withThemeStyling } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
// eslint-disable-next-line react/prefer-stateless-function
class Image extends React.Component {
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
    const ElementType = getElementType(Image, this.props)
    const rest = getUnhandledProps(Image, this.props)

    return withThemeStyling((getThemeClasses) => {
      const classes = getThemeClasses(this.props, imageRules, imageVariables)
      const classNames = cx('ui-image', classes.root)

      return <ElementType {...rest} className={classNames} />
    })
  }
}

export default Image
