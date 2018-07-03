import React from 'react'
import renderComponent, { IRenderResultConfig } from './renderComponent'

class UIComponent<P, S> extends React.Component<P, S> {
  private readonly childClass = this.constructor as typeof UIComponent
  static defaultProps: { [key: string]: any }
  static displayName: string
  static className: string
  static variables?: any
  static rules?: any
  static handledProps: any

  childInstanceRender: (config: IRenderResultConfig) => React.ReactNode

  constructor(props, context) {
    super(props, context)

    // Capture the child instance's render() method
    // replace it with ours and call the
    this.childInstanceRender = this.render
    this.render = this.childRenderReplacement
  }

  private childRenderReplacement(): React.ReactNode {
    return renderComponent(
      {
        className: this.childClass.className,
        defaultProps: this.childClass.defaultProps,
        displayName: this.childClass.displayName,
        handledProps: this.childClass.handledProps,
        props: this.props,
        rules: this.childClass.rules,
        variables: this.childClass.variables,
      },
      this.childInstanceRender,
    )
  }
}

export default UIComponent as any
