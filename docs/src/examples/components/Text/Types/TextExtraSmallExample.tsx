import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextExtraSmallExample = () => <Text size="xs">{faker.lorem.paragraph()}</Text>

export default TextExtraSmallExample
