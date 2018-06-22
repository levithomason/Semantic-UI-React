import * as React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { createComponent, customPropTypes } from '../../lib'

import Message from './Message'

const messageListRules = () => ({
  root: {
    listStyle: 'none',
    display: 'block',
    padding: 0,
    margin: 0,
  },
})

const MessageList: any = props => (
  <ul className={cx('ui-message__list', props.styles.root, props.className)}>
    {props.items &&
      props.items.map(message => (
        <li>
          <Message key={message.key} content={message.content} isMine={message.isMine} />
        </li>
      ))}
  </ul>
)

MessageList.propTypes = {
  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand array of message items. */
  items: PropTypes.arrayOf(PropTypes.any),

  children: PropTypes.node,
}

// TODO introduce
// MessageList.handledProps = ['className', 'items' ]

MessageList.defaultProps = { items: [] }

export default createComponent(MessageList, { rules: messageListRules })
