import FormImg from '@/base/components/FormImg';
import ComponentWrap from '@/base/components/FormTable/components/ComponentWrap';
import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import { Input } from 'antd';
import React from 'react';

class StringWrap extends ComponentWrap {
  constructor(type?: FormTableControlEnum.Image | FormTableControlEnum.Input) {
    super(type);
  }
  render() {
    const { type, disabled } = this;
    switch (type) {
      case FormTableControlEnum.Image:
        return <FormImg />;
      default:
        return <Input disabled={disabled} />;
    }
  }
}

export default StringWrap;
