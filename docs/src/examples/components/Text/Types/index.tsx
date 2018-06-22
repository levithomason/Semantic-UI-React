import React from 'react'
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A Default Text component."
      examplePath="components/Text/Types/TextExample"
    />
    <ComponentExample
      title="Caption"
      description="A Caption type Text component."
      examplePath="components/Text/Types/TextCaptionTypeExample"
    />
    <ComponentExample
      title="Title"
      description="A Title type Text component."
      examplePath="components/Text/Types/TextTitleTypeExample"
    />
    <ComponentExample
      title="Title2"
      description="A Title2 type Text component."
      examplePath="components/Text/Types/TextTitle2TypeExample"
    />
    <ComponentExample
      title="X-Small"
      description="A X-Small type Text component."
      examplePath="components/Text/Types/TextXSmallTypeExample"
    />
  </ExampleSection>
)

export default Types
