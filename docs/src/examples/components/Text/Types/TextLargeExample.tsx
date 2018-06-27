import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextLargeExample = () => <Text size="lg">{faker.lorem.paragraph()}</Text>

export default TextLargeExample
