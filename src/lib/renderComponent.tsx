import cx from 'classnames'
import React from 'react'
import { FelaTheme } from 'react-fela'

import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import callable from './callable'

export interface IRenderResultConfig {
  ElementType: React.ComponentType<any>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
}

export type RenderFunctionType = (config: IRenderResultConfig) => any

export interface IRenderConfig {
  component: any
  props: { [key: string]: any }
  state?: { [key: string]: any }
  rules?: { [key: string]: Function }
  variables?: (siteVariables: object) => object
}

const renderComponent = (config: IRenderConfig, render: RenderFunctionType) => {
  const { component, props, rules, variables } = config

  return (
    <FelaTheme
      render={theme => {
        const ElementType = getElementType(component, props)
        const rest = getUnhandledProps(component, props)
        const { siteVariables = {}, componentVariables = {} } = theme
        const variablesFromFile = callable(variables)(siteVariables)
        const variablesFromTheme = callable(componentVariables[component.displayName])(
          siteVariables,
        )
        const variablesFromProp = callable(props.variables)(siteVariables)

        const mergedVariables = () =>
          Object.assign({}, variablesFromFile, variablesFromTheme, variablesFromProp)

        const classes = getClasses(props, rules, mergedVariables, theme)

        classes.root = cx(component.className, classes.root, props.className)

        const config: IRenderResultConfig = {
          ElementType,
          rest,
          classes,
        }

        return render(config)
      }}
    />
  )
}

export default renderComponent
