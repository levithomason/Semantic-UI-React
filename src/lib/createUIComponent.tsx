import cx from 'classnames'
import React from 'react'
import { FelaTheme } from 'react-fela'

import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import callable from './callable'

export interface ICreateUIComponentConfig {
  state?: any
  styles?: any
  view: any
  statics?: any
}

const createUIComponent = (config: ICreateUIComponentConfig) => {

}

export const Toggle = createUIComponent({
  state: toggleState,
  styles: toggleStyles,
  view: viewProps => <div />,
  statics: { defaultProps: {} },
})

export interface IRenderResultConfig {
  ElementType: React.ComponentType<any>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
}

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any

  props: any

  renderComponent(config: IRenderResultConfig): React.ReactNode {
    throw new Error(`renderComponent is not implemented in \`${this.childClass.displayName}\`.`)
  }

  render() {
    const { handledProps, displayName, rules } = this.childClass

    return (
      <FelaTheme
        render={theme => {
          const { siteVariables = {}, componentVariables = {} } = theme

          const ElementType = getElementType(this.childClass, this.props)
          const rest = getUnhandledProps(this.childClass, this.props)
          const variablesFromFile = callable(this.childClass.variables)(siteVariables)
          const variablesFromTheme = callable(componentVariables[displayName])(siteVariables)
          const variablesFromProp = callable(this.props.variables)(siteVariables)

          const mergedVariables = () =>
            Object.assign({}, variablesFromFile, variablesFromTheme, variablesFromProp)

          const classes = getClasses(this.props, rules, mergedVariables, theme)
          classes.root = cx(this.childClass.className, classes.root, this.props.className)

          const config: IRenderResultConfig = { ElementType, rest, classes }

          return this.renderComponent(config)
        }}
      />
    )
  }
}

export default UIComponent as any
