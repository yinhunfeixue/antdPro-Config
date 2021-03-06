import { DetailViewClass } from '@/base/components/DetailView';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IPageProps from '@/base/interfaces/IPageProps';
import AntdUtil from '@/base/utils/AntdUtil';
import DetailModal, { IDetailModalProps } from '@/components/Project/DetailModal';
import { Button, Card, Form, Input } from 'antd';
import React, { Component, ReactNode } from 'react';

interface IDetailModelPageSate {
  initData: any;
  editType: DetailViewTypeEnum;
}

class DetailModelPage extends Component<IPageProps, IDetailModelPageSate> {
  private editView: DemoDetail | null = null;
  public constructor(props: IPageProps) {
    super(props);
    this.state = {
      initData: null,
      editType: DetailViewTypeEnum.ADD,
    };
  }

  private showEditView = (): void => {
    if (this.editView) {
      this.editView.show();
    }
  };

  public render(): ReactNode {
    return (
      <Card title="在开发者工具中，把网速设为slow 3g，注意观察开发工具中请求的数据">
        <div className="ControlGroup">
          {' '}
          <Button
            type="primary"
            onClick={() => {
              if (this.editView) {
                if (this.editView) {
                  this.setState(
                    {
                      initData: null,
                      editType: DetailViewTypeEnum.ADD,
                    },
                    () => this.showEditView(),
                  );
                }
              }
            }}
          >
            新增
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (this.editView) {
                this.setState(
                  {
                    initData: { id: 1, x: 'initX' },
                    editType: DetailViewTypeEnum.UPDATE,
                  },
                  () => this.showEditView(),
                );
              }
            }}
          >
            修改
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (this.editView) {
                this.setState(
                  {
                    initData: { id: 1, x: 'initX', y: 'yyy' },
                    editType: DetailViewTypeEnum.READ,
                  },
                  () => this.showEditView(),
                );
              }
            }}
          >
            只读
          </Button>
        </div>

        <DemoDetailForm
          type={this.state.editType}
          initData={this.state.initData}
          getInstance={target => {
            this.editView = target as DemoDetail;
          }}
        />
      </Card>
    );
  }
}

class DemoDetail extends DetailModal<any> {
  protected get modalProps() {
    const initData = this.props.initData;
    return {
      title: initData ? '编辑窗口' : '新建窗口',
    };
  }

  protected async getReuqestData(initData: any) {
    return initData;
  }

  protected renderItems = (
    instance: DetailViewClass<any>,
    initData: any,
    serverData: any,
  ): ReactNode => {
    const data = serverData || initData || {};
    const { getFieldDecorator } = instance.props.form;
    const disabled = this.type === DetailViewTypeEnum.READ;
    return AntdUtil.renderFormItems(
      [
        {
          label: 'aaa',
          content: getFieldDecorator('v1', {
            initialValue: initData ? initData.x : data.x,
            rules: [{ required: true }],
          })(<Input disabled={disabled} />),
        },
        {
          label: 'bbbb',
          content: getFieldDecorator('v2', { initialValue: data.y })(<Input disabled={disabled} />),
        },
        {
          label: 'cc',
          content: getFieldDecorator('v3', { initialValue: data.z })(<Input disabled={disabled} />),
          span: 24,
          formLabelSpan: 3,
        },
      ],
      12,
      6,
    );
  };
}

const DemoDetailForm = (Form.create()(DemoDetail) as any) as <T>(
  props: IDetailModalProps<T>,
) => any;

export default DetailModelPage;
