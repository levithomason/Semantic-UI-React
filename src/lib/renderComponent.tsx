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
  displayName: string
  component: any
  stardustClassName: string
  props: { [key: string]: any }
  state?: { [key: string]: any }
  rules?: { [key: string]: Function }
  variables?: (siteVariables: object) => object
  isChild?: boolean
  parentName?: string
  parentDisplayName?: string
  subcomponentName?: string
}

const renderComponent = (config: IRenderConfig, render: RenderFunctionType) => {
  const { component, displayName, props, rules, variables, stardustClassName } = config

  return (
    <FelaTheme
      render={theme => {
        const ElementType = getElementType(component, props)
        const rest = getUnhandledProps(component, props)
        const { siteVariables = {}, componentVariables = {} } = theme
        const variablesFromFile = callable(variables)(siteVariables)
        const variablesFromTheme = callable(componentVariables[displayName])(siteVariables)
        const variablesFromProp = callable(props.variables)(siteVariables)

        const mergedVariables = () =>
          Object.assign({}, variablesFromFile, variablesFromTheme, variablesFromProp)

        const classes = getClasses(props, rules, mergedVariables, theme)

        // TODO replace the stardustClassName with getComponentClassName after it is fixed
        classes.root = cx(stardustClassName, classes.root, props.className)

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
