import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Divider."
      examplePath="components/Divider/Types/DividerExample"
    />
    <ComponentExample
      title="Divider with children"
      description="A Divider can contain children."
      examplePath="components/Divider/Types/DividerExampleChildren"
    />
    <ComponentExample
      title="Primary divider"
      description="A Divider can be styled as primary."
      examplePath="components/Divider/Types/DividerExamplePrimary"
    />
    <ComponentExample
      title="Secondary divider"
      description="A Divider can be styled as secondary."
      examplePath="components/Divider/Types/DividerExampleSecondary"
    />
  </ExampleSection>
)

export default Types
