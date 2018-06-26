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
    this.trySetState({ open: !this.state.open })
  }

  handlePortalMouseEnter = () => {
    debug('handlePortalMouseEnter()')
  }

  componentDidMount() {
    debug('componentDidMount()', this.state)
    this.state.open ? this.createPortal() : this.destroyPortal()
  }

  componentDidUpdate() {
    debug('componentDidUpdate()', this.state)
    this.state.open ? this.createPortal() : this.destroyPortal()
  }

  componentWillUnmount() {
    debug('componentWillUnmount()')
    this.destroyPortal()
  }

  createPortal() {
    if (this.state.portalEl) {
      return
    }
    debug('creating portalEl')
    const portalEl = document.createElement('div')
    document.body.appendChild(portalEl)
    eventStack.sub('mouseenter', this.handlePortalMouseEnter, {
      target: portalEl,
    })
    this.setState({
      portalEl,
    })
  }

  destroyPortal() {
    if (!this.state.portalEl) {
      return
    }
    debug('destroying portalEl')
    // TODO: unsubscribe from all events
    const { portalEl } = this.state
    portalEl.parentNode.removeChild(portalEl)
    this.setState({ portalEl: undefined })
  }

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
