import PropTypes from 'prop-types'
import { Component } from 'react'
import { THEME_CHANNEL } from 'fela-bindings/lib/themeChannel'

import getClasses from './getClasses'

class BaseComponent extends Component<any, any> {
  static contextTypes = {
    [THEME_CHANNEL]: PropTypes.object,
  }

  getClasses = (props, rules, variables) => {
    const { [THEME_CHANNEL]: theme } = this.context

    return getClasses(props, rules, variables, (theme && theme.get()) || {})
  }
}

export default BaseComponent
