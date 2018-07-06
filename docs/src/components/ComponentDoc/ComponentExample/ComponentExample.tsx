import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { PureComponent, isValidElement, CSSProperties } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { html } from 'js-beautify'
import copyToClipboard from 'copy-to-clipboard'
import {
  Divider,
  Form,
  Grid,
  Menu,
  Segment,
  Visibility,
  Button,
  ButtonGroup,
  SemanticCOLORS,
} from 'semantic-ui-react'
import { pxToRem } from 'src/lib'
import evalTypeScript from 'docs/src/utils/evalTypeScript'
import { Provider } from 'stardust'

import {
  exampleContext,
  examplePathToHash,
  getFormattedHash,
  knobsContext,
  repoURL,
  scrollToAnchor,
  variablesContext,
} from 'docs/src/utils'
import Editor from 'docs/src/components/Editor/Editor'
import ComponentControls from '../ComponentControls'
import ComponentExampleTitle from './ComponentExampleTitle'
import ContributionPrompt from '../ContributionPrompt'
import getSourceCodeManager, { ISourceCodeManager, SourceCodeType } from './SourceCodeManager'

export interface IComponentExampleProps extends RouteComponentProps<any, any> {
  title: string
  description: string
  examplePath: string
  suiVersion?: string
}

interface IComponentExampleState {
  knobs: Object
  componentVariables: { [key: string]: Object }
  exampleElement: JSX.Element
  handleMouseLeave: () => void
  handleMouseMove: () => void
  sourceCode: { [key in SourceCodeType]: string }
  visibleSourceCode: { [key in SourceCodeType]: boolean }
  markup: string
  error: string
  showCode: boolean
  showHTML: boolean
  showRtl: boolean
  showVariables: boolean
  isHovering: boolean
  copiedCode: boolean
}

const childrenStyle = {
  paddingTop: 0,
  maxWidth: pxToRem(500),
}

const errorStyle = {
  padding: '1em',
  fontSize: pxToRem(9),
  color: '#a33',
  background: '#fff2f2',
}

const controlsWrapperStyle = {
  minHeight: pxToRem(30),
}

/**
 * Renders a `component` and the raw `code` that produced it.
 * Allows toggling the the raw `code` code block.
 */
class ComponentExample extends PureComponent<IComponentExampleProps, IComponentExampleState> {
  public state = { knobs: {} } as IComponentExampleState

  private sourceCodeMgr: ISourceCodeManager
  private anchorName: string
  private kebabExamplePath: string
  private KnobsComponent: any

  private codeChangeHandlers: { [key in SourceCodeType]: (code: string) => void } = {
    normal: (code: string) => this.handleCodeChange(SourceCodeType.normal, code),
    shorthand: (code: string) => this.handleCodeChange(SourceCodeType.shorthand, code),
  }

  private ghEditHref: { [key in SourceCodeType]: string } = {
    normal: '',
    shorthand: '',
  }

  private codeTypeApiButtonLabels: { [key in SourceCodeType]: string } = {
    normal: 'Children API',
    shorthand: 'Shorhand API',
  }

