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
      title="Link"
      description="An icon can be formatted as a link."
      examplePath="components/Icon/Variations/IconExampleLink"
    />
    <ComponentExample
      title="Flipped"
      description="An icon can be flipped."
      examplePath="components/Icon/Variations/IconExampleFlipped"
    />
    <ComponentExample
      title="Rotated"
      description="An icon can be rotated."
      examplePath="components/Icon/Variations/IconExampleRotated"
    />
    <ComponentExample
      title="Circular"
      description="An icon can be formatted to appear circular."
      examplePath="components/Icon/Variations/IconExampleCircular"
    />
    <ComponentExample
      title="Bordered"
      description="An icon can be formatted to appear bordered."
      examplePath="components/Icon/Variations/IconExampleBordered"
    />
    <ComponentExample
      title="Colored"
      description="An icon can be formatted with different colors."
      examplePath="components/Icon/Variations/IconExampleColored"
    />
  </ExampleSection>
)

export default Variations
