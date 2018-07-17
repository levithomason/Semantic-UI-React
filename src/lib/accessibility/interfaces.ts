export enum ComponentState {
  enabled,
  disabled,
  hidden,
  focused,
}

export interface IAccessibilityBehavior {
  readonly name: string
  generateAriaAttributes(): object
  changeState(newState: ComponentState): void
}
