import * as React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { createComponent, customPropTypes } from '../../lib'

const messageListRules = () => ({
  root: {
    listStyle: 'none',
    display: 'block',
    padding: 0,
    margin: 0,
  },
})

const messageRules = ({ isMine, variables }) => ({
  container: {
    display: 'flex',
    margin: '1rem', // TODO is temporary hardcoded value
    justifyContent: (isMine && 'flex-end') || 'flex-start',
  },
  text: {
    display: 'inline-block',
    backgroundColor: (isMine && variables.messageColor.mine) || variables.messageColor.incoming,
    maxWidth: variables.messageWidth,

    // TODO - the following ones are temporay
    padding: '1rem',
    borderRadius: '0.3rem',
    color: 'rgb(64,64,64)',
    fontFamily: 'Segoe UI, sans-serif',
  },
})

const messageVariables = {
  messageWidth: '80%',
  messageColor: {
    mine: '#E0E0ED',
    incoming: 'rgba(0,0,0,0.1)',
  },
}

const Message = createComponent(
  ({ content, styles, className }) => (
    <div className={cx('ui-message__container', styles.container, className)}>
      <p className={cx('ui-message__text', styles.text)}>{content}</p>
    </div>
  ),
  {
    rules: messageRules,
    variables: messageVariables,
  },
)

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
}

// TODO introduce
// MessageList.handledProps = ['className', 'items' ]

MessageList.defaultProps = { items: [] }

export default createComponent(MessageList, { rules: messageListRules })
