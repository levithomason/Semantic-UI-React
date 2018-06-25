import cx from 'classnames'
import React, { Component } from 'react'

import getClasses from './getClasses'
import getComponentClassName from './getComponentClassName'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'

import Provider from '../components/Provider/Provider'

export interface IRenderConfig {
  ElementType: React.ComponentType<any>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
}

export interface IRenderProps {
  displayName: string
  component: React.ComponentType
  props: { [key: string]: any }
  state?: { [key: string]: any }
  rules?: { [key: string]: Function }
  variables?: (siteVariables: object) => object
  render: (config: IRenderConfig) => any
}

class Render extends Component<IRenderProps> {
  render() {
    const { component, displayName, props, render, rules, variables } = this.props

    return (
      <Provider.Consumer
        render={theme => {
          const ElementType = getElementType(component, props)
          const rest = getUnhandledProps(component, props)
          const classes = getClasses(props, rules, variables, theme)

          classes.root = cx(getComponentClassName(displayName), classes.root, props.className)

          const config: IRenderConfig = {
            ElementType,
            rest,
            classes,
          }

          return render(config)
        }}
      />
    )
  }
}

export default Render
