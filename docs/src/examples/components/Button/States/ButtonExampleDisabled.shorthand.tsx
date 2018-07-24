import React from 'react'
import { Button } from 'stardust'

const ButtonExampleDisabled = () => (
  <div>
    <Button disabled content="Default" />
    <Button disabled type="primary" content="Primary" />
    <Button disabled type="secondary" content="Secondary" />
    <Button disabled type="primary" icon="book" content="Click me" iconPosition="left" />
    <Button disabled circular icon="coffee" />
  </div>
)

export default ButtonExampleDisabled
