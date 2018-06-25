import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, renderComponent } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
class ImageRenderFunction extends React.Component {
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

  static handledProps = ['as', 'avatar', 'circular']

  render() {
    return renderComponent(
      {
        component: ImageRenderFunction,
        displayName: 'ImageRenderFunction',
        props: this.props,
        state: this.state,
        rules: imageRules,
        variables: imageVariables,
      },
      ({ ElementType, classes, rest }) =>
        console.log(ElementType, classes, rest) || (
          <ElementType {...rest} className={classes.root} />
        ),
    )
  }
}

export default ImageRenderFunction
