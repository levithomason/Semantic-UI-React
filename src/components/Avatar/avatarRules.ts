import { pxToRem } from '../../lib'

const getAvatarDimension = (size: number) => {
  return 12 + size * 4
}

const getPresenceSpanTop = () => {
  return -0.6
}

const getPresenceSpanLeft = (size: number) => {
  return 0.6 + size * 0.2
}

const getPresenceIconSize = (size: number) => {
  if (size <= 4) {
    return 8
  }
  if (size <= 7) {
    return 10
  }
  return 12
}

export default {
  root: () => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    background: 'inherit',
  }),
  imageAvatar: ({ props }) => ({
    width: pxToRem(getAvatarDimension(props.size)),
  }),
  avatarLabel: ({ props }) => ({
    width: pxToRem(getAvatarDimension(props.size)),
    height: pxToRem(getAvatarDimension(props.size)),
    lineHeight: pxToRem(getAvatarDimension(props.size)),
    fontSize: pxToRem(getAvatarDimension(props.size) / 2),
    verticalAlign: 'middle',
    textAlign: 'center',
  }),
  presenceSpan: ({ props }) => ({
    display: 'block',
    position: 'relative',
    background: 'inherit',
    padding: '1px',
    margin: '0px',
    borderRadius: pxToRem(9999),
    height: '1rem',
    width: '1rem',
    top: `${getPresenceSpanTop()}rem`,
    left: `${getPresenceSpanLeft(props.size)}rem`,
  }),
  presenceIconLabel: ({ props }) => ({
    position: 'relative',
    height: pxToRem(getPresenceIconSize(props.size)),
    width: pxToRem(getPresenceIconSize(props.size)),
    padding: '0px',
    lineHeight: pxToRem(getPresenceIconSize(props.size)),
    textAlign: 'center',
    verticalAlign: 'middle',
  }),
  presenceIcon: () => ({
    margin: 'auto',
    bottom: pxToRem(2),
    position: 'relative',
  }),
}
