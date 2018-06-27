import faker from 'faker'
import React from 'react'
import { Text } from 'stardust'

const TextExampleAtMention = () => (
  <Text atMention>
    @{faker.name.firstName()} {faker.name.lastName()}
  </Text>
)

export default TextExampleAtMention
