import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, renderComponent } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
class Image extends React.Component<any, any> {
  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    className: PropTypes.string,
  }

  static defaultProps = {
    as: 'img',
  }

  static handledProps = ['as', 'avatar', 'circular', 'className']

  render() {
    return renderComponent(
      {
        component: Image,
        displayName: 'Image',
        stardustClassName: 'ui-image',
        props: this.props,
        rules: imageRules,
        variables: imageVariables,
      },
      ({ ElementType, classes, rest }) => <ElementType {...rest} className={classes.root} />,
    )
  }
}

export default Image
