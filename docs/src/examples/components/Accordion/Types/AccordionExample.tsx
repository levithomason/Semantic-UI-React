import React from 'react'
import { Accordion } from 'stardust'
import faker from 'faker'

const panels = [
  {
    key: 'point',
    title: 'What is a point?',
    content: faker.hacker.phrase(),
  },
  {
    key: 'dimension',
    title: 'What is a dimension of a point?',
    content: faker.hacker.phrase(),
  },
]

const AccordionExample = () => <Accordion panels={panels} />

export default AccordionExample
