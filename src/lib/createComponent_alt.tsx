import React from 'react'
import PropTypes from 'prop-types'

const { connect, FelaTheme } = require('react-fela')

import callable from './callable'
import { createShorthandFactory } from './factories'

interface IStylesConfig {
  /**
   * provide rules for styling component
   * essentilally is a set of functions that translate component's props to styles
   */
  rules?: any

  /**
   * define style parametrized values
   */
  variables?: any
}

type InnerComponent = ({ styles, variables }: { styles: any; variables: any }) => any

// essentially, it is all about producing styles at the end

/**
 * Introduces general styling support
 *
 * @param ComponentType - component type
 * @param config - all the necessary stuff for configuring styles at the point of initialization
 */
const registerStyles = (ComponentType: React.ComponentType, config: IStylesConfig) => {
  ComponentType.propTypes = {
    ...ComponentType.propTypes,
    variables: PropTypes.object,
  }

  const displayName = ComponentType.displayName

  const { rules, variables } = config

  const appendStylesToProps: (component: any) => React.ComponentType = rules
    ? connect(rules)
    : component => component

  return (props: any, innerComponent: InnerComponent) => {
    const tree = (
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

          const InnerComponentWithStylesInProps = appendStylesToProps(innerComponent)

          // here we are polluting component's props with additional 'variable' prop
          return <InnerComponentWithStylesInProps {...props} variables={mergedVariables} />
        }}
      />
    )

    return tree
  }
}

/**
 * Introduce shorthand 'create' method to component type
 * @param ComponentType - component type
 * @param shorthand - shorthand to introduce
 */
const applyShorthand = (ComponentType: React.ComponentType, shorthand: any) => {
  if (shorthand) {
     (ComponentType as any).create = createShorthandFactory(ComponentType, shorthand)
  }
}

/**
 * General functionality for creating component. Represents facade on top of domain-specific building blocks.
 *
 * @param ComponentType - component type
 * @param config - configuration spec
 */
const createComponent = (
  ComponentType: React.ComponentType,
  config: IStylesConfig & { shorthand?: any },
) => {
  applyShorthand(ComponentType, config.shorthand)
  return registerStyles(ComponentType, config)
}

export default createComponent
