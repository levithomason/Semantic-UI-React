import { createComponent } from 'react-fela'
import { pxToRem } from 'src/lib'

const KnobsControl = createComponent(
  () => ({
    display: 'inline-block',
    padding: `0 ${pxToRem(10)}`,
    MaxWidth: pxToRem(100),
    verticalAlign: 'middle',
    textAlign: 'right',
    lineHeight: 0,
  }),
  'span',
)

export default KnobsControl
