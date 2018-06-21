import React from 'react'
import { FelaTheme } from 'react-fela'
import getClasses from './getClasses'

// renderComponent: (getThemeClasses) => Component
const withThemeStyling = renderComponent => (
  <FelaTheme
    render={(theme) => {
      const getThemedClasses = (a, b, c) => getClasses(a, b, c, theme)

      return renderComponent(getThemedClasses)
    }}
  />
)

export default withThemeStyling
