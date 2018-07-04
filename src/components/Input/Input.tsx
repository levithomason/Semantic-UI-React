import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import _ from 'lodash'

import {
  customPropTypes, getUnhandledProps, getElementType, createComponent, useKeyOnly,
} from '../../lib'
import inputRules from './inputRules'
import Button from '../Button'

class Input extends React.Component<any, any> {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** An Input field can show that the data contains errors. */
    error: PropTypes.bool,

    /** An Input field can show a user is currently interacting with it. */
    focus: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

    /** The HTML input type. */
    type: PropTypes.string,
  }

  static handleProps = ['as']

  static defaultProps = {
    as: 'input',
    type: 'text',
  }

  // focus = () => this.inputRef.focus()

  // handleInputRef = c => (this.inputRef = c)
  computeIcon = () => {
    const { icon } = this.props

    if (!_.isNil(icon)) return icon
  }

  render() {
    const { styles, className, children } = this.props
    const rest = getUnhandledProps(Input, this.props)
    const ElementType = getElementType(Input, this.props)

    return (
      <ElementType {...rest} className={cx('ui-input', useKeyOnly(error, 'error'), styles.root, className)}>
        {Button.create(this.computeIcon())}
      </ElementType>
    )
  }
}

export default createComponent(Input, {
  rules: inputRules,
  shorthand: (type) => ({ type }),
})
