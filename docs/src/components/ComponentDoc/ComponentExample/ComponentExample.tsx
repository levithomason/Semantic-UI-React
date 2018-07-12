import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { PureComponent, isValidElement, CSSProperties } from 'react'
import { withRouter } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { html } from 'js-beautify'
import copyToClipboard from 'copy-to-clipboard'
import { Divider, Form, Grid, Menu, Segment, Visibility } from 'semantic-ui-react'
import { pxToRem, doesNodeContainClick } from 'src/lib'
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
import Editor, { IEditorProps } from 'docs/src/components/Editor/Editor'
import ComponentControls from '../ComponentControls'
import ComponentExampleTitle from './ComponentExampleTitle'

const childrenStyle: CSSProperties = {
  paddingTop: 0,
  maxWidth: pxToRem(500),
}

const errorStyle: CSSProperties = {
  padding: '1em',
  fontSize: pxToRem(9),
  color: '#a33',
  background: '#fff2f2',
}

/**
 * Renders a `component` and the raw `code` that produced it.
 * Allows toggling the the raw `code` code block.
 */
class ComponentExample extends PureComponent<any, any> {
  // private static readonly refName = 'componentExample'
  private componentRef: React.Component

  state: any = { knobs: {} }
  anchorName: any
  sourceCode: any
  kebabExamplePath: any
  KnobsComponent: any
  ghBugHref: any
  ghEditHref: any

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

  componentWillMount() {
    const { examplePath } = this.props
    this.anchorName = examplePathToHash(examplePath)

    const exampleElement = this.renderOriginalExample()

    this.setState({
      exampleElement,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: this.handleMouseMove,
      showCode: this.isActiveHash(),
      showHTML: false,
      sourceCode: this.getOriginalSourceCode(),
      markup: renderToStaticMarkup(exampleElement),
    })
  }

  componentWillReceiveProps(nextProps) {
    // deactivate examples when switching from one to the next
    if (
      this.isActiveHash() &&
      this.isActiveState() &&
      this.props.location.hash !== nextProps.location.hash
    ) {
      this.clearActiveState()
    }
  }

  clearActiveState = () => {
    this.setState({
      showCode: false,
      showHTML: false,
      showRtl: false,
      showVariables: false,
    })
  }

  isActiveState = () => {
    const { showCode, showHTML, showRtl, showVariables } = this.state

    return showCode || showHTML || showRtl || showVariables
  }

  isActiveHash = () => this.anchorName === getFormattedHash(this.props.location.hash)

  private clickedOutsideComponent = (e: Event): boolean => {
    return !doesNodeContainClick((this.componentRef as any).ref, e)
  }

  updateHash = () => {
    if (this.isActiveState()) this.setHashAndScroll()
    else if (this.isActiveHash()) this.removeHash()
  }

  setHashAndScroll = () => {
    const { history, location } = this.props

    history.replace(`${location.pathname}#${this.anchorName}`)
    scrollToAnchor()
  }

  removeHash = () => {
    const { history, location } = this.props

    history.replace(location.pathname)

    this.clearActiveState()
  }

