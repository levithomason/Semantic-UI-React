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

const IconExampleCircular = () => (
  <div>{examples.map(iconName => <Icon key={iconName} name={iconName} circular />)}</div>
)

export default IconExampleCircular
