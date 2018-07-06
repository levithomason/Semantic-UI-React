import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsToolTip from './ComponentControlsToolTip'

const content = 'Switch to RTL'

const ComponentControlsShowRtl: React.SFC = ({ active, onClick }: any) => (
  <ComponentControlsToolTip content={content}>
    <Menu.Item active={active} onClick={onClick}>
      <Icon color={active ? 'green' : 'grey'} size="large" name="align right" fitted />
      {content}
    </Menu.Item>
  </ComponentControlsToolTip>
)

ComponentControlsShowRtl.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowRtl)
