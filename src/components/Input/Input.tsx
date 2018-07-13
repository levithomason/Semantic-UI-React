import PropTypes from 'prop-types'
import React, { Children, cloneElement } from 'react'
import cx from 'classnames'
import _ from 'lodash'

import {
  childrenExist,
  createHTMLInput,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  partitionHTMLProps,
  UIComponent,
  useKeyOnly,
} from '../../lib'
import inputRules from './inputRules'
import inputVariables from './inputVariables'
import Icon from '../Icon'

/**
 * An Input
 * @accessibility This is example usage of the accessibility tag.
 */
class Input extends UIComponent<any, any> {
  static className = 'ui-input'

  static displayName = 'Input'

  static rules = inputRules
  static variables = inputVariables

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

    /** Shorthand for creating the HTML Input. */
    input: customPropTypes.itemShorthand,

    /** The HTML input type. */
    type: PropTypes.string,

    /** One of the predefined themes to be applied on the element. */
    themes: PropTypes.string,
  }

  static handleProps = ['as']

  static defaultProps = {
    as: 'div',
    type: 'text',
  }

  inputRef: PropTypes.ref

  focusCbk = () => this.inputRef.focus()

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
    return null
  }

  componentDidMount() {
    if (this.props.focus) {
      this.focusCbk()
    }
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, className, error, focus, icon, input, styles, themes, type } = this.props
    const [htmlInputProps, restProps] = this.partitionProps()

    const inputClasses = cx(
      classes.root,
      classes.input,
      themes && classes.inputThemes,
      focus && classes.inputFocus,
      error && classes.inputError,
      icon && classes.inputWithIcon,
    )

    const iconClasses = cx('ui-input-icon', classes.root, classes.icon)

    // Render with children
    // ----------------------------------------
    if (childrenExist(children)) {
      // add htmlInputProps to the `<input />` child
      const childElements = _.map(Children.toArray(children), child => {
        if (child.type !== 'input') return child
        return cloneElement(child, this.handleChildOverrides(child, htmlInputProps))
      })

      return (
        <ElementType {...rest} className={classes.root}>
          {childElements}
        </ElementType>
      )
    }

    if (this.computeIcon()) {
      return (
        <ElementType {...rest} className={classes.root} {...htmlInputProps}>
          {createHTMLInput(input || type, {
            defaultProps: htmlInputProps,
            overrideProps: { className: inputClasses },
          })}
          <Icon name={this.computeIcon()} className={iconClasses} />
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes.root} {...htmlInputProps}>
        {createHTMLInput(input || type, {
          defaultProps: htmlInputProps,
          overrideProps: { className: inputClasses },
        })}
      </ElementType>
    )
  }
}

export default Input
