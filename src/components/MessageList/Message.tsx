import * as React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { createComponent, customPropTypes, getElementType } from '../../lib'

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

    // TODO - the following ones are temporary
    margin: 0,
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

const Message: any = props => {
  const { content, styles, className } = props
  const ElementType = getElementType(Message, props)

  return (
    <ElementType className={cx('ui-message__container', styles.container, className)}>
      <p className={cx('ui-message__text', styles.text)}>{content}</p>
    </ElementType>
  )
}

Message.propTypes = {
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** Indicates whether message is outcoming. */
  isMine: PropTypes.bool,

  /** Variables */
  variables: PropTypes.object,

  children: PropTypes.node,
}

Message.defaultProps = {
  as: 'div',
}

export default createComponent(Message, {
  rules: messageRules,
  variables: messageVariables,
})
