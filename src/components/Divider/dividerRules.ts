import { childrenExist, pxToRem } from '../../lib'
import { IDividerVariables } from './dividerVariables'

export type DividerType = 'primary' | 'secondary'

interface IDividerProps {
  variables: IDividerVariables
  size?: number
  type?: DividerType
  children?: any
  important?: boolean
}

const dividerBorderRule = (size, color) => ({
  height: `${size + 1}px`,
  background: color,
})

const beforeAndAfter = (size, type, variables) => ({
  content: '""',
  flex: 1,
  ...dividerBorderRule(size, variables.typeSecondaryBackgroundColor), // the default border rule
  ...(type === 'primary' && {
    ...dividerBorderRule(size, variables.typePrimaryBackgroundColor),
  }),
  ...(type === 'secondary' && {
    ...dividerBorderRule(size, variables.defaultBackgroundColor),
  }),
})

export default (props: IDividerProps) => {
  const { children, size, type, important, variables } = props
  return {
    root: {
      marginTop: pxToRem(10 + size * 7.5),
      marginBottom: pxToRem(10 + size * 7.5),
      ...(important && {
        fontWeight: 'bold',
      }),
      ...(childrenExist(children)
        ? {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: 0,
            fontSize: pxToRem(14 + size),
            ':before': {
              ...beforeAndAfter(size, type, variables),
              marginRight: pxToRem(15 + size * 2),
            },
            ':after': {
              ...beforeAndAfter(size, type, variables),
              marginLeft: pxToRem(15 + size * 2),
            },
            color: variables.typeSecondaryColor, // the default color
            ...(type === 'primary' && {
              color: variables.typePrimaryColor,
            }),
            ...(type === 'secondary' && {
              color: variables.defaultColor,
            }),
          }
        : {
            ...dividerBorderRule(size, variables.typeSecondaryBackgroundColor), // the default border rule
            ...(type === 'primary' && {
              ...dividerBorderRule(size, variables.typePrimaryBackgroundColor),
            }),
            ...(type === 'secondary' && {
              ...dividerBorderRule(size, variables.defaultBackgroundColor),
            }),
          }),
    },
  }
}
