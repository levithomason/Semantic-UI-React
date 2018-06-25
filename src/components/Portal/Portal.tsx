import React, { cloneElement } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { AutoControlledComponent, eventStack, makeDebugger } from '../../lib'

const debug = makeDebugger('portal')

class Portal extends AutoControlledComponent {
  static propTypes = {
    trigger: PropTypes.node,

    open: PropTypes.bool,

    defaultOpen: PropTypes.bool,
  }

  static autoControlledProps = ['open']

  handleTriggerClick = () => {
    debug('handleTriggerClick()')
    this.props.trigger.props.onClick()
    this.setState({ open: !this.state.open })
  }

  handlePortalMouseEnter = () => {
    debug('handlePortalMouseEnter()')
  }

  componentDidMount() {
    debug('componentDidMount()', this.state)
    if (this.state.open) {
      this.createPortal()
    }
  }

  componentDidUpdate() {
    debug('componentDidUpdate()', this.state)
    if (this.state.open) {
      this.createPortal()
    }
  }

  componentWillUnmount() {
    debug('componentWillUnmount()')
  }

  createPortal() {
    if (this.state.portalEl) {
      return
    }
    console.log('creating portalEl')
    const portalEl = document.createElement('div')
    document.body.appendChild(portalEl)
    eventStack.sub('mouseenter', this.handlePortalMouseEnter, {
      target: portalEl,
    })
    this.setState({
      portalEl,
    })
  }

  destroyPortal() {}

  // To discuss:
  // when to create rootNode? (it is required in render, componentWillMount is deprecated)
  // should multiple portals share it? (how would mouseenter/mouseleave on portalEl work then?)
  // when to destroy it (it is too early in componentWillUnmount)

  render() {
    const { trigger } = this.props
    debug('render')

    if (!trigger) {
      return
    }

    return (
      <React.Fragment>
        {cloneElement(trigger, {
          onClick: this.handleTriggerClick,
        })}
        {this.state.open &&
          this.state.portalEl &&
          ReactDOM.createPortal(this.props.children, this.state.portalEl)}
      </React.Fragment>
    )
  }
}

export default Portal
