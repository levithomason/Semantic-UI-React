import * as React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { createComponent, customPropTypes, getElementType } from '../../../lib'

import messageRules from './messageRules'
import messageVariables from './messageVariables'

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
