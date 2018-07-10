import React from 'react'
import { Accordion } from 'stardust'

const panels = [
  {
    key: 'one',
    title: 'One',
    content: '2 3 4',
  },
  {
    key: 'five',
    title: 'Five',
    content: '6 7 8 9',
  },
  {
    key: 'ten',
    title: "What's next?",
    content: '10',
  },
]

const AccordionExclusiveExample = () => <Accordion panels={panels} exclusive />

export default AccordionExclusiveExample
