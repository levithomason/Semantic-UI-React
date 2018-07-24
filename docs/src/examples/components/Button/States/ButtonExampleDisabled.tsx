import React from 'react'
import { Button, Icon } from 'stardust'

const ButtonExampleDisabled = () => (
  <div>
    <Button disabled>Default</Button>
    <Button disabled type="primary">
      Primary
    </Button>
    <Button disabled type="secondary">
      Secondary
    </Button>
    <Button disabled type="primary">
      <Icon disabled name="book" color="white" style={{ margin: 'auto' }} />
      <span style={{ paddingLeft: '10px' }}>Click me</span>
    </Button>
    <Button disabled circular>
      <Icon disabled name="coffee" style={{ margin: 'auto' }} />
    </Button>
  </div>
)

export default ButtonExampleDisabled
