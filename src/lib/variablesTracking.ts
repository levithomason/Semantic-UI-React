export type WithTrackedVariables<TProps> = TProps extends { variables: infer TVariables }
  ? TProps & { trackVariables: () => TVariables }
  : never

type VariableTouchedCallback = (variableName: string | number | symbol) => void

interface VariableSpy {
  onVariableTouched: VariableTouchedCallback
  whenApplied: () => void
}

interface PerComponentVariableSpies {
  [componentDisplayName: string]: VariableSpy
}

interface VariableSpySpec {
  componentDisplayName: string
  onVariableTouched: VariableTouchedCallback
  whenApplied?: () => void
}

const DoNothing = () => {}

export function createSpy(spec: VariableSpySpec): PerComponentVariableSpies {
  const { componentDisplayName, onVariableTouched, whenApplied } = spec

  return {
    [componentDisplayName]: {
      onVariableTouched,
      whenApplied: whenApplied || DoNothing,
    },
  }
}

function createTrackedVariablesProvider<TVariables extends object>(
  spy: VariableSpy,
  variables: TVariables,
): () => TVariables {
  return () => {
    spy.whenApplied()

    return new Proxy(variables, {
      get: (it, variableName) => {
        spy.onVariableTouched(variableName)
        return it[variableName]
      },
    })
  }
}

export function connect<TVariables extends object>(
  spies: PerComponentVariableSpies,
  componentDisplayName: string,
  variables: TVariables,
): () => TVariables {
  if (!spies || !spies[componentDisplayName]) {
    return () => variables
  }

  return createTrackedVariablesProvider(spies[componentDisplayName], variables)
}

export class ActiveVariablesTracker {
  isEnabled = false
  activeVariables: (string | number | symbol)[] = []

  registerAsActive(variableName: string | number | symbol): void {
    if (!this.activeVariables.some(v => v === variableName)) {
      this.activeVariables.push(variableName)
    }
  }

  isActive(variableName: string | number | symbol): boolean {
    return this.activeVariables.some(v => v === variableName)
  }

  resetAndDisable(): void {
    this.isEnabled = false
    this.activeVariables = []
  }
}
