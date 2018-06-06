/**
 * Tests if children are nil in React and Preact.
 *
 * @param {Object} props A components props
 * @param {Object} props.children The children prop of a component.
 * @returns {Boolean}
 */
const hasChildren = ({ children } = {}) =>
  children === null || children === undefined || (Array.isArray(children) && children.length === 0)

export default hasChildren
