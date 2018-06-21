import React from 'react'
import { Image, ImageCreateComponent, ImageFunctionalContext, ImageHOCContext } from 'stardust'

const props = {
  circular: true,
  avatar: true,
  src: '//placehold.it/100',
}

const ImageExample = () => (
  <div>
    <Image {...props} />
    &emsp;
    <ImageCreateComponent {...props} />
    &emsp;
    <ImageFunctionalContext {...props} />
    &emsp;
    <ImageHOCContext {...props} />
  </div>
)

export default ImageExample
