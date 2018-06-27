import React from 'react'

import { Button, Portal } from 'stardust'

class PortalExample extends React.Component {
  render() {
    return (
      <Portal
        trigger={
          <Button
            onClick={() => {
              console.log('onClick outer')
            }}
          >
            Open/close portal
          </Button>
        }
      >
        <div
          style={{
            position: 'fixed',
            left: '40%',
            top: '50%',
            padding: '50px',
            backgroundColor: 'silver',
          }}
        >
          portal popup
        </div>
      </Portal>
    )
  }
}

export default PortalExample
