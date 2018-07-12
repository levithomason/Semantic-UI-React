import PropTypes from 'prop-types'
import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsToolTip from './ComponentControlsToolTip'

const ComponentControlsShowHtml: any = ({ active, onClick }) => {
  const btnLabel = 'Show HTML'

  return (
    <ComponentControlsToolTip content={btnLabel}>
      <Menu.Item active={active} onClick={onClick}>
        <Icon color={active ? 'green' : 'grey'} size="large" name="html5" fitted />
        {btnLabel}
      </Menu.Item>
    </ComponentControlsToolTip>
  )
}

ComponentControlsShowHtml.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowHtml)
