import renderer from './felaRenderer'
import { connect } from './variablesTracking'

export interface IClasses {
  [key: string]: string
}

/**
 * @param displayName
 * @param rules
 * @param props
 * @param variables
 * @param theme
 * @returns {{}}
 */
const getClasses = (displayName: string, props, rules, getVariables: any = () => {}, theme: any = {}): IClasses => {
  const { renderRule } = renderer
  const variables = getVariables(theme.siteVariables)

  const ruleProps = {
    props,
    theme,
    variables: variables,
    trackVariables: connect(theme.spies || {}, displayName, variables)
  }

  return Object.keys(rules).reduce((acc, ruleName) => {
    acc[ruleName] = renderRule(rules[ruleName], ruleProps)

    return acc
  }, {})
}

export default getClasses
