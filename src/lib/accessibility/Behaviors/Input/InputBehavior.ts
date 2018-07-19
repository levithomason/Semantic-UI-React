import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class InputBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
  }

  public get name(): string {
    return 'input'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
