import React, { Component } from 'react'
import _ from 'lodash'
import { Header, Message } from 'semantic-ui-react'

const headerStyle = {
  whiteSpace: 'pre-line',
}

class ComponentDocTag extends Component<any, any> {
  getTagDescription = (forTag, fromInfo) => {
    const tags = (fromInfo.docblock && fromInfo.docblock.tags) || []
    return _.result(_.find(tags, 'title', forTag), 'description')
  }

  render() {
    const { info, tag, title } = this.props
    const description = this.getTagDescription(tag, info) || (
      <Message
        error
        content="No accessibility description found for this component. Please explain the
        accessibility concerns of the component by adding the @accessibility tag to the component's docblock."
        compact={true}
      />
    )

    return (
      <Header as="h2" style={headerStyle}>
        <Header.Content>{title}</Header.Content>
        <Header.Subheader>{description}</Header.Subheader>
      </Header>
    )
  }
}

export default ComponentDocTag
