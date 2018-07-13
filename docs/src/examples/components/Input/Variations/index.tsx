import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Icon"
      description="An input can have a search icon."
      examplePath="components/Input/Variations/InputExampleIcon"
    />
    <ComponentExample
      title="Themed"
      description="An input can follow the styles corresponding to a predefined theme."
      examplePath="components/Input/Variations/InputExampleThemed"
    />
  </ExampleSection>
)

export default Variations
