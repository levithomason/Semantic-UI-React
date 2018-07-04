import { utils } from 'react-docgen'
import isUIComponentClass from './isUIComponentClass'

const {
  isExportsOrModuleAssignment,
  isReactComponentClass,
  isReactCreateClassCall,
  isStatelessComponent,
  normalizeClassDefinition,
  resolveExportDeclaration,
  resolveToValue,
  resolveHOC,
} = utils

/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */

function ignore() {
  return false
}

function resolveDefinition(definition, types) {
  if (isUIComponentClass(definition) || isReactComponentClass(definition)) {
    normalizeClassDefinition(definition)
    return definition
  }
  if (isReactCreateClassCall(definition)) {
    // return argument
    const resolvedPath = resolveToValue(definition.get('arguments', 0))
    if (types.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath
    }
  } else if (isStatelessComponent(definition)) {
    return definition
  }
  return null
}

function isComponentDefinition(path) {
  return (
    isUIComponentClass(path) ||
    isReactCreateClassCall(path) ||
    isReactComponentClass(path) ||
    isStatelessComponent(path)
  )
}

/**
 * Given an AST, this function tries to find the exported component definitions.
 *
 * The component definitions are either the ObjectExpression passed to
 * `React.createClass` or a `class` definition extending `React.Component` or
 * having a `render()` method.
 *
 * If a definition is part of the following statements, it is considered to be
 * exported:
 *
 * modules.exports = Definition;
 * exports.foo = Definition;
 * export default Definition;
 * export const Definition = ...;
 */
function findExportedComponentDefinitions(ast, recast) {
  const types = recast.types.namedTypes
  const components = []

  function exportDeclaration(path) {
    const definitions = resolveExportDeclaration(path, types)
      .reduce((acc, definition) => {
        if (isComponentDefinition(definition)) {
          acc.push(definition)
        } else {
          const resolved = resolveToValue(resolveHOC(definition))
          if (isComponentDefinition(resolved)) {
            acc.push(resolved)
          }
        }
        return acc
      }, [])
      .map(definition => {
        return resolveDefinition(definition, types)
      })

    if (definitions.length === 0) {
      return false
    }
    definitions.forEach(definition => {
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition)
      }
    })
    return false
  }

  recast.visit(ast, {
    visitFunctionDeclaration: ignore,
    visitFunctionExpression: ignore,
    visitClassDeclaration: ignore,
    visitClassExpression: ignore,
    visitIfStatement: ignore,
    visitWithStatement: ignore,
    visitSwitchStatement: ignore,
    visitCatchCause: ignore,
    visitWhileStatement: ignore,
    visitDoWhileStatement: ignore,
    visitForStatement: ignore,
    visitForInStatement: ignore,

    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,

    visitAssignmentExpression: function visitAssignmentExpression(pathParam) {
      let path = pathParam
      // Ignore anything that is not `exports.X = ...;` or
      // `module.exports = ...;`
      if (!isExportsOrModuleAssignment(path)) {
        return false
      }
      // Resolve the value of the right hand side. It should resolve to a call
      // expression, something like React.createClass
      path = resolveToValue(path.get('right'))
      if (!isComponentDefinition(path)) {
        path = resolveToValue(resolveHOC(path))
        if (!isComponentDefinition(path)) {
          return false
        }
      }
      const definition = resolveDefinition(path, types)
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition)
      }
      return false
    },
  })

  return components
}

export default findExportedComponentDefinitions
