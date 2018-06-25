import React from 'react'
import { Accordion } from 'stardust'

const panels = [
  {
    title: 'What is a point?',
    content:
      'In modern mathematics, a point refers usually to an element of some set called a space. In Euclidean geometry, a point is a primitive notion upon which the geometry is built, meaning that a point cannot be defined in terms of previously defined objects.',
  },
  {
    title: 'What is a dimension of a point?',
    content:
      'There are several inequivalent definitions of dimension in mathematics. In all of the common definitions, a point is 0-dimensional.',
  },
]

const AccordionExample = () => <Accordion panels={panels} />

export default AccordionExample
