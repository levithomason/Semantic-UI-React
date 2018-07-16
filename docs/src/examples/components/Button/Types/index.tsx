import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A standard button."
      examplePath="components/Button/Types/ButtonExample"
    />
    <ComponentExample
      title="Emphasis"
      description="A button can be formatted to show different levels of emphasis."
      examplePath="components/Button/Types/ButtonExampleEmphasis"
    />
    <ComponentExample
      title="Icon"
      description="A button can be made of only an icon."
      examplePath="components/Button/Types/ButtonExampleIcon"
    />
    <ComponentExample
      title="Labeled Icon"
      description="A button can use an icon as a label."
      examplePath="components/Button/Types/ButtonExampleLabeledIcon"
    />
  </ExampleSection>
)

export default Types
