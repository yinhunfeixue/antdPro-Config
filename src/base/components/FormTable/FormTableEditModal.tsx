import DetailView from '@/base/components/DetailView';
import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IFormItemData from '@/base/interfaces/IFormItemData';
import AntdUtil from '@/base/utils/AntdUtil';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import Lodash from 'lodash';
import moment from 'moment';
import React, { Component, ReactNode } from 'react';

interface IFormTableEditModalState<T> {
  loading: boolean;
  serverData?: T;
}
interface IFormTableEditModalProps<T> {
  itemList: IFormTableItem[];
  visible: boolean;
  type?: DetailViewTypeEnum;
  data?: T;
  onCancel: () => void;
  /**
   * 表单一行有几列
   */
  columnCount?: number;

  labelSpan?: number;

  width?: number;
}

class FormTableEditModal<T> extends Component<
  IFormTableEditModalProps<T>,
  IFormTableEditModalState<T>
> {
  constructor(props: IFormTableEditModalProps<T>) {
    super(props);
    this.state = {
      loading: false,
      serverData: undefined,
    };
  }

  private reset() {
    this.state = {
      loading: false,
      serverData: undefined,
    };
  }

  private getTitle() {
    const { type, data } = this.props;
    if (type) {
      return DetailViewTypeEnum.toString(type);
    }
    return data ? '编辑' : '新建';
  }

  private renderForm = () => {
    const { itemList, columnCount, labelSpan, type, data } = this.props;
    let { serverData } = this.state;
    const result: IFormItemData[] = [];
    const disabled = type === DetailViewTypeEnum.READ;
    for (let item of itemList) {
      if (item.formProps.hideInForm) {
        continue;
      }
      let currentNode: ReactNode = null;
      const value = Lodash.get(serverData, item.field) || Lodash.get(data, item.field);
      switch (item.type) {
        case Number:
          currentNode = <InputNumber value={value} disabled={disabled} />;
          break;
        case Date:
          currentNode = <DatePicker value={moment(value)} disabled={disabled} />;
          break;
        default:
          currentNode = <Input value={value} disabled={disabled} />;
          break;
      }
      result.push({
        label: item.label,
        content: currentNode,
        span: item.formProps.span,
        formLabelSpan: item.formProps.labelSpan,
      });
    }
    return <Form>{AntdUtil.renderFormItems(result, columnCount || 12, labelSpan || 6)}</Form>;
  };

  public render(): ReactNode {
    const { visible, onCancel, type, width } = this.props;
    const disabled = type === DetailViewTypeEnum.READ;
    const modalProps: any = {};
    if (disabled) {
      modalProps.footer = null;
    }
    return (
      <Modal
        {...modalProps}
        width={width || 1000}
        title={this.getTitle()}
        visible={visible}
        onCancel={() => {
          this.reset();
          onCancel();
        }}
        onOk={() => {}}
      >
        <DetailView type={type} renderForm={this.renderForm} />
      </Modal>
    );
  }
}

export default FormTableEditModal;
