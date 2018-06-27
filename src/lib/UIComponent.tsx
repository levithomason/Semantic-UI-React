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

export interface IRules {
  root: object
  [key: string]: object
}

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly _childRender: any
  static variables?: any
  static rules?: IRules
  static handledProps: any

  constructor(props, context) {
    super(props, context)

    // save the child's render function, then call it from our own render function
    this._childRender = this.render
    this.render = UIComponent.prototype.render
  }

  render() {
    const component: any = this.constructor
    const props = this.props as any
    const rules = component.rules
    const variables = component.variables

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

          return this._childRender(config)
        }}
      />
    )
  }
}

export default UIComponent as any
