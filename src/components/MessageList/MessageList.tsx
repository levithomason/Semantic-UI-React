import * as React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { createComponent, customPropTypes, getElementType } from '../../lib'

import Message from './Message'

const messageListRules = () => ({
  root: {
    listStyle: 'none',
    display: 'block',
    padding: 0,
    margin: 0,
  },
})

const MessageList: any = props => {
  const ElementType = getElementType(MessageList, props)

  return (
    <ElementType className={cx('ui-message__list', props.styles.root, props.className)}>
      {props.items &&
        props.items.map(message => (
          <li>
            <Message key={message.key} content={message.content} isMine={message.isMine} />
          </li>
        ))}
    </ElementType>
  )
}

MessageList.propTypes = {
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand array of message items. */
  items: PropTypes.arrayOf(PropTypes.any),

  children: PropTypes.node,
}

// TODO introduce
// MessageList.handledProps = ['className', 'items' ]

MessageList.defaultProps = {
  as: 'ul',
  items: [],
}

export default createComponent(MessageList, { rules: messageListRules })
