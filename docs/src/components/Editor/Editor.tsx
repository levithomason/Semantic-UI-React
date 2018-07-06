import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import AceEditor, { EditorProps } from 'react-ace'
import ace from 'brace'
import 'brace/ext/language_tools'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/tomorrow'

// import { parentComponents } from 'docs/src/utils'

const parentComponents = []

// Set up custom completers by using a ace extension
// https://github.com/thlorenz/brace/issues/19
const languageTools = ace.acequire('ace/ext/language_tools')

const semanticUIReactCompleter = {
  getCompletions(editor, session, pos, prefix, callback) {
    const completions = []

    _.each(parentComponents, component => {
      const { name } = component._meta
      // Component
      completions.push({ caption: name, value: name, meta: 'Component' })

      // Its props (propTypes do not exist in prod, use handledProps added by babel)
      _.each(component.handledProps, propName => {
        // don't add duplicate prop completions
        if (_.find(completions, { value: propName })) return

        completions.push({ caption: propName, value: propName, meta: 'Component Prop' })
      })
    })
    callback(null, completions)
  },
}

languageTools.addCompleter(semanticUIReactCompleter)

export interface IEditorProps {
  id: string
  value: string
  mode?: 'html' | 'jsx'
  onChange?: (code: string) => void
  maxLines?: number
  height?: string
  readOnly?: boolean
  shouldFocusEditor?: boolean
}

class Editor extends React.Component<IEditorProps, any> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['html', 'jsx']),
    onChange: PropTypes.func,
    maxLines: PropTypes.number,
    height: PropTypes.string,
    readOnly: PropTypes.bool,
    shouldFocusEditor: PropTypes.bool,
  }

  public static defaultProps = {
    mode: 'jsx',
    height: '100px',
    maxLines: Infinity,
    readOnly: false,
    shouldFocusEditor: false,
  }

  public componentWillReceiveProps(nextProps: IEditorProps) {
    const { shouldFocusEditor } = nextProps
    if (shouldFocusEditor && !this.props.shouldFocusEditor && this.editor) {
      // focus editor when shouldFocusEditor is set
      this.editor.focus()
    }
  }

  public render() {
    const { id, mode, value, height, maxLines, readOnly, ...rest } = this.props

    return (
      <AceEditor
        name={id}
        mode={mode}
        readOnly={readOnly}
        theme="tomorrow"
        width="100%"
        height={height}
        value={value}
        enableBasicAutocompletion
        enableLiveAutocompletion
        editorProps={{ $blockScrolling: Infinity }}
        highlightActiveLine={false}
        maxLines={maxLines}
        showPrintMargin={false}
        tabSize={2}
        ref="aceEditor"
        {...rest}
      />
    )
  }

  private get editor() {
    return (this.refs.aceEditor as any).editor
  }
}

export default Editor
