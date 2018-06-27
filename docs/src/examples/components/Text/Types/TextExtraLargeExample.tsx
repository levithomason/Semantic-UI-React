import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextExtraLargeExample = () => <Text size="xl">{faker.lorem.paragraph()}</Text>

export default TextExtraLargeExample
