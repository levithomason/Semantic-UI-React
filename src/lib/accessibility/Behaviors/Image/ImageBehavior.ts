import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class ImageBehavior implements IAccessibilityBehavior {
  private attributes = {
    'ms-acc-behavior': this.name,
    alt: '',
  }

  constructor(props: object, state: object) {
    if (!props['alt']) {
      this.attributes['role'] = 'presentation'
    }
  }

  public get name(): string {
    return 'image'
  }

  public generateAriaAttributes(): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
