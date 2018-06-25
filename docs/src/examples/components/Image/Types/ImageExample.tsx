import React from 'react'
import {
  Image,
  ImageCreateComponent,
  ImageFunctionalContext,
  ImageHOCContext,
  ImageRenderComponent,
  ImageRenderFunction,
} from 'stardust'

const props = { circular: true, src: '//placehold.it/50' }

const ImageExample = () => (
  <div>
    <Image {...props} />
    <ImageCreateComponent {...props} />
    <ImageFunctionalContext {...props} />
    <ImageHOCContext {...props} />
    <ImageRenderComponent {...props} />
    <ImageRenderFunction {...props} />
  </div>
)

export default ImageExample
