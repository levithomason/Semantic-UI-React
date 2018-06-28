import React, { Component } from 'react'
let toggleState = {}, toggleStyles = {}, toggleView = {}, createComponent = () = null, Provider = () = null, State = () = null


export const Toggle = createComponent({
  state: toggleState,
  styles: toggleStyles,
  view: viewProps => <div />,
  statics: { defaultProps: {} },
})

const DOM = (
  <Toggle>
    <State>
      <Provider>
        <div />
      </Provider>
    </State>
  </Toggle>
)

class Foo extends Component {
  static styles = {}
  static variables = {}
  static defaultProps = {}
  static handledProps = ['']
  static displayName = ''
  static className = ''
  static state = {}

  renderComponent() {
    return <div />
  }
}

export default Foo
