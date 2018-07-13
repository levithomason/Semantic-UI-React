import fontAwesomeIcons from './fontAwesomeIconRules'

const sizes = new Map([
  ['mini', 0.4],
  ['tiny', 0.5],
  ['small', 0.75],
  ['large', 1.5],
  ['big', 2],
  ['huge', 4],
  ['massive', 8],
])

const getIcon = (kind, name) => {
  let content = ''
  let fontFamily = 'Icons'

  switch (kind) {
    case 'FontAwesome':
    default: {
      fontFamily = name && name.includes('outline') ? 'outline-icons' : 'Icons'
      content = (name && `'\\${fontAwesomeIcons(name)}'`) || '?'
      break
    }
  }

  return { content, fontFamily }
}

const getSize = size => `${sizes.get(size)}em` || '1em'

const getBorderedStyles = circular => ({
  lineHeight: '1',
  padding: '0.5em 0',
  boxShadow: '0 0 0 0.1em rgba(0,0,0,.1) inset',
  width: '2em',
  height: '2em',
  ...(circular ? { borderRadius: '500em' } : { verticalAlign: 'baseline' }),
})

const iconRules = {
  root: ({ props: { color, kind, name, size, bordered, circular } }) => {
    const { fontFamily, content } = getIcon(kind, name)
    return {
      fontFamily,
      color,
      display: 'inline-block',
      opacity: 1,
      margin: '0 0.25em 0 0',
      width: '1.18em',
      height: '1em',
      fontSize: getSize(size),
      fontStyle: 'normal',
      fontWeight: 400,
      textDecoration: 'inherit',
      textAlign: 'center',
      speak: 'none',
      fontSmoothing: 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      backfaceVisibility: 'hidden',
      verticalAlign: 'middle',
      lineHeight: 1,

      '::before': {
        content,
        boxSizing: 'inherit',
        background: '0 0!important',
      },

      ...((bordered || circular) && getBorderedStyles(circular)),
    }
  },
}

export default iconRules
