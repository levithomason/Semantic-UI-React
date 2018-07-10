import React from 'react'

import { isConformant } from '../../commonTests'
import Divider from 'src/components/Divider/Divider'
import { getTestingRenderedComponent } from 'test/utils'

describe('Divider', () => {
  isConformant(Divider)

  describe('type', () => {
    const typeProp = 'type'

    it('is not set by default', () => {
      const dividerType = getTestingRenderedComponent(Divider, <Divider />).prop(typeProp)
      expect(dividerType).toBeUndefined()
    })

    it('can be set to primary', () => {
      const type = 'primary'
      const dividerType = getTestingRenderedComponent(Divider, <Divider type={type} />).prop(
        typeProp,
      )

      expect(dividerType).toEqual(type)
    })

    it('can be set to secondary', () => {
      const type = 'secondary'
      const dividerType = getTestingRenderedComponent(Divider, <Divider type={type} />).prop(
        typeProp,
      )

      expect(dividerType).toEqual(type)
    })
  })
})
