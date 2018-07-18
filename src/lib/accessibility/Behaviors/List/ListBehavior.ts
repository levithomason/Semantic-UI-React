import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class ListBehavior implements IAccessibilityBehavior {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'list',
  }

  constructor(props: object, state: object) {}

  public get name(): string {
    return 'list'
  }

  public generateAriaAttributes(): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
