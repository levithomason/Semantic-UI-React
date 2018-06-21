import React from 'react'
import { MessageList } from 'stardust'

const MessageListExample = () => (
  <MessageList
    items={[
      { key: '1', content: 'Hello', isMine: true },
      { key: '2', content: 'Hi' },
      {
        key: '3',
        isMine: true,
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
      {
        key: '4',
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      },
    ]}
  />
)

export default MessageListExample
