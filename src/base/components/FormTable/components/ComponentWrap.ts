import { ReactNode } from 'react';

class ComponentWrap {
  public type?: any;
  public disabled: boolean = false;

  constructor(type?: any) {
    this.type = type;
  }

  render(): ReactNode {
    return '';
  }
}

export default ComponentWrap;
