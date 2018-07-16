import PropTypes from 'prop-types'
import React, { ReactNode, CSSProperties } from 'react'

import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import buttonRules from './buttonRules'
import buttonVariables from './buttonVariables'
import Icon from '../Icon'

export type IconPosition = 'left' | 'right'
export type ButtonType = 'primary' | 'secondary'

export interface IButtonProps {
  as?: string
  children?: ReactNode
  circular?: boolean
  className?: string
  content?: ReactNode
  icon?: ReactNode
  iconPosition?: IconPosition
  style?: CSSProperties
  type?: ButtonType
}

/**
 * A button.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Button extends UIComponent<IButtonProps, any> {
  public static displayName = 'Button'

  public static className = 'ui-button'

  public static rules = buttonRules

  public static variables = buttonVariables

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Add an Icon by name, props object, or pass an <Icon />. */
    icon: customPropTypes.some([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
      PropTypes.element,
    ]),

    /** An icon button can format an Icon to appear on the left or right. */
    iconPosition: PropTypes.oneOf(['left', 'right']),

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),
  }

  public static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'icon',
    'iconPosition',
    'type',
  ]

  public static defaultProps = {
    as: 'button',
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IButtonProps>): ReactNode {
    const { children, content, icon, iconPosition, type } = this.props
    const primary = type === 'primary'

    const getContent = (): ReactNode => {
      if (childrenExist(children)) {
        return children
      }

      const renderedContent = [
        content && (
          <span key="btn-content" className={classes.span}>
            {content}
          </span>
        ),
        icon && (
          <Icon
            key="btn-icon"
            name={icon}
            color={primary ? 'white' : 'black'}
            variables={{ margin: 'auto' }}
          />
        ),
      ].filter(Boolean)

      return iconPosition === 'right' ? renderedContent : renderedContent.reverse()
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {getContent()}
      </ElementType>
    )
  }
}

export default Button
