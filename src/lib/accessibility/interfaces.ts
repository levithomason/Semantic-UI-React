export interface IAccessibilityBehavior {
  readonly name: string
  generateAriaAttributes(): object
}
