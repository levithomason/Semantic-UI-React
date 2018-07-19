import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class MenuItemBehavior implements IAccessibilityBehavior {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    // tabIndex: -1,
  }

  constructor(props: object, state: object) {}

  public get name(): string {
    return 'menuitem'
  }

  public generateAriaAttributes(): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
