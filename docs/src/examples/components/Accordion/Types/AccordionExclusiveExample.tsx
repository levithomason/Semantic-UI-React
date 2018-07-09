import React from 'react'
import { Accordion } from 'stardust'

const panels = [
  {
    key: '1',
    title: 'One',
    content: '2 3 4',
  },
  {
    key: '5',
    title: 'Five',
    content: '6 7 8 9',
  },
  {
    key: '10',
    title: "What's next?",
    content: '10',
  },
]

const AccordionExclusiveExample = () => <Accordion panels={panels} exclusive />

export default AccordionExclusiveExample
