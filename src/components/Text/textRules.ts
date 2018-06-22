import {
  atMentionTextColor,
  disabledTextColor,
  errorTextColor,
  successTextColor,
  timestampTextColor,
} from '../../themes/teams/siteVariables'

const textTypesRules = {
  textTypes: { fontSize: '24pt', lineHeight: '32pt' },
  title2: { fontSize: '18pt', lineHeight: '24pt' },
  base: { fontSize: '14pt', lineHeight: '20pt' },
  caption: { fontSize: '12pt', lineHeight: '16pt' },
  'x-small': { fontSize: '10pt', lineHeight: '12pt' },
}

export default ({ atMention, disabled, error, success, timestamp, type }) => ({
  root: {
    ...(atMention && { color: atMentionTextColor }),
    ...(disabled && { color: disabledTextColor }),
    ...(error && { color: errorTextColor }),
    ...(success && { color: successTextColor }),
    ...(timestamp && { color: timestampTextColor }),
    ...(type && textTypesRules[type]),
  },
})
