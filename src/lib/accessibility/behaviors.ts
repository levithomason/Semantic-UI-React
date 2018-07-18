import { IAccessibilityBehavior, ComponentState } from './interfaces'

export class DefaultBehavior implements IAccessibilityBehavior {
  public get name(): string {
    return 'default'
  }

  public generateAriaAttributes(): object {
    return {
      'ms-acc-behavior': this.name,
      role: 'default',
    }
  }

  public changeState(newState: ComponentState): void {
    throw new Error('Method not implemented.')
  }
}

export class ButtonBehavior implements IAccessibilityBehavior {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'button',
    'aria-hidden': false,

    // child: {
    //   'ms-acc-behavior': this.name,
    //   role: 'menu-item',
    //   'aria-hidden': false,
    //   'tab-index': 0,
    // },
  }

  public get name(): string {
    return 'button'
  }

  public generateAriaAttributes(): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    if (newState === ComponentState.disabled) {
      this.attributes['aria-disabled'] = true
    } else if (newState === ComponentState.enabled) {
      delete this.attributes['aria-disabled']
    }
  }
}
