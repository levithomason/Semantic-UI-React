import { getBorderedStyles, getFlip, getIcon, getRotation, getSize } from './iconCommonRules'

export default ({
  bordered,
  circular,
  color,
  disabled,
  flipped,
  link,
  kind,
  loading,
  name,
  rotated,
  size,
}) => {
  const { fontFamily, content } = getIcon(kind, name)

  const computed = {
    root: {
      display: 'inline-block',
      opacity: 1,
      margin: '0 0.25em 0 0',
      width: '1.18em',
      height: '1em',
      fontFamily,
      fontSize: getSize(size),
      fontStyle: 'normal',
      fontWeight: 400,
      textDecoration: 'inherit',
      textAlign: 'center',
      speak: 'none',
      color,
      fontSmoothing: 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      backfaceVisibility: 'hidden',
      verticalAlign: 'middle',
      lineHeight: 1,

      '::before': {
        boxSizing: 'inherit',
        background: '0 0!important',
        content,
      },

      ...(disabled && { opacity: '.45!important' }),

      ...(loading && {
        lineHeight: 1,
        height: '1em',
        animation: 'icon-loading 2s linear infinite',
      }),

      ...(link && {
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'opacity .1s ease',
      }),

      ...getFlip(flipped),

      ...getRotation(rotated),

      ...((bordered || circular) && getBorderedStyles(circular)),
    },
  }

  return computed
}
