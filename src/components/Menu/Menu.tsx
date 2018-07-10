import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  createComponent,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'
import menuVariables from './menuVariables'

class Menu extends AutoControlledComponent {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    /** FELA styles */
    styles: PropTypes.object,

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),
  }

  static Item = MenuItem

  static autoControlledProps = ['activeIndex']

  static handledProps = [
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'items',
    'shape',
    'styles',
    'type',
  ]

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = () => {
    const { items, type, shape } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          type,
          shape,
          index,
          active: parseInt(activeIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  static defaultProps = {}

  render() {
    const { children, className, styles } = this.props

    const classes = cx('ui-menu', styles.root, className)
    const ElementType = getElementType(Menu, this.props, () => 'ul')
    const rest = getUnhandledProps(Menu, this.props)

    return (
      <ElementType {...rest} className={classes}>
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }
}

export default createComponent(Menu, {
  rules: menuRules,
  variables: menuVariables,
})
