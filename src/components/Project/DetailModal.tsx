import React, { Component, ReactNode } from 'react';
import IComponentProps from '@/base/interfaces/IComponentProps';
import { Modal, Button, Form } from 'antd';
import DetailView, { DetailViewClass } from '@/base/components/DetailView';
import { ModalProps } from 'antd/lib/modal';
import FormItem from 'antd/lib/form/FormItem';

import classnames from 'classnames';
import './DetailModal.less';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';

interface IDetailModalState {
  visible: boolean;
}
export interface IDetailModalProps extends IComponentProps {
  initData?: any;
  getInstance?: (target: DetailModal) => void;
  type: DetailViewTypeEnum;
}

class DetailModal extends Component<IDetailModalProps, IDetailModalState> {
  public constructor(props: IDetailModalProps) {
    super(props);
    this.state = {
      visible: false,
    };

    if (this.props.getInstance) {
      this.props.getInstance(this);
    }
  }

  protected get modalProps(): ModalProps | null {
    return null;
  }

  protected get type(): DetailViewTypeEnum {
    return this.props.type || DetailViewTypeEnum.ADD;
  }

  protected getReuqestData(initData: any): any {
    if (!initData) {
      return null;
    }
    return null;
  }

  protected addRequestData(initData: any, clientData: any): any {
    if (!initData && !clientData) {
      return null;
    }
    return null;
  }

  protected updateRequestData(initData: any, clientData: any): any {
    if (!initData && !clientData) {
      return null;
    }
    return null;
  }

  protected parseServerData = (response: any): any => {
    return response.data.data;
  };

  protected renderControls = (instance: DetailViewClass): ReactNode => {
    const disabled = this.type === DetailViewTypeEnum.READ;
    if (disabled) {
      return null;
    }
    return (
      <FormItem className="FiberHomeDetailModalControlGroup">
        <Button
          onClick={() =>
            instance.saveData(() => {
              this.close();
            })
          }
          type="primary"
        >
          保存
        </Button>
        <Button onClick={() => this.close()}>取消</Button>
      </FormItem>
    );
  };

  protected renderItems(instance: DetailViewClass, initData: any, serverData: any): ReactNode {
    if (initData && serverData) {
      return null;
    }
    return null;
  }

  private renderForm = (instance: DetailViewClass, initData: any, serverData: any): ReactNode => {
    return <Form>{this.renderItems(instance, initData, serverData)}</Form>;
  };

  public show() {
    this.setState({ visible: true });
  }

  public close() {
    this.setState({ visible: false });
  }

  public render(): ReactNode {
    return (
      <Modal
        {...this.modalProps}
        visible={this.state.visible}
        footer={null}
        onCancel={() => this.close()}
        className={classnames('FiberHomeDetailModal', this.props.className)}
        style={this.props.style}
        destroyOnClose
      >
        <DetailView
          type={this.type}
          initData={this.props.initData}
          getRequestData={this.getReuqestData}
          addRequestData={this.addRequestData}
          updateRequestData={this.updateRequestData}
          parseServerData={this.parseServerData}
          renderForm={this.renderForm}
          renderControls={this.renderControls}
        />
      </Modal>
    );
  }
}

export default DetailModal;
