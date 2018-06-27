import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Text component."
      examplePath="components/Text/Types/TextDefaultExample"
    />
    <ComponentExample
      title="Extra Small"
      description="An extra small Text component."
      examplePath="components/Text/Types/TextExtraSmallExample"
    />
    <ComponentExample
      title="Small"
      description="An small Text component."
      examplePath="components/Text/Types/TextSmallExample"
    />
    <ComponentExample
      title="Medium"
      description="A medium Text component."
      examplePath="components/Text/Types/TextMediumExample"
    />
    <ComponentExample
      title="Large"
      description="A large Text component."
      examplePath="components/Text/Types/TextLargeExample"
    />
    <ComponentExample
      title="Extra Large"
      description="An extra large Text component."
      examplePath="components/Text/Types/TextExtraLargeExample"
    />
    <ComponentExample
      title="2x"
      description="A 2x Text component."
      examplePath="components/Text/Types/Text2xExample"
    />
    <ComponentExample
      title="3x"
      description="A 3x Text component."
      examplePath="components/Text/Types/Text3xExample"
    />
    <ComponentExample
      title="4x"
      description="A 4x Text component."
      examplePath="components/Text/Types/Text4xExample"
    />
  </ExampleSection>
)

export default Types
