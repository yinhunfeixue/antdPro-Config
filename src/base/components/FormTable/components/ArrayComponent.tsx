import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import IComponentProps from '@/base/interfaces/IComponentProps';
import { Select } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import RadioGroup from 'antd/lib/radio/group';
import React, { PureComponent, ReactNode } from 'react';

interface IArrayComponentState {}
export interface IArrayComponentProps extends IComponentProps {
  data?: ({ label: string; value: any } | string)[];
  value?: any;
  type?: FormTableControlEnum | string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

/**
 * 用于和数组交互的组件
 * 包含：下拉框，单选，多选三种情况
 */
class ArrayComponent extends PureComponent<IArrayComponentProps, IArrayComponentState> {
  public render(): ReactNode {
    const { type, value, onChange } = this.props;
    let data = (this.props.data || []).map(item => {
      if (typeof item === 'string') {
        return {
          label: item,
          value: item,
        };
      } else {
        return item;
      }
    });
    // 根据type渲染不同的组件
    switch (type) {
      case FormTableControlEnum.Checkbox:
        return (
          <CheckboxGroup
            onChange={value => {
              if (onChange) {
                onChange(value);
              }
            }}
            options={data}
            value={value}
          />
        );
      case FormTableControlEnum.Radio:
        return (
          <RadioGroup
            onChange={event => {
              if (onChange) {
                onChange(event.target.value);
              }
            }}
            options={data}
            value={value}
          />
        );
      default:
        return (
          <Select
            value={value}
            onChange={(value: any) => {
              if (onChange) {
                onChange(value);
              }
            }}
          >
            {data &&
              data.map(item => {
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

export default ArrayComponent;