  static contextTypes = {
    onPassed: PropTypes.func,
  }

  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.node,
    examplePath: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    suiVersion: PropTypes.string,
    title: PropTypes.node,
  }

  public componentWillMount() {
    const { examplePath } = this.props
    this.sourceCodeMgr = getSourceCodeManager(examplePath)
    this.anchorName = examplePathToHash(examplePath)
    const exampleElement = this.renderOriginalExample(examplePath)

    this.setState({
      exampleElement,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: this.handleMouseMove,
      showCode: this.isActiveHash(),
      sourceCode: {
        shorthand: this.sourceCodeMgr.getCodeForType(SourceCodeType.shorthand),
        normal: this.sourceCodeMgr.getCodeForType(SourceCodeType.normal),
      },
      visibleSourceCode: {
        shorthand: true,
        normal: false,
      },
      markup: renderToStaticMarkup(exampleElement),
    })
  }

  public componentWillReceiveProps(nextProps: IComponentExampleProps) {
    // deactivate examples when switching from one to the next
    if (
      this.isActiveHash() &&
      this.isActiveState() &&
      this.props.location.hash !== nextProps.location.hash
    ) {
      this.clearActiveState()
    }
  }

  private clearActiveState = () => {
    this.setState({
      showCode: false,
      showHTML: false,
      showRtl: false,
      showVariables: false,
    })
  }

  private isActiveState = () => {
    const { showCode, showHTML, showRtl, showVariables } = this.state

    return showCode || showHTML || showRtl || showVariables
  }

  private isActiveHash = () => this.anchorName === getFormattedHash(this.props.location.hash)

  private updateHash = () => {
    if (this.isActiveState()) this.setHashAndScroll()
    else if (this.isActiveHash()) this.removeHash()
  }

  private setHashAndScroll = () => {
    const { history, location } = this.props

    history.replace(`${location.pathname}#${this.anchorName}`)
    scrollToAnchor()
  }

  private removeHash = () => {
    const { history, location } = this.props

    history.replace(location.pathname)

    this.clearActiveState()
  }

  private handleDirectLinkClick = () => {
    this.setHashAndScroll()
    copyToClipboard(window.location.href)
  }

  private handleMouseLeave = () => {
    this.setState({
      isHovering: false,
      handleMouseLeave: null,
      handleMouseMove: this.handleMouseMove,
    })
  }

  private handleMouseMove = () => {
    this.setState({
      isHovering: true,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: null,
    })
  }

  private handleShowCodeClick = e => {
    e.preventDefault()

    const { showCode } = this.state

    this.setState({ showCode: !showCode }, this.updateHash)
  }

  private handleShowHTMLClick = e => {
    e.preventDefault()

    const { showHTML } = this.state

    this.setState({ showHTML: !showHTML }, this.updateHash)
  }

  private handleShowRtlClick = e => {
    e.preventDefault()

    const { showRtl } = this.state

    this.setState({ showRtl: !showRtl }, () => {
      this.renderSourceCode()
    })
  }

  private handleShowVariablesClick = e => {
    e.preventDefault()

    const { showVariables } = this.state

    this.setState({ showVariables: !showVariables }, this.updateHash)
  }

  private handlePass = () => {
    const { title } = this.props

    if (title) _.invoke(this.context, 'onPassed', null, this.props)
  }

  private onApiCodeTypeClick = (codeType: SourceCodeType) => {
    const visibleSourceCode = { ...this.state.visibleSourceCode }
    const newStateValue = !visibleSourceCode[codeType]

    visibleSourceCode[codeType] = newStateValue

    if (!newStateValue) {
      const remainingVisibleSourceCode = [SourceCodeType.normal, SourceCodeType.shorthand].filter(
        type => type !== codeType,
      )

      if (!remainingVisibleSourceCode.find(type => !!visibleSourceCode[type])) {
        visibleSourceCode[remainingVisibleSourceCode[0]] = true
      }
    }

    this.setState({ visibleSourceCode })
    this.updateAndRenderSourceCode(codeType)
  }

  private copyJSX = (codeType: SourceCodeType) => {
    copyToClipboard(this.state.sourceCode[codeType])
    this.setState({ copiedCode: true })
    setTimeout(() => this.setState({ copiedCode: false }), 1000)
  }

  private resetJSX = (codeType: SourceCodeType) => {
    if (this.sourceCodeMgr.originalCodeHasChanged && confirm('Lose your changes?')) {
      this.sourceCodeMgr.resetToOriginalCode(codeType)
      this.updateAndRenderSourceCode(codeType)
    }
  }

  private getKnobsFilename = () => `./${this.props.examplePath}.knobs.tsx`

  private getKebabExamplePath = (codeType: SourceCodeType = SourceCodeType.normal) => {
    if (!this.kebabExamplePath) {
      this.kebabExamplePath = _.kebabCase(this.sourceCodeMgr.getPathForType(codeType))
    }

    return this.kebabExamplePath
  }

  private hasKnobs = () => _.includes(knobsContext.keys(), this.getKnobsFilename())

  private renderError = _.debounce(error => {
    this.setState({ error })
  }, 800)

  private renderOriginalExample = (examplePath: string) => {
    const ExampleComponent = exampleContext(`./${examplePath}.tsx`).default
    return this.renderWithProvider(ExampleComponent)
  }

  private renderMissingExample = (): JSX.Element => (
    <ContributionPrompt>
      Looks like we're missing{' '}
      <code>{`./docs/src/examples/${this.sourceCodeMgr.getCodeForType(
        SourceCodeType.shorthand,
      )}.tsx`}</code>{' '}
      example.
    </ContributionPrompt>
  )

  private renderSourceCode = _.debounce(() => {
    try {
      const { visibleSourceCode, sourceCode } = this.state

      const visibleCodeType = [SourceCodeType.shorthand, SourceCodeType.normal].find(
        codeType => visibleSourceCode[codeType],
      )
      const visibleCode = sourceCode[visibleCodeType] || ''

      const Example = visibleCode ? evalTypeScript(visibleCode) : this.renderMissingExample()
      const exampleElement = _.isFunction(Example) ? this.renderWithProvider(Example) : Example

      if (!isValidElement(exampleElement)) {
        this.renderError(
          `Default export is not a valid element. Type:${{}.toString.call(exampleElement)}`,
        )
      } else {
        // immediately render a null error
        // but also ensure the last debounced error call is a null error
        const error = null
        this.renderError(error)
        this.setState({
          error,
          exampleElement,
          markup: renderToStaticMarkup(exampleElement),
        })
      }
    } catch (err) {
      this.renderError(err.message)
    }
  }, 250)

  private handleKnobChange = knobs => {
    this.setState(
      prevState => ({
        knobs: {
          ...prevState.knobs,
          ...knobs,
        },
      }),
      this.renderSourceCode,
    )
  }

  private getKnobsComponent = () => {
    if (typeof this.KnobsComponent !== 'undefined') {
      return this.KnobsComponent
    }

    this.KnobsComponent = this.hasKnobs() ? knobsContext(this.getKnobsFilename()).default : null

    return this.KnobsComponent
  }

  private getKnobsValue = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? { ...Knobs.defaultProps, ...this.state.knobs } : null
  }

  private renderKnobs = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? <Knobs {...this.getKnobsValue()} onKnobChange={this.handleKnobChange} /> : null
  }

  private getComponentName = () => this.props.examplePath.split('/')[1]

  private renderWithProvider(ExampleComponent) {
    return (
      <Provider componentVariables={this.state.componentVariables} rtl={this.state.showRtl}>
        <ExampleComponent knobs={this.getKnobsValue()} />
      </Provider>
    )
  }

  private handleCodeChange(codeType: SourceCodeType, sourceCode: string) {
    this.sourceCodeMgr.setCodeForType(codeType, sourceCode)
    this.updateAndRenderSourceCode(codeType)
  }

  private updateAndRenderSourceCode = (codeType: SourceCodeType) => {
    const { sourceCode } = this.state
    this.setState(
      {
        sourceCode: {
          ...sourceCode,
          [codeType]: this.sourceCodeMgr.getCodeForType(codeType),
        },
      },
      this.renderSourceCode,
    )
  }

  private getTextColor = (): SemanticCOLORS => (this.state.error ? 'red' : 'black')

  private setGitHubHrefs = () => {
     [SourceCodeType.normal, SourceCodeType.shorthand].forEach(codeType => {
      if (this.ghEditHref[codeType]) {
        return
      }
      // get component name from file path:
      // elements/Button/Types/ButtonButtonExample
      const currentCodePath = this.sourceCodeMgr.getPathForType(codeType)
      const pathParts = currentCodePath.split(__PATH_SEP__)
      const filename = pathParts[pathParts.length - 1]

      this.ghEditHref[codeType] = [
        `${repoURL}/edit/master/docs/src/examples/${currentCodePath}.tsx`,
        `?message=docs(${filename}): your description`,
      ].join('')
    })
  }

  private renderApiCodeMenu = (): JSX.Element => {
    const color = this.getTextColor()
    const menuItems = [SourceCodeType.shorthand, SourceCodeType.normal].map(codeType => {
      const active = !!this.state.error || this.state.visibleSourceCode[codeType]
      return {
        active,
        key: codeType,
        icon: 'code',
        color: active ? 'green' : color,
        onClick: this.onApiCodeTypeClick.bind(this, codeType),
        content: this.codeTypeApiButtonLabels[codeType],
      }
    })

    return (
      <Divider horizontal fitted>
        <Menu size="small" items={menuItems} />
      </Divider>
    )
  }

  private renderCodeEditorMenu = (codeType: SourceCodeType): JSX.Element => {
    const { copiedCode, error } = this.state
    const color = this.getTextColor()
    const codeHasChanged = this.sourceCodeMgr.originalCodeHasChanged(codeType)

    return (
      <Menu size="small" text widths="4" style={{ margin: '0' }}>
        <Menu.Item
          active={copiedCode || !!error} // to show the color
          color={copiedCode ? 'green' : color}
          onClick={this.copyJSX.bind(codeType)}
          icon={!copiedCode && 'copy'}
          content={copiedCode ? 'Copied!' : 'Copy'}
        />
        <Menu.Item
          active={codeHasChanged}
          fitted
          icon="refresh"
          content="Reset"
          onClick={this.resetJSX.bind(codeType)}
          color={codeHasChanged ? 'red' : color}
        />
        <Menu.Item
          active={!!error} // to show the color
          fitted
          icon="github"
          content="Edit"
          href={this.ghEditHref[codeType]}
          target="_blank"
          color={color}
        />
      </Menu>
    )
  }

  private renderEditor = (codeType: SourceCodeType): JSX.Element => {
    const editorStyle: CSSProperties = {
      background: '#fbfbfb',
      boxShadow: '0 .1rem .2rem 0 #ddd',
    }

    return (
      <div>
        {this.renderCodeEditorMenu(codeType)}
        <Editor
          style={editorStyle}
          id={`${this.getKebabExamplePath()}-jsx`}
          value={this.state.sourceCode[codeType]}
          onChange={this.codeChangeHandlers[codeType]}
        />
      </div>
    )
  }

  private renderJSX = () => {
    const { error, showCode, visibleSourceCode } = this.state
    if (!showCode) return

    const jsxStyle: CSSProperties = {
      width: '100%',
      ...(error && {
        boxShadow: `inset 0 0 0 1em ${errorStyle.background}`,
      }),
    }

    this.setGitHubHrefs()

    const gridColumns = [SourceCodeType.shorthand, SourceCodeType.normal].map(
      (codeType, index) =>
        visibleSourceCode[codeType] ? (
          <Grid.Column key={index}>{this.renderEditor(codeType)}</Grid.Column>
        ) : null,
    )

    return (
      <div style={jsxStyle}>
        {this.renderApiCodeMenu()}
        {gridColumns}
        {error && <pre style={errorStyle}>{error}</pre>}
      </div>
    )
  }

  private renderHTML = () => {
    const { showHTML, markup } = this.state
    if (!showHTML) return

    // add new lines between almost all adjacent elements
    // moves inline elements to their own line
    const preFormattedHTML = markup.replace(/><(?!\/i|\/label|\/span|option)/g, '>\n<')

    const beautifiedHTML = html(preFormattedHTML, {
      indent_size: 2,
      indent_char: ' ',
      wrap_attributes: 'auto',
      wrap_attributes_indent_size: 2,
      end_with_newline: false,
    })

    return (
      <div>
        <Divider horizontal>Rendered HTML</Divider>
        <Editor
          id={`${this.getKebabExamplePath()}-html`}
          mode="html"
          value={beautifiedHTML}
          readOnly
        />
      </div>
    )
  }

  private renderVariables = () => {
    const { showVariables } = this.state
    if (!showVariables) return

    const name = this.getComponentName()

    return (
      <div>
        <Divider horizontal>{_.startCase(name).replace(/ /g, '')} Variables</Divider>
        <Provider.Consumer>
          {({ siteVariables }) => {
            const variablesFilename = `./${name}/${_.camelCase(name)}Variables.ts`
            const hasVariablesFile = _.includes(variablesContext.keys(), variablesFilename)

            if (!hasVariablesFile) {
              return (
                <Segment size="small" secondary basic>
                  This component has no variables to edit.
                </Segment>
              )
            }

            const variables = variablesContext(variablesFilename).default
            const defaultVariables = variables(siteVariables)

            return (
              <div>
                <Form>
                  <Form.Group inline>
                    {_.map(defaultVariables, (val, key) => (
                      <Form.Input
                        key={key}
                        label={key}
                        defaultValue={val}
                        onChange={this.handleVariableChange(name, key)}
                      />
                    ))}
                  </Form.Group>
                </Form>
              </div>
            )
          }}
        </Provider.Consumer>
      </div>
    )
  }

  private handleVariableChange = (component, variable) => (e, { value }) => {
    this.setState(
      state => ({
        componentVariables: {
          ...state.componentVariables,
          [component]: {
            ...(state.componentVariables && state.componentVariables[component]),
            [variable]: value,
          },
        },
      }),
      this.renderSourceCode,
    )
  }

  public render() {
    const { children, description, examplePath, suiVersion, title } = this.props
    const {
      handleMouseLeave,
      handleMouseMove,
      exampleElement,
      isHovering,
      showCode,
      showHTML,
      showRtl,
      showVariables,
    } = this.state

    const isActive = this.isActiveHash() || this.isActiveState()

    const exampleStyle: CSSProperties = {
      position: 'relative',
      transition: 'box-shadow 200ms, background 200ms',
      background: '#fff',
      ...(isActive
        ? {
            boxShadow: '0 0 30px #ccc',
          }
        : isHovering && {
            boxShadow: '0 0 20px #ccc',
            zIndex: 1,
          }),
    }

    const knobs = this.renderKnobs()

    return (
      <Visibility once={false} onTopPassed={this.handlePass} onTopPassedReverse={this.handlePass}>
        <Grid
          className="docs-example"
          padded="vertically"
          id={this.anchorName}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={exampleStyle}
        >
          <Grid.Row>
            <Grid.Column width={12}>
              <ComponentExampleTitle
                description={description}
                title={title}
                suiVersion={suiVersion}
              />
            </Grid.Column>
            <Grid.Column textAlign="right" width={4} style={controlsWrapperStyle}>
              <ComponentControls
                anchorName={this.anchorName}
                examplePath={examplePath}
                onCopyLink={this.handleDirectLinkClick}
                onShowCode={this.handleShowCodeClick}
                onShowHTML={this.handleShowHTMLClick}
                onShowRtl={this.handleShowRtlClick}
                onShowVariables={this.handleShowVariablesClick}
                showCode={showCode}
                showHTML={showHTML}
                showRtl={showRtl}
                showVariables={showVariables}
                visible={isActive || isHovering}
              />
            </Grid.Column>
          </Grid.Row>

          {children && (
            <Grid.Row columns={1}>
              <Grid.Column style={childrenStyle}>{children}</Grid.Column>
            </Grid.Row>
          )}

          {knobs && (
            <Grid.Row columns={1}>
              <Grid.Column>{knobs}</Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row columns={1}>
            <Grid.Column className={`rendered-example ${this.getKebabExamplePath()}`}>
              <div dir={this.state.showRtl ? 'rtl' : undefined}>{exampleElement}</div>
            </Grid.Column>
            <Grid.Column>
              {this.renderJSX()}
              {this.renderHTML()}
              {this.renderVariables()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider horizontal />
      </Visibility>
    )
  }
}

export default withRouter(ComponentExample)
