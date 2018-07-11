import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Menu, Transition } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsCopyLink from './ComponentControlsCopyLink'
import ComponentControlsEditCode from './ComponentControlsEditCode'
import ComponentControlsShowVariables from './ComponentControlsShowVariables'
import ComponentControlsMaximize from './ComponentControlsMaximize'
import ComponentControlsShowHtml from './ComponentControlsShowHtml'
import ComponentControlsRtl from './ComponentControlsRtl'

class ComponentControls extends PureComponent<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
    }
  }

  static propTypes = {
    examplePath: PropTypes.string,
    anchorName: PropTypes.string,
    onCopyLink: PropTypes.func,
    onShowCode: PropTypes.func,
    onShowHTML: PropTypes.func,
    onShowRtl: PropTypes.func,
    onShowVariables: PropTypes.func,
    showCode: PropTypes.bool,
    showHTML: PropTypes.bool,
    showRtl: PropTypes.bool,
    showVariables: PropTypes.bool,
    visible: PropTypes.bool,
    isParentHovered: PropTypes.bool,
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
    })
  }

  handleMouseMove = () => {
    this.setState({
      isHovering: true,
    })
  }

  render() {
    const {
      anchorName,
      examplePath,
      showHTML,
      showRtl,
      showCode,
      showVariables,
      onCopyLink,
      onShowHTML,
      onShowRtl,
      onShowCode,
      onShowVariables,
      visible,
      isParentHovered,
    } = this.props

    const { isHovering } = this.state

    return (
      <Transition duration={200} visible={!!visible} unmountOnHide>
        {/*
        Heads up! Don't remove this `div`, visible Transition applies `display: block`,
        while Menu should have `display: inline-flex`
      */}
        <div>
          <Menu
            color="green"
            compact
            icon
            size="small"
            text
            onMouseLeave={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
          >
            <ComponentControlsEditCode
              active={showCode}
              onClick={onShowCode}
              isParentHovered={isParentHovered && !isHovering}
            />
            <ComponentControlsShowVariables active={showVariables} onClick={onShowVariables} />
            <ComponentControlsShowHtml active={showHTML} onClick={onShowHTML} />
            <ComponentControlsRtl active={showRtl} onClick={onShowRtl} />
            <ComponentControlsMaximize examplePath={examplePath} />
            <ComponentControlsCopyLink anchorName={anchorName} onClick={onCopyLink} />
          </Menu>
        </div>
      </Transition>
    )
  }
}

export default updateForKeys([
  'showCode',
  'showHTML',
  'showRtl',
  'showVariables',
  'visible',
  'isParentHovered',
])(ComponentControls)
