import React from 'react'
import { Button, Icon } from '@stardust-ui/react'

const ButtonExampleEmphasisCircular = () => (
  <div>
    <Button type="primary" circular>
      <Icon name="coffee" color="white" style={{ margin: 'auto' }} />
    </Button>
    <Button type="secondary" circular>
      <Icon name="book" style={{ margin: 'auto' }} />
    </Button>
  </div>
)

export default ButtonExampleEmphasisCircular
