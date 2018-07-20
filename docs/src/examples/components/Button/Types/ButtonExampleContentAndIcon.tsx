import React from 'react'
import { Button, Icon } from 'stardust'

const ButtonExampleContentAndIcon = () => (
  <div>
    <Button type="primary">
      <Icon name="book" color="white" style={{ margin: 'auto' }} />
      <span style={{ paddingLeft: '10px' }}>Click me left</span>
    </Button>
    <Button type="secondary">
      <span style={{ paddingRight: '10px' }}>Click me right</span>
      <Icon name="coffee" style={{ margin: 'auto' }} />
    </Button>
  </div>
)

export default ButtonExampleContentAndIcon
