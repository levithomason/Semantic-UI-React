import cx from 'classnames'
import React from 'react'
import { FelaTheme } from 'react-fela'

import getClasses from './getClasses'
import getComponentClassName from './getComponentClassName'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'

import Provider from '../components/Provider/Provider'

export interface IRenderResultConfig {
  ElementType: React.ComponentType<any>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
}

export type RenderFunctionType = (config: IRenderResultConfig) => any

export interface IRenderConfig {
  displayName: string
  component: any
  props: { [key: string]: any }
  state?: { [key: string]: any }
  rules?: { [key: string]: Function }
  variables?: (siteVariables: object) => object
}

const renderComponent = (config: IRenderConfig, render: RenderFunctionType) => {
  const { component, displayName, props, rules, variables } = config

  return (
    <FelaTheme
      render={theme => {
        const ElementType = getElementType(component, props)
        const rest = getUnhandledProps(component, props)
        const classes = getClasses(props, rules, variables, theme)

        classes.root = cx(getComponentClassName(displayName), classes.root, props.className)

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
