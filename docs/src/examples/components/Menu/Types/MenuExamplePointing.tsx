import React from 'react'
import { Menu } from 'stardust'

const items = [
  { key: 'editorials', name: 'Editorials' },
  { key: 'review', name: 'Reviews' },
  { key: 'events', name: 'Upcoming Events' },
]

class MenuExamplePointing extends React.Component {
  render() {
    return <Menu defaultActiveIndex={0} items={items} pointing />
  }
}

export default MenuExamplePointing
