import React from 'react'
import { Accordion, List, Image, Button } from 'stardust'

class AccordionExampleList extends React.Component {
  imgStyle = { display: 'block', width: '2rem' }
  getAvatar = () => <Image src="//placehold.it/100" style={this.imgStyle} />

  firstGroupList = [
    {
      key: 'g11',
      media: this.getAvatar(),
      header: 'cat',
    },
    {
      key: 'g12',
      media: this.getAvatar(),
      header: 'dog',
    },
    {
      key: 'g13',
      media: this.getAvatar(),
      header: 'mouse',
    },
  ]

  secondGroupList = [
    {
      key: 'g21',
      media: this.getAvatar(),
      header: 'frog',
    },
    {
      key: 'g22',
      media: this.getAvatar(),
      header: 'snake',
    },
  ]
  state = { activeIndex: 0 }

  activeIcon = <span>&#9660;</span>
  inactiveIcon = <span>&#9654;</span>

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  isIndexActive = index => {
    const { activeIndex } = this.state

    return activeIndex === index
  }

  render() {
    const { activeIndex } = this.state
    const buttonStyle = { marginLeft: '1.3rem' }

    return (
      <Accordion>
        <Accordion.Title active={this.isIndexActive(0)} index={0} onClick={this.handleClick}>
          {this.isIndexActive(0) ? this.activeIcon : this.inactiveIcon} Pets
        </Accordion.Title>
        <Accordion.Content active={this.isIndexActive(0)}>
          <List items={this.firstGroupList} />
          <Button style={buttonStyle}>Add pet</Button>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default AccordionExampleList
