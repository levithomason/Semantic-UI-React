import React from 'react'

import { isConformant } from '../../commonTests'
import { mount } from 'enzyme'
import MenuItem from 'src/components/Menu/MenuItem'
import Provider from 'src/components/Provider'

describe('MenuItem', () => {
  isConformant(MenuItem)

  const getTestingRenderedComponent = mountedElement => {
    let wrapper = mountedElement
    while (wrapper.name() !== MenuItem.wrappedComponent) {
      wrapper = wrapper.childAt(0)
    }
    return wrapper
  }

  function renderWithProvider(el) {
    return getTestingRenderedComponent(mount(<Provider siteVariables={{}}>{el}</Provider>))
  }

  describe('Shorthand', () => {
    it('content renders as `li > a`', () => {
      const menuItem = renderWithProvider(<MenuItem content="Home" />)
      expect(menuItem.childAt(0).is('li')).toBe(true)
      expect(
        menuItem
          .childAt(0)
          .childAt(0)
          .is('a'),
      ).toBe(true)
      expect(
        menuItem
          .childAt(0)
          .childAt(0)
          .text(),
      ).toBe('Home')
    })

    it('uses capitalized `name` as `content` if `content` is not set', () => {
      const menuItem = renderWithProvider(<MenuItem name="home" />)
      expect(
        menuItem
          .childAt(0)
          .childAt(0)
          .text(),
      ).toBe('Home')
    })

    it('`content` takes precedence over `name` if both are defined', () => {
      const menuItem = renderWithProvider(<MenuItem name="homeName" content="homeContent" />)
      expect(
        menuItem
          .childAt(0)
          .childAt(0)
          .text(),
      ).toBe('homeContent')
    })
  })

  it('children render directly inside `li`', () => {
    const menuItem = renderWithProvider(
      <MenuItem>
        <div>Home</div>
      </MenuItem>,
    )
    expect(menuItem.childAt(0).is('li')).toBe(true)
    expect(
      menuItem
        .childAt(0)
        .childAt(0)
        .html(),
    ).toBe('<div>Home</div>')
  })
})
