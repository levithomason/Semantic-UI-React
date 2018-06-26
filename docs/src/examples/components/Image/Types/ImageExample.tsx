import React from 'react'
import { Image } from 'stardust'

const props = { circular: true, src: '//placehold.it/50' }

const ImageExample = () => (
  <div>
    <Image {...props} />
  </div>
)

export default ImageExample
