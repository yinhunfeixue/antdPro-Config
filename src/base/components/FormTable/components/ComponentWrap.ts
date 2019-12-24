import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import { ReactNode } from 'react';

class ComponentWrap {
  public type?: FormTableControlEnum | string;
  public disabled: boolean = false;

  constructor(type?: FormTableControlEnum | string) {
    this.type = type;
  }

  render(): ReactNode {
    return '';
  }
}

export default ComponentWrap;
