import fontAwesomeIcons from './fontAwesomeIconRules'

const sizes = new Map([
  ['mini', 0.4],
  ['tiny', 0.5],
  ['small', 0.75],
  ['large', 1.5],
  ['large', 1.5],
  ['big', 2],
  ['huge', 4],
  ['massive', 8],
])

const rotations = new Map([['clockwise', '90deg'], ['counterclockwise', '-90deg']])
const flips = new Map([['horizontally', '-1,1'], ['vertically', '1,-1']])

export const getIcon = (kind, name) => {
  let content = ''
  let fontFamily = 'Icons'

  switch (kind) {
    case 'FontAwesome':
    default: {
      fontFamily = name.includes('outline') ? 'outline-icons' : 'Icons'
      content = `'\\${fontAwesomeIcons(name)}'`
      break
    }
  }

  return { content, fontFamily }
}

export const getBorderedStyles = circular => ({
  lineHeight: '1 !important',
  padding: '0.5em 0 !important',
  boxShadow: '0 0 0 0.1em rgba(0,0,0,.1) inset',
  width: '2em !important',
  height: '2em !important',
  ...(circular ? { borderRadius: '500em !important' } : { verticalAlign: 'baseline' }),
})

export const getSize = size => `${sizes.get(size)}em` || '1em'

export const getFlip = flip => flip && { transform: `scale(${flips.get(flip)})` }

export const getRotation = rotation =>
  rotation && { transform: `rotate(${rotations.get(rotation)})` }
