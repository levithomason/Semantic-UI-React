import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu, Popup } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsToolTip from './ComponentControlsToolTip'

const ComponentControlsEditCode: any = ({ active, onClick, isParentHovered }) => {
  const codeIcon = (
    <ComponentControlsToolTip content="Edit Code">
      <Menu.Item active={active} onClick={onClick}>
        <Icon color={active ? 'green' : 'grey'} fitted name="code" size="large" />
      </Menu.Item>
    </ComponentControlsToolTip>
  )
  return (
    <Popup trigger={codeIcon} content="Click to edit the code" open={isParentHovered} inverted />
  )
}

ComponentControlsEditCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  isParentHovered: PropTypes.bool,
}

export default updateForKeys(['active', 'isParentHovered'])(ComponentControlsEditCode)
