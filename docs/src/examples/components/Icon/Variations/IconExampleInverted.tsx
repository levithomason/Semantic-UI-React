import React from 'react'
import { Icon } from 'stardust'

const examples = [
  'chess rock',
  'book',
  'expand',
  'play',
  'stop',
  'calendar alternate outline',
  'coffee',
  'compass outline',
  'area chart',
]

const IconExampleInverted = () => examples.map(iconName => <Icon name={iconName} inverted />)

export default IconExampleInverted
