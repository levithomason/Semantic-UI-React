import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

import {
  AutoControlledComponent as Component,
  customPropTypes,
  createComponent,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import accordionRules from './accordionRules'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'
// import AccordionVariables from './AccordionVariables'

/**
 * A standard Accordion.
 */
class Accordion extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active panel. */
    activeIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),

    /** Only allow one panel open at a time. */
    exclusive: PropTypes.bool,

    /**
     * Called when a panel title is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

    /** A bunch of styles we might not need. */
    styles: PropTypes.object,

    /** Shorthand array of props for Accordion. */
    panels: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.arrayOf(
        PropTypes.shape({
          content: customPropTypes.itemShorthand,
          title: customPropTypes.itemShorthand,
        }),
      ),
    ]),
  }

  static handledProps = ['as', 'className', 'styles', 'panels']

  static defaultProps = {
    as: 'accordion',
    panels: [],
    exclusive: false,
  }

  static autoControlledProps = ['activeIndex']

  state: any = { activeIndex: [0] }

  getInitialAutoControlledState({ exclusive }) {
    return { activeIndex: exclusive ? -1 : [-1] }
  }

  computeNewIndex = index => {
    const { activeIndex } = this.state
    const { exclusive } = this.props

    if (exclusive) return index === activeIndex ? -1 : index
    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]
  }

  handleTitleOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      const { index } = titleProps
      const activeIndex = this.computeNewIndex(index)

      this.trySetState({ activeIndex }, index)

      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onTitleClick', e, titleProps)
    },
  })

  isIndexActive = index => {
    const { exclusive } = this.props
    const { activeIndex } = this.state

    return exclusive ? activeIndex === index : _.includes(activeIndex, index)
  }

  renderPanels = () => {
    const children = []
    const { panels } = this.props

    _.each(panels, (panel, index) => {
      const { content, title } = panel
      const active = this.isIndexActive(index)

      children.push(
        AccordionTitle.create(title, {
          defaultProps: { active, index },
          overrideProps: this.handleTitleOverrides,
        }),
      )
      children.push(AccordionContent.create(content, { defaultProps: { active } }))
    })

    return children
  }

  render() {
    const { styles, className, children } = this.props
    const rest = getUnhandledProps(Accordion, this.props)
    const ElementType = getElementType(Accordion, this.props)

    return (
      <ElementType {...rest} className={cx('ui-accordion', styles.root, className)}>
        {_.isNil(children) ? this.renderPanels() : children}
      </ElementType>
    )
  }
}

export default createComponent(Accordion, {
  rules: accordionRules,
  shorthand: content => ({ content }),
})
