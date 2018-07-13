import PropTypes from 'prop-types'
import React, { CSSProperties } from 'react'
import { Icon, SemanticICONS } from 'semantic-ui-react'

export interface IEditorPreviewProps {
  size: number
  label: string
  icon?: SemanticICONS
}

const commonStyle: CSSProperties = {
  position: 'absolute',
  cursor: 'pointer',
  left: 0,
  right: 0,
}

const previewStyle: CSSProperties = {
  ...commonStyle,
  zIndex: 10,
  opacity: 0.25,
  bottom: 0,
  background: 'linear-gradient(#fff, #fff, #666)',
  width: '100%',
}

const labelStyle: CSSProperties = {
  ...commonStyle,
  zIndex: 11,
  opacity: 0.8,
  bottom: '5px',
  textAlign: 'center',
  fontWeight: 500,
}

class EditorPreview extends React.Component<IEditorPreviewProps> {
  private static readonly lineHeight = 16

  public static propTypes = {
    size: PropTypes.number,
    label: PropTypes.string,
  }

  public static defaultProps: IEditorPreviewProps = {
    size: undefined,
    label: 'Show more',
  }

  constructor(props: IEditorPreviewProps) {
    super(props)
  }

  public render() {
    const { label, size, icon } = this.props

    return (
      <div>
        <div style={{ ...previewStyle, height: `${size * EditorPreview.lineHeight}px` }} />
        <div style={labelStyle}>
          {icon && <Icon name={icon} />}
          {label}
        </div>
      </div>
    )
  }
}

export default EditorPreview
