import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
const { connect, FelaTheme } = require('react-fela')

import callable from './callable'
import getDisplayName from './getDisplayName'
import { createShorthandFactory } from './factories'

const createComponent = (Component, config: any = {}): any => {
  const displayName = getDisplayName(Component)
  const { rules, variables, shorthand } = config
  const StyledComponent = rules ? connect(rules)(Component) : Component

  const UIComponent: any = props => (
    <FelaTheme
      render={({ siteVariables = {}, componentVariables = {} }) => {
        const variablesFromFile = callable(variables)(siteVariables)
        const variablesFromTheme = callable(componentVariables[displayName])(siteVariables)
        const variablesFromProp = callable(props.variables)(siteVariables)

        const mergedVariables = Object.assign(
          {},
          variablesFromFile,
          variablesFromTheme,
          variablesFromProp,
        )

        return <StyledComponent {...props} variables={mergedVariables} />
      }}
    />
  )
  UIComponent.propTypes = {
    variables: PropTypes.object,
  }

  UIComponent.create = createShorthandFactory(UIComponent, shorthand)
  UIComponent.wrappedComponent = `${displayName}`
  UIComponent.wrappedComponentPropTypes = Component.propTypes
  UIComponent.wrappedComponentDefaultProps = Component.defaultProps
  UIComponent.wrappedComponentAutoControlledProps = Component.autoControlledProps
  UIComponent.displayName = `UI(${UIComponent.wrappedComponent})`

  return hoistNonReactStatics(UIComponent, Component)
}

export default createComponent
