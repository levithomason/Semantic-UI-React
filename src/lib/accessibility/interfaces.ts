export enum ComponentState {
  enabled,
  disabled,
  hidden,
  focused,
  active,
  inactive,
}

export interface IAccessibilityBehavior<P, S> {
  readonly name: string
  generateAriaAttributes(props: P, state: S): object
  changeState(newState: ComponentState): void
}
