import DetailView, { DetailViewClass } from '@/base/components/DetailView';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IComponentProps from '@/base/interfaces/IComponentProps';
import { Button, Form, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { ModalProps } from 'antd/lib/modal';
import classnames from 'classnames';
import React, { Component, ReactNode } from 'react';
import './DetailModal.less';

interface IDetailModalState {
  visible: boolean;
}
export interface IDetailModalProps<T> extends IComponentProps {
  initData?: any;
  getInstance?: (target: DetailModal<T>) => void;
  type: DetailViewTypeEnum;
}

class DetailModal<T> extends Component<IDetailModalProps<T>, IDetailModalState> {
  public constructor(props: IDetailModalProps<T>) {
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

  protected async getReuqestData(initData: T) {
    if (!initData) {
      return null;
    }
    return null;
  }

  protected async addRequestData(clientData: T) {
    if (!clientData) {
      return null;
    }
    return null;
  }

  protected async updateRequestData(initData: T, clientData: T) {
    if (!initData && !clientData) {
      return null;
    }
    return null;
  }

  protected renderControls = (instance: DetailViewClass<any>): ReactNode => {
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

  protected renderItems(instance: DetailViewClass<T>, initData?: T, serverData?: T): ReactNode {
    if (initData && serverData) {
      return null;
    }
    return null;
  }

  private renderForm = (instance: DetailViewClass<T>, initData?: T, serverData?: T): ReactNode => {
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
        <DetailView<T>
          type={this.type}
          initData={this.props.initData}
          getFunction={this.getReuqestData}
          addFunction={this.addRequestData}
          updateFunction={this.updateRequestData}
          renderForm={this.renderForm}
          renderControls={this.renderControls}
        />
      </Modal>
    );
  }
}

export default DetailModal;
