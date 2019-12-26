import ComponentWrap from '@/base/components/FormTable/components/ComponentWrap';
import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import { Select } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import RadioGroup from 'antd/lib/radio/group';
import React from 'react';

class ArrayWrap extends ComponentWrap {
  public data: ({ label: string; value: any } | string)[] = [];

  constructor(
    data: ({ label: string; value: any } | string)[],
    type?: FormTableControlEnum.Checkbox | FormTableControlEnum.Radio | FormTableControlEnum.Select,
  ) {
    super(type);
    this.data = data;
  }

  render() {
    const { data, type, disabled } = this;
    switch (type) {
      case FormTableControlEnum.Checkbox:
        return <CheckboxGroup options={data} disabled={disabled} />;
      case FormTableControlEnum.Radio:
        return <RadioGroup options={data} disabled={disabled} />;
      default:
        let option = (data || []).map(item => {
          if (typeof item === 'string') {
            return {
              label: item,
              value: item,
            };
          } else {
            return item;
          }
        });
        return (
          <Select disabled={disabled}>
            {option &&
              option.map(item => {
                return (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                );
              })}
          </Select>
        );
    }
  }
}

export default ArrayWrap;
