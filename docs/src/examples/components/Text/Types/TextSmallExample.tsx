import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextSmallExample = () => <Text size="sm">{faker.lorem.paragraph()}</Text>

export default TextSmallExample
