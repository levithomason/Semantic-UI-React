import React from 'react'
import { Avatar, Header } from 'stardust'

const AvatarExampleStatus = () => (
  <div style={{ background: 'white' }}>
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="Available"
      style={{ marginRight: '15px' }}
    />
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="Busy"
      style={{ marginRight: '15px' }}
    />
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="DoNotDisturb"
      style={{ marginRight: '15px' }}
    />
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="Away"
      style={{ marginRight: '15px' }}
    />
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="BeRightBack"
      style={{ marginRight: '15px' }}
    />
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="Offline"
      style={{ marginRight: '15px' }}
    />
    <Avatar
      src="/public/images/avatar/small/matt.jpg"
      status="PresenceUnknown"
      style={{ marginRight: '15px' }}
    />
  </div>
)

export default AvatarExampleStatus
