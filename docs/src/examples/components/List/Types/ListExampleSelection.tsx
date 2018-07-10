import React from 'react'
import { List } from 'stardust'
import { pxToRem } from 'src/lib/fontSizeUtility'

const imgStyle = { display: 'block', width: pxToRem(28), borderRadius: pxToRem(9999) }

const ListExampleSelection = ({ knobs }) => (
  <List
    selection={knobs.selection}
    items={[
      {
        key: 'irving',
        media: <img src="/public/images/avatar/small/matt.jpg" style={imgStyle} />,
        header: 'Irving Kuhic',
        headerMedia: '7:26:56 AM',
        content:
          'If we program the sensor, we can get to the SAS alarm through the haptic SQL card!',
      },
      {
        key: 'skyler',
        media: <img src="/public/images/avatar/small/steve.jpg" style={imgStyle} />,
        header: 'Skyler Parks',
        headerMedia: '11:30:17 PM',
        content: 'Use the online FTP application, then you can input the multi-byte application!',
      },
      {
        key: 'dante',
        media: <img src="/public/images/avatar/small/nom.jpg" style={imgStyle} />,
        header: 'Dante Schneider',
        headerMedia: '5:22:40 PM',
        content: 'The GB pixel is down, navigate the virtual interface!',
      },
    ]}
  />
)

export default ListExampleSelection
