import faker from 'faker'
import React from 'react'
import { List } from 'stardust'

const imgStyle = { display: 'block', width: '2rem', borderRadius: '999rem' }
const getAvatar = () => <img src={faker.internet.avatar()} style={imgStyle} />

const ListExampleSelection = ({ knobs }) => (
  <List
    debug={knobs.debug}
    items={[
      {
        key: 'irving',
        media: getAvatar(),
        header: 'Irving Kuhic',
        headerMedia: '7:26:56 AM',
        content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
      },
      {
        key: 'skyler',
        media: getAvatar(),
        header: 'Skyler Parks',
        headerMedia: '11:30:17 PM',
        content: 'Use the online FTP application to input the multi-byte application!',
      },
      {
        key: 'dante',
        media: getAvatar(),
        header: 'Dante Schneider',
        headerMedia: '5:22:40 PM',
        content: 'The GB pixel is down, navigate the virtual interface!',
      },
    ]}
  />
)

export default ListExampleSelection
