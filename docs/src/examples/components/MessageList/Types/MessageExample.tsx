import React from 'react'
import faker from 'faker'

import { MessageList } from 'stardust'

const MessageListExample = () => (
  <MessageList
    items={[
      { key: '1', content: 'Hello', isMine: true },
      { key: '2', content: 'Hi' },
      {
        key: '3',
        isMine: true,
        content: faker.lorem.paragraph(),
      },
      {
        key: '4',
        content: faker.lorem.paragraph(),
      },
    ]}
  />
)

export default MessageListExample
