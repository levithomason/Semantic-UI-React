import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class SelectableListBehavior implements IAccessibilityBehavior {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'listbox',
  }

  constructor(props: object, state: object) {}

  public get name(): string {
    return 'selectable-list'
  }

  public generateAriaAttributes(): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
