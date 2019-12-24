import ArrayWrap from '@/base/components/FormTable/components/ArrayWrap';
import ComponentWrap from '@/base/components/FormTable/components/ComponentWrap';
import FileWrap from '@/base/components/FormTable/components/FileWrap';
import StringWrap from '@/base/components/FormTable/components/StringWrap';
import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import { DatePicker, InputNumber, Switch, Tree } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import moment from 'moment';
import React, { ReactNode } from 'react';
enum FormTableTypeEnum {
  Boolean,
  Number,
  Date,
  File,
  Array,
  DateArray,
  Tree,
  String,
}

export default FormTableTypeEnum;

namespace FormTableTypeEnum {
  export function toControl<T>(
    item: IFormTableItem<T>,
    value: any,
    form: WrappedFormUtils,
    disabled: boolean = false,
  ): ReactNode {
    const { getFieldDecorator } = form;
    const formProps = item.formProps || {};
    const props = {
      disabled,
    };
    let wrap: ComponentWrap | undefined;
    switch (item.type) {
      case FormTableTypeEnum.Boolean:
        return getFieldDecorator(item.field, { initialValue: value, valuePropName: 'checked' })(
          <Switch {...props} />,
        );
      case FormTableTypeEnum.Number:
        return getFieldDecorator(item.field, { initialValue: value })(<InputNumber {...props} />);
      case FormTableTypeEnum.Date:
        return getFieldDecorator(item.field, { initialValue: moment(value) })(
          <DatePicker {...props} />,
        );
      case FormTableTypeEnum.DateArray:
        return getFieldDecorator(item.field, {
          initialValue: value instanceof Array ? value.map(item => moment(item)) : [],
        })(<DatePicker.RangePicker {...props} />);
      case FormTableTypeEnum.Tree:
        return getFieldDecorator(item.field, { initialValue: value })(<Tree {...props} />);
      case FormTableTypeEnum.File:
        wrap = formProps.componentWrap || new FileWrap();
        wrap.disabled = disabled;
        return getFieldDecorator(item.field, {
          initialValue: value || [],
          valuePropName: 'defaultFileList',
        })(wrap.render());
      case FormTableTypeEnum.Array:
        wrap = formProps.componentWrap || new ArrayWrap([]);
        wrap.disabled = disabled;
        return getFieldDecorator(item.field, { initialValue: value })(wrap.render());
      default:
        wrap = formProps.componentWrap || new StringWrap();
        wrap.disabled = disabled;
        return getFieldDecorator(item.field, { initialValue: value })(wrap.render());
    }
  }
}
