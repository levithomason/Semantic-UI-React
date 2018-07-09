import PropTypes from 'prop-types'
import React, { CSSProperties } from 'react'

import { repoURL } from 'docs/src/utils'
import { Message, Icon } from 'semantic-ui-react'

const truncateStyle: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const ContributionPrompt: any = ({ children }) => (
  <Message info icon>
    <Icon name="bullhorn" />
    <Message.Content style={truncateStyle}>
      <div>{children}</div>
      <p style={truncateStyle}>
        If there's no <a href={`${repoURL}/pulls`}>pull request</a> open for this, you should{' '}
        <a href={`${repoURL}/blob/master/.github/CONTRIBUTING.md`}>contribute</a>!
      </p>
    </Message.Content>
  </Message>
)

ContributionPrompt.propTypes = {
  children: PropTypes.node,
}

export default ContributionPrompt
