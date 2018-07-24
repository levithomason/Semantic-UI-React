import React from 'react'
import { Button, Icon } from '@stardust-ui/react'

const ButtonExampleCircular = () => (
  <div>
    <Button circular>C</Button>
    <Button circular>
      <Icon name="book" style={{ margin: 'auto' }} />
    </Button>
  </div>
)

export default ButtonExampleCircular
