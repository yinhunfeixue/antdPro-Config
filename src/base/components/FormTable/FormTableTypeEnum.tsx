import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import { Button, DatePicker, Icon, Input, InputNumber, Select, Switch, Tree, Upload } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import RadioGroup from 'antd/lib/radio/group';
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
    disabled?: boolean,
  ): ReactNode {
    const { getFieldDecorator } = form;
    const formProps = item.formProps || {};
    const props = {
      ...formProps.controlProps,
      disabled,
    };
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
      case FormTableTypeEnum.File:
        if (formProps.controlType === FormTableControlEnum.FileImage) {
          return getFieldDecorator(item.field, {
            initialValue: value || [],
            valuePropName: 'defaultFileList',
          })(
            <Upload {...props} listType="picture-card">
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>,
          );
        }
        return getFieldDecorator(item.field, {
          initialValue: value || [],
          valuePropName: 'defaultFileList',
        })(
          <Upload {...props}>
            <Button>Upload</Button>
          </Upload>,
        );

      case FormTableTypeEnum.Array:
        switch (formProps.controlType) {
          case FormTableControlEnum.Checkbox:
            return getFieldDecorator(item.field, { initialValue: value })(
              <CheckboxGroup {...props} />,
            );
          case FormTableControlEnum.Radio:
            return getFieldDecorator(item.field, { initialValue: value })(
              <RadioGroup {...props} />,
            );
          default:
            return getFieldDecorator(item.field, { initialValue: value })(<Select {...props} />);
        }
      case FormTableTypeEnum.DateArray:
        return getFieldDecorator(item.field, {
          initialValue: value instanceof Array ? value.map(item => moment(item)) : [],
        })(<DatePicker.RangePicker {...props} />);
      case FormTableTypeEnum.Tree:
        return getFieldDecorator(item.field, { initialValue: value })(<Tree {...props} />);
      default:
        switch (formProps.controlType) {
          case FormTableControlEnum.Image:
            return <img src={value} />;
          default:
            return getFieldDecorator(item.field, { initialValue: value })(<Input {...props} />);
        }
    }
  }
}
