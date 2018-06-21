import React from 'react'
import { Menu } from 'stardust'

class MenuExample extends React.Component<{}, { activeItem: string }> {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: undefined,
    }
  }
  private handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name,
    })
  }

  public render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name="editorials"
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>
        <Menu.Item name="reviews" active={activeItem === 'reviews'} onClick={this.handleItemClick}>
          Reviews
        </Menu.Item>
        <Menu.Item
          name="upcomingEvents"
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuExample
