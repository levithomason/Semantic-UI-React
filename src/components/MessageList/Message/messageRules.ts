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

export default messageRules
