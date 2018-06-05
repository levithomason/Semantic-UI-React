import _ from 'lodash'
import { htmlFontSize } from 'src/themes/teams/siteVariables'

// TODO - This doesn't support theme switching, other themes, and doesn't support user changes to html base font size.

/**
 * Converts the provided rem size to a rem value based on the htmlFontSize provided in the theme's siteVariables.
 * When providing a value to the rem function assume the base font-size is 10px.  Therefore 10px equals 1rem.
 * @param {number} value The rem value to convert to rems based on the HTML font size.
 * @returns {string} The value converted to the rem value based on the htmlFontSize.
 */
const rem = (value) => {
  const default1RemSizeInPx = 10

  if (!_.isNumber(value)) {
    throw new Error(`Expected number got: '${typeof value}'.`)
  }

  let fontSizeMultiplier

  if (_.isString(htmlFontSize)) {
    const pxIndex = htmlFontSize.indexOf('px')

    if (pxIndex > 0) {
      const htmlFontSizeWithoutPx = htmlFontSize.substring(0, pxIndex)
      fontSizeMultiplier = default1RemSizeInPx / htmlFontSizeWithoutPx
    } else {
      throw new Error(
        `Expected siteVariables htmlFontSize to be in px, but got: '${htmlFontSize}'.`,
      )
    }
  }

  const convertedValueInRems = fontSizeMultiplier * value

  if (!_.isNumber(convertedValueInRems)) {
    throw new Error(`Unable to convert value: '${value}' to rems, got: '${convertedValueInRems}'.`)
  }

  if (convertedValueInRems === 0) {
    return '0'
  }

  const remValue = `${parseFloat(convertedValueInRems.toFixed(3))}rem`

  return convertedValueInRems >= 1 ? remValue : remValue.substring(1, remValue.length)
}

export default rem
