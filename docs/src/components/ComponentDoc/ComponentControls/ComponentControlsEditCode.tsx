import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsToolTip from './ComponentControlsToolTip'

const ComponentControlsEditCode: any = ({ active, onClick }) => {
  const btnLabel = 'Edit Code'

  return (
    <ComponentControlsToolTip content={btnLabel}>
      <Menu.Item active={active} onClick={onClick}>
        <Icon color={active ? 'green' : 'grey'} fitted name="code" size="large" />
        {btnLabel}
      </Menu.Item>
    </ComponentControlsToolTip>
  )
}

ComponentControlsEditCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsEditCode)
