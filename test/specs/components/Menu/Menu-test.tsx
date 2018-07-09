import React from 'react'
import { mount } from 'enzyme'

import Menu from 'src/components/Menu/Menu'
import Provider from 'src/components/Provider'
import { isConformant } from 'test/specs/commonTests'

describe('Menu', () => {
  isConformant(Menu)

  const getTestingRenderedComponent = mountedElement => {
    let wrapper = mountedElement
    while (wrapper.name() !== Menu.wrappedComponent) {
      wrapper = wrapper.childAt(0)
    }
    return wrapper
  }

  function renderWithProvider(el) {
    return mount(<Provider siteVariables={{}}>{el}</Provider>)
  }

  describe('items', () => {
    const handlerSpy = jest.fn()
    const items = [
      { key: 'home', name: 'home', onClick: handlerSpy, 'data-foo': 'something' },
      { key: 'users', name: 'users', 'data-foo': 'something' },
    ]

    let renderedMenu
    let menu
    let menuItems

    beforeEach(() => {
      renderedMenu = renderWithProvider(<Menu items={items} />)
      menu = getTestingRenderedComponent(renderedMenu)
      menuItems = menu.find('MenuItem')
    })

    it('renders children', () => {
      expect(menuItems.length).toBe(2)
      expect(menuItems.first().prop('name')).toBe('home')
      expect(menuItems.last().prop('name')).toBe('users')
    })

    it('calls onClick handler for item', () => {
      const event = { target: null }
      menuItems.first().simulate('click', event)
      expect(handlerSpy).toHaveBeenCalled()
    })

    it('passes arbitrary props', () => {
      expect(menuItems.everyWhere(item => item.prop('data-foo') === 'something')).toBe(true)
    })

    describe('activeIndex', () => {
      it('should not be set by default', () => {
        expect(menuItems.everyWhere(item => !item.is('[active="true"]'))).toBe(true)
      })

      it('should be set when item is clicked', () => {
        const event = { target: null }
        menuItems.last().simulate('click', event)

        // re-query menuItems not to use a cached copy
        menuItems = renderedMenu.find('MenuItem')
        const activeItems = menuItems.find('[active=true]')
        expect(activeItems.length).toBe(1)
        expect(activeItems.first().is('[name="users"]')).toBe(true)
      })
    })
  })
})
