import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsShowCode: any = ({ active, onClick }) => {
  const btnLabel = 'Try it'

  return (
    <Menu.Item active={active} onClick={onClick}>
      <Icon color={active ? 'green' : 'grey'} fitted name="code" size="large" />
      {btnLabel}
    </Menu.Item>
  )
}

ComponentControlsShowCode.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowCode)
