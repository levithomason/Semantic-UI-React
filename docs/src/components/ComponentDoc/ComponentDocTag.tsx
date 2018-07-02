import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

const headerStyle = {
  whiteSpace: 'pre-line',
}

class ComponentDocTag extends Component<any, any> {
  getTagDescription = (info, tagParam) => {
    const tags = (info.docblock && info.docblock.tags) || []
    let accessibilityDescription = null
    for (const tag of tags) {
      if (tag.title === tagParam) {
        accessibilityDescription = tag.description
      }
    }
    return accessibilityDescription
  }

  render() {
    const { info, tag, title } = this.props
    const description = this.getTagDescription(info, tag)

    return (
      <React.Fragment>
        {description && (
          <Header as="h2" content={title} subheader={description} style={headerStyle} />
        )}
      </React.Fragment>
    )
  }
}

export default ComponentDocTag
