import PropTypes from 'prop-types'
import React, { Children, cloneElement, Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'

import {
  childrenExist,
  createComponent,
  createHTMLInput,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  partitionHTMLProps,
  useKeyOnly,
} from '../../lib'
import inputRules from './inputRules'
import Button from '../Button'

class Input extends Component<any, any> {
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

  focus = () => this.inputRef.focus()

  handleInputRef = c => (this.inputRef = c)

  handleChildOverrides = (child, defaultProps) => ({
    ...defaultProps,
    ...child.props,
    ref: c => {
      _.invoke(child, 'ref', c)
      this.handleInputRef(c)
    },
  })

  handleChange = e => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })
  }

  partitionProps = () => {
    const { type } = this.props

    const unhandled = getUnhandledProps(Input, this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled)

    return [
      {
        ...htmlInputProps,
        type,
        onChange: this.handleChange,
        ref: this.handleInputRef,
      },
      rest,
    ]
  }

  computeIcon = () => {
    const { icon } = this.props

    if (!_.isNil(icon)) return icon
  }

  componentDidMount() {
    if (this.props.focus) {
      this.focus()
    }
  }

  render() {
    const { children, className, error, focus, styles, type } = this.props
    const [htmlInputProps, rest] = this.partitionProps()
    const ElementType = getElementType(Input, this.props)
    const classes = cx(
      'ui-input',
      useKeyOnly(error, 'error'),
      useKeyOnly(focus, 'focus'),
      styles.root,
      className,
    )

    // Render with children
    // ----------------------------------------
    if (childrenExist(children)) {
      // add htmlInputProps to the `<input />` child
      const childElements = _.map(Children.toArray(children), child => {
        if (child.type !== 'input') return child
        return cloneElement(child, this.handleChildOverrides(child, htmlInputProps))
      })

      return (
        <ElementType {...rest} className={classes}>
          {childElements}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes} {...htmlInputProps}>
        {Button.create(this.computeIcon())}
      </ElementType>
    )
  }
}

export default createComponent(Input, {
  rules: inputRules,
})
