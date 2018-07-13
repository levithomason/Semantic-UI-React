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

const IconExampleBordered = () => (
  <div>{examples.map(iconName => <Icon key={iconName} name={iconName} bordered />)}</div>
)

export default IconExampleBordered
