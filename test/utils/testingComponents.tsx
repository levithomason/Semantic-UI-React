import React from 'react'
import { mount } from 'enzyme'

import Provider from 'src/components/Provider'

export const getComponentMountedWithProvider = (Element: any, options?: {}) =>
  mount(<Provider siteVariables={{}}>{Element}</Provider>, options)

export const getTestingRenderedComponent = (Component: any, Element: any, options?: {}) => {
  const wrapper = getComponentMountedWithProvider(Element, options)

  return wrapper.find(Component)
}
