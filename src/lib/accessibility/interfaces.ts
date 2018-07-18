export enum ComponentState {
  enabled,
  disabled,
  hidden,
  focused,
  active,
  inactive,
}

export interface IAccessibilityBehavior {
  readonly name: string
  generateAriaAttributes(): object
  changeState(newState: ComponentState): void
}
