import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextMediumExample = () => <Text size="md">{faker.lorem.paragraph()}</Text>

export default TextMediumExample
