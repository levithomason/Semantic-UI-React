import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Size"
      description="An icon can vary in size."
      examplePath="components/Icon/Variations/IconExampleSize"
    />
    <ComponentExample
      title="Colored"
      description="An icon can be formatted with different colors."
      examplePath="components/Icon/Variations/IconExampleColored"
    />
    <ComponentExample
      title="Inverted"
      description="Use icon color as a background."
      examplePath="components/Icon/Variations/IconExampleInverted"
    />
  </ExampleSection>
)

export default Variations
