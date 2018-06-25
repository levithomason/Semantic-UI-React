import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, Render } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
class ImageRenderComponent extends React.Component {
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
    return (
      <Render
        component={ImageRenderComponent}
        displayName="ImageRenderComponent"
        props={this.props}
        state={this.state}
        rules={imageRules}
        variables={imageVariables}
        render={({ ElementType, classes, rest }) => (
          <ElementType {...rest} className={classes.root} />
        )}
      />
    )
  }
}

export default ImageRenderComponent
