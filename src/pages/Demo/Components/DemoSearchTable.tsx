import React, { Component, ReactElement, ReactNode } from 'react';
import IComponentProps from '@/base/interfaces/IComponentProps';
import SearchTable from '@/base/components/SearchTable/SearchTable';
import HInput from '@/base/Antd/HInput';
import AntdUtil from '@/base/utils/AntdUtil';
import HRangePicker from '@/base/Antd/HRangePicker';
import HSelect from '@/base/Antd/HSelect';
import IFormItemData from '@/base/interfaces/IFormItemData';
import { InputNumber, Card } from 'antd';
import FormRefreshButton from '@/base/components/SearchTable/FormRefreshButton';
import IForm from '@/base/interfaces/IForm';
import ProjectUtil from '@/utils/ProjectUtil';
import FormResetButton from '@/base/components/SearchTable/FormResetButton';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IDemoSearchTableState {}
interface IDemoSearchTableProps extends IComponentProps {}

class DemoSearchTableComponent extends Component<IDemoSearchTableProps, IDemoSearchTableState> {
  public render(): ReactElement {
    return (
      <PageHeaderWrapper>
        <Card>
          <SearchTable
            rowKey="label"
            formLayout="horizontal"
            searchCreater={(values: any, pageSize: number, current: number): any => {
              return `/?pageSize=${pageSize}&current=${current}${ProjectUtil.createSearchString(
                values,
              )}`;
            }}
            columns={[
              {
                title: 'testTitle',
                dataIndex: 'label',
              },
            ]}
            formClass={SearchForm}
            parseResponse={() => {
              return {
                total: 34,
                data: [
                  {
                    label: '1',
                  },
                  {
                    label: '2',
                  },
                  {
                    label: '3',
                  },
                ],
              };
            }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

class SearchForm extends Component<IForm, any> {
  public render(): ReactNode {
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
        span: 24,
        formLabelSpan: 3,
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
        content: (
          <div>
            <FormRefreshButton />
            <FormResetButton />
          </div>
        ),
      },
    ];

    return AntdUtil.renderFormItems(formItems, 8, 9);
  }
}

export default DemoSearchTableComponent;
