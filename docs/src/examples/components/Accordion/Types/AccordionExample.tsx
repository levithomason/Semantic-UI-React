import React from 'react'
import { Accordion } from 'stardust'

const panels = [
  {
    key: '1',
    title: 'What is a point?',
    content: 'Use the haptic SDD circuit, then you can index the redundant pixel!',
  },
  {
    key: '2',
    title: 'What is a dimension of a point?',
    content: 'We need to copy the primary USB firewall!',
  },
]

const AccordionExample = () => <Accordion panels={panels} />

export default AccordionExample
