import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
const { FelaTheme } = require('react-fela')

import callable from './callable'
import getClasses from './getClasses'
import getDisplayName from './getDisplayName'
import { createShorthandFactory } from './factories'

const createComponent = (Component, config: any = {}): any => {
  const displayName = getDisplayName(Component)
  const { rules, variables, shorthand } = config

  const UIComponent: any = props => (
    <FelaTheme
      render={(theme) => {
        const { siteVariables = {}, componentVariables = {} } = theme
        const variablesFromFile = callable(variables)(siteVariables)
        const variablesFromTheme = callable(componentVariables[displayName])(siteVariables)
        const variablesFromProp = callable(props.variables)(siteVariables)

        const mergedVariables = () => Object.assign(
          {},
          variablesFromFile,
          variablesFromTheme,
          variablesFromProp,
        )

        const classes = getClasses(props, rules, mergedVariables, theme)

        return <Component {...props} classes={classes} styles={{}} />
      }}
    />
  )

  UIComponent.create = createShorthandFactory(UIComponent, shorthand)
  UIComponent.wrappedComponent = `${displayName}`
  UIComponent.wrappedComponentPropTypes = Component.propTypes
  UIComponent.wrappedComponentDefaultProps = Component.defaultProps
  UIComponent.wrappedComponentAutoControlledProps = Component.autoControlledProps
  UIComponent.displayName = `UI(${UIComponent.wrappedComponent})`

  return hoistNonReactStatics(UIComponent, Component)
}

export default createComponent