  handleDirectLinkClick = () => {
    this.setHashAndScroll()
    copyToClipboard(window.location.href)
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
      handleMouseLeave: null,
      handleMouseMove: this.handleMouseMove,
    })
  }

  handleMouseMove = () => {
    this.setState({
      isHovering: true,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: null,
    })
  }

  handleShowCode = (shouldShowCode: boolean) => {
    if (shouldShowCode !== this.state.showCode) {
      this.setState({ showCode: shouldShowCode }, this.updateHash)
    }
  }

  handleShowCodeInactive = (e: Event) => {
    if (this.clickedOutsideComponent(e)) {
      this.handleShowCode(false)
    }
  }

  handleShowHTML = (shouldShowHTML: boolean) => {
    if (shouldShowHTML !== this.state.showHTML) {
      this.setState({ showHTML: shouldShowHTML }, this.updateHash)
    }
  }

  handleShowHTMLInactive = (e: Event) => {
    if (this.clickedOutsideComponent(e)) {
      this.handleShowHTML(false)
    }
  }

  handleShowRtlClick = e => {
    e.preventDefault()

    const { showRtl } = this.state

    this.setState({ showRtl: !showRtl }, () => {
      this.renderSourceCode()
    })
  }

  handleShowVariablesClick = e => {
    e.preventDefault()

    const { showVariables } = this.state

    this.setState({ showVariables: !showVariables }, this.updateHash)
  }

  handlePass = () => {
    const { title } = this.props

    if (title) _.invoke(this.context, 'onPassed', null, this.props)
  }

  copyJSX = () => {
    copyToClipboard(this.state.sourceCode)
    this.setState({ copiedCode: true })
    setTimeout(() => this.setState({ copiedCode: false }), 1000)
  }

  resetJSX = () => {
    const { sourceCode } = this.state
    const original = this.getOriginalSourceCode()
    if (sourceCode !== original && confirm('Lose your changes?')) {
      this.setState({ sourceCode: original })
      this.renderSourceCode()
    }
  }

  getOriginalSourceCode = () => {
    const { examplePath } = this.props

    if (!this.sourceCode) this.sourceCode = require(`!raw-loader!../../../examples/${examplePath}`)

    return this.sourceCode
  }

  getKnobsFilename = () => `./${this.props.examplePath}.knobs.tsx`

  getKebabExamplePath = () => {
    if (!this.kebabExamplePath) this.kebabExamplePath = _.kebabCase(this.props.examplePath)

    return this.kebabExamplePath
  }

  hasKnobs = () => _.includes(knobsContext.keys(), this.getKnobsFilename())

  renderError = _.debounce(error => {
    this.setState({ error })
  }, 800)

  renderOriginalExample = () => {
    const { examplePath } = this.props
    const ExampleComponent = exampleContext(`./${examplePath}.tsx`).default
    return this.renderWithProvider(ExampleComponent)
  }

  renderSourceCode = _.debounce(() => {
    try {
      const Example = evalTypeScript(this.state.sourceCode)
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

  handleKnobChange = knobs => {
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

  getKnobsComponent = () => {
    if (typeof this.KnobsComponent !== 'undefined') {
      return this.KnobsComponent
    }

    this.KnobsComponent = this.hasKnobs() ? knobsContext(this.getKnobsFilename()).default : null

    return this.KnobsComponent
  }

  getKnobsValue = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? { ...Knobs.defaultProps, ...this.state.knobs } : null
  }

  renderKnobs = () => {
    const Knobs = this.getKnobsComponent()

    return Knobs ? <Knobs {...this.getKnobsValue()} onKnobChange={this.handleKnobChange} /> : null
  }

  getComponentName = () => this.props.examplePath.split('/')[1]

  renderWithProvider(ExampleComponent) {
    return (
      <Provider componentVariables={this.state.componentVariables} rtl={this.state.showRtl}>
        <ExampleComponent knobs={this.getKnobsValue()} />
      </Provider>
    )
  }

  handleChangeCode = sourceCode => {
    this.setState({ sourceCode }, this.renderSourceCode)
  }

  setGitHubHrefs = () => {
    const { examplePath } = this.props

    if (this.ghEditHref && this.ghBugHref) return

    // get component name from file path:
    // elements/Button/Types/ButtonButtonExample
    const pathParts = examplePath.split(__PATH_SEP__)
    const filename = pathParts[pathParts.length - 1]

    this.ghEditHref = [
      `${repoURL}/edit/master/docs/src/examples/${examplePath}.tsx`,
      `?message=docs(${filename}): your description`,
    ].join('')
  }

  renderJSXControls = () => {
    const { showCode, copiedCode, error } = this.state

    this.setGitHubHrefs()

    const color = error ? 'red' : 'black'
    const jsxControlsStyle: CSSProperties = {
      visibility: showCode ? 'visible' : 'hidden',
    }

    return (
      <Divider horizontal fitted style={jsxControlsStyle}>
        <Menu text>
          <Menu.Item
            active={copiedCode || !!error} // to show the color
            color={copiedCode ? 'green' : color}
            onClick={this.copyJSX}
            icon={!copiedCode && 'copy'}
            content={copiedCode ? 'Copied!' : 'Copy'}
          />
          <Menu.Item
            active={!!error} // to show the color
            color={color}
            icon="refresh"
            content="Reset"
            onClick={this.resetJSX}
          />
          <Menu.Item
            active={!!error} // to show the color
            color={color}
            icon="github"
            content="Edit"
            href={this.ghEditHref}
            target="_blank"
          />
        </Menu>
      </Divider>
    )
  }

  renderJSX = () => {
    const { error, showCode, sourceCode } = this.state

    const jsxStyle: CSSProperties = {
      width: '100%',
      ...(error && {
        boxShadow: `inset 0 0 0 1em ${errorStyle.background}`,
      }),
    }

    const editorProps: IEditorProps = {
      id: `${this.getKebabExamplePath()}-jsx`,
      value: sourceCode,
      onChange: this.handleChangeCode,
      onClick: this.handleShowCode.bind(this, true),
      onOutsideClick: this.handleShowCodeInactive,
      setOptions: {
        fixedWidthGutter: true,
      },
      preview: {
        size: 4,
        label: 'Click to edit',
        icon: 'code',
      },
      ...(!showCode && {
        active: false,
        // readOnly: true,
        showCursor: false,
        highlightActiveLine: false,
      }),
    }

    return (
      <div style={jsxStyle}>
        {this.renderJSXControls()}
        <Editor {...editorProps} />
        {error && <pre style={errorStyle}>{error}</pre>}
      </div>
    )
  }

  renderHTML = () => {
    const { showHTML, markup } = this.state

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

    const editorProps: IEditorProps = {
      id: `${this.getKebabExamplePath()}-html`,
      mode: 'html',
      onClick: this.handleShowHTML.bind(this, true),
      onOutsideClick: this.handleShowHTMLInactive,
      value: beautifiedHTML,
      showGutter: false,
      showCursor: false,
      readOnly: true,
      highlightActiveLine: false,
      active: showHTML,
      preview: {
        size: 4,
        label: 'Show more',
        icon: 'html5',
      },
    }

    return (
      <div>
        <Divider horizontal>Rendered HTML</Divider>
        <Editor {...editorProps} />
      </div>
    )
  }

  renderVariables = () => {
    const { showVariables } = this.state
    if (!showVariables) return

    const name = this.getComponentName()

    return (
      <div>
        <Divider horizontal>{_.startCase(name).replace(/ /g, '')} Variables</Divider>
        <Provider.Consumer
          render={({ siteVariables }) => {
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
        />
      </div>
    )
  }

  handleVariableChange = (component, variable) => (e, { value }) => {
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

  render() {
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
      <Visibility
        once={false}
        onTopPassed={this.handlePass}
        onTopPassedReverse={this.handlePass}
        ref={c => (this.componentRef = c)}
      >
        <Grid
          className="docs-example"
          padded="vertically"
          id={this.anchorName}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={exampleStyle}
        >
          <Grid.Row style={{ paddingBottom: 0 } as CSSProperties}>
            <Grid.Column>
              <ComponentControls
                anchorName={this.anchorName}
                examplePath={examplePath}
                onCopyLink={this.handleDirectLinkClick}
                onShowRtl={this.handleShowRtlClick}
                onShowVariables={this.handleShowVariablesClick}
                showCode={showCode}
                showHTML={showHTML}
                showRtl={showRtl}
                showVariables={showVariables}
                visible
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ paddingTop: 0 }}>
            <Grid.Column>
              <ComponentExampleTitle
                description={description}
                title={title}
                suiVersion={suiVersion}
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
        <Divider section horizontal />
      </Visibility>
    )
  }
}

export default withRouter(ComponentExample)
