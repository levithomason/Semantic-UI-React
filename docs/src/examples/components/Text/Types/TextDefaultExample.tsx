import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextDefaultExample = () => <Text>{faker.lorem.paragraph()}</Text>

export default TextDefaultExample
