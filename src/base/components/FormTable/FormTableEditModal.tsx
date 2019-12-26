import DetailView, { DetailViewClass } from '@/base/components/DetailView';
import FormTableTypeEnum from '@/base/components/FormTable/FormTableTypeEnum';
import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IFormItemData from '@/base/interfaces/IFormItemData';
import AntdUtil from '@/base/utils/AntdUtil';
import { Form, Modal } from 'antd';
import Lodash from 'lodash';
import React, { Component, ReactNode } from 'react';

interface IFormTableEditModalState<T> {
  loading: boolean;
}
interface IFormTableEditModalProps<T> {
  itemList: IFormTableItem<T>[];
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
    };
  }

  private reset() {
    this.state = {
      loading: false,
    };
  }

  private getTitle() {
    const { type, data } = this.props;
    if (type) {
      return DetailViewTypeEnum.toString(type);
    }
    return data ? '编辑' : '新建';
  }

  private renderForm = (
    instance: DetailViewClass<T>,
    initData?: T | undefined,
    serverData?: T | undefined,
  ) => {
    const { itemList, columnCount, labelSpan, type } = this.props;
    const result: IFormItemData[] = [];

    for (let item of itemList) {
      const formProps = item.formProps || {};
      const disabled = type === DetailViewTypeEnum.READ || formProps.disableEdit;
      if (formProps.hideInForm) {
        continue;
      }

      const value = Lodash.get(serverData, item.field) || Lodash.get(initData, item.field);
      let currentNode: ReactNode = FormTableTypeEnum.toControl(
        item,
        value,
        instance.props.form,
        disabled,
      );

      result.push({
        label: item.label,
        content: currentNode,
        span: formProps.span,
        formLabelSpan: formProps.labelSpan,
      });
    }
    return <Form>{AntdUtil.renderFormItems(result, columnCount || 12, labelSpan || 6)}</Form>;
  };

  public render(): ReactNode {
    const { visible, onCancel, type, width, data } = this.props;
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
        <DetailView<T> type={type} renderForm={this.renderForm} initData={data} />
      </Modal>
    );
  }
}

export default FormTableEditModal;
