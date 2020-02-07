import IComponentProps from '@/base/interfaces/IComponentProps';
import { createEmptyUserData, IUserData } from '@/pages/Demo/BestPractice/IUserData';
import { Input, InputNumber, Modal, Skeleton } from 'antd';
import React, { Component, ReactNode } from 'react';

interface IEditModalState {
  name: string;
  visible?: boolean;
  fullSourceData: IUserData;
  loading: boolean;
}
interface IEditModalProps extends IComponentProps {
  sourceData?: IUserData;
  onSuccess: (data: IUserData) => void;
}

class EditModal extends Component<IEditModalProps, IEditModalState> {
  constructor(props: IEditModalProps) {
    super(props);
    this.state = this.getInitState();
  }

  public show() {
    this.setState({ visible: true });
    // 打开后，重置所有数据
    this.reset();
  }

  public close() {
    this.setState({ visible: false });
  }

  private reset() {
    this.setState(this.getInitState());
    this.requestFullData();
  }

  private requestFullData() {
    const { sourceData } = this.props;
    if (sourceData) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ fullSourceData: { ...sourceData, age: 10 }, loading: false });
      }, 1000);
    }
  }

  private getInitState(): IEditModalState {
    const { sourceData } = this.props;
    let stateFromSource;
    if (sourceData) {
      stateFromSource = {
        name: sourceData.name,
      };
    }
    return {
      name: '',
      loading: false,
      fullSourceData: createEmptyUserData(),
      ...stateFromSource,
    };
  }

  private save() {
    const { onSuccess } = this.props;
    const { fullSourceData } = this.state;
    onSuccess(fullSourceData);
    this.close();
  }

  public render(): ReactNode {
    const { fullSourceData, visible, loading } = this.state;
    return (
      <Modal
        title="编辑"
        visible={visible}
        confirmLoading={loading}
        onCancel={() => this.close()}
        onOk={() => {
          this.save();
        }}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <React.Fragment>
            <Input
              value={fullSourceData.name}
              onChange={event => {
                fullSourceData.name = event.target.value;
                this.forceUpdate();
              }}
            />
            <InputNumber
              value={fullSourceData.age}
              onChange={value => {
                fullSourceData.age = value;
                this.forceUpdate();
              }}
            />
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default EditModal;
