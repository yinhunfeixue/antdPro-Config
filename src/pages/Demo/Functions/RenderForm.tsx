import React, { Component, ReactElement, ReactNode } from 'react';
import IPageProps from '@/base/interfaces/IPageProps';
import { InputNumber, Form, Button, Card } from 'antd';
import HRangePicker from '@/base/Antd/HRangePicker';
import AntdUtil from '@/base/utils/AntdUtil';
import HSelect from '@/base/Antd/HSelect';
import HInput from '@/base/Antd/HInput';
import IFormItemData from '@/base/interfaces/IFormItemData';

interface IRenderFormSate {}

class RenderForm extends Component<IPageProps, IRenderFormSate> {
  private renderGlobal(): ReactNode {
    const formItems: IFormItemData[] = [
      {
        label: 'aa',
        content: this.props.form.getFieldDecorator('aa')(<HInput />),
      },
      {
        label: 'bbbb',
        content: <HInput />,
      },
      {
        label: 'ccccc',
        content: <HInput />,
      },
      {
        label: 'eeeeee',
        content: <HRangePicker />,
      },
      {
        label: 'cccccc',
        content: <HSelect>{AntdUtil.renderSelectOptions([1, 2, 3])}</HSelect>,
      },
      {
        label: 'ddddddd',
        content: <HRangePicker />,
      },
      {
        label: 'ddddddd',
        content: <InputNumber />,
      },
    ];

    return (
      <Card title="全局设置">
        <Form>{AntdUtil.renderFormItems(formItems, 8, 6)}</Form>
      </Card>
    );
  }

  private renderSingleSetting(): ReactNode {
    const formItems: IFormItemData[] = [
      {
        label: 'aa',
        content: this.props.form.getFieldDecorator('aa')(<HInput />),
      },
      {
        label: 'bbbb',
        content: <HInput />,
      },
      {
        label: 'ccccc',
        content: <HInput />,
      },
      {
        label: '我单独占一行',
        content: <HRangePicker />,
        span: 24,
        formLabelSpan: 2,
      },
      {
        label: 'cccccc',
        content: <HSelect>{AntdUtil.renderSelectOptions([1, 2, 3])}</HSelect>,
      },
      {
        label: 'ddddddd',
        content: <HRangePicker />,
      },
      {
        label: 'ddddddd',
        content: <InputNumber />,
      },
    ];

    return (
      <Card title="单独设置（以第4项为例）">
        <Form>{AntdUtil.renderFormItems(formItems, 8, 6)}</Form>
      </Card>
    );
  }

  private renderOffset(): ReactNode {
    const formItems: IFormItemData[] = [
      {
        label: 'aa',
        content: this.props.form.getFieldDecorator('aa')(<HInput />),
      },
      {
        label: 'bbbb',
        content: <HInput />,
      },
      {
        label: 'ccccc',
        content: <HInput />,
      },
      {
        label: 'eee',
        content: <HRangePicker />,
        span: 24,
        formLabelSpan: 2,
      },
      {
        label: 'cccccc',
        content: <HSelect>{AntdUtil.renderSelectOptions([1, 2, 3])}</HSelect>,
      },
      {
        label: 'ddddddd',
        content: <HRangePicker />,
      },
      {
        label: 'ddddddd',
        content: <InputNumber />,
      },
      {
        content: <Button>自动设置偏移量: 无label，无span, 自动和其它内容对齐</Button>,
      },
      {
        content: <Button>手动设置偏移： 无labe, 有span, 偏移量=span</Button>,
        span: 10,
      },
    ];

    return (
      <Card title="内容偏移（两个按钮）">
        <Form>{AntdUtil.renderFormItems(formItems, 8, 6)}</Form>
      </Card>
    );
  }

  private renderInline(): ReactNode {
    const formItems: IFormItemData[] = [
      {
        label: 'aa',
        content: this.props.form.getFieldDecorator('aa')(<HInput />),
      },
      {
        label: 'bbbb',
        content: <HInput />,
      },
      {
        label: 'ccccc',
        content: <HInput />,
      },
      {
        label: 'eee',
        content: <HRangePicker />,
      },
    ];

    return (
      <Card title="Inline">
        <Form layout="inline">{AntdUtil.renderFormItems(formItems)}</Form>
      </Card>
    );
  }

  public render(): ReactElement {
    return (
      <div>
        {this.renderGlobal()}
        {this.renderSingleSetting()}
        {this.renderOffset()}
        {this.renderInline()}
      </div>
    );
  }
}

export default Form.create()(RenderForm);
