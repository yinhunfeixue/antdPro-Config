import FormTable from '@/base/components/FormTable/FormTable';
import IPageProps from '@/base/interfaces/IPageProps';
import Axios from 'axios';
import React, { Component, ReactNode } from 'react';

interface IDemoFormTableSate {}

class DemoFormTable extends Component<IPageProps, IDemoFormTableSate> {
  public render(): ReactNode {
    return (
      <div>
        <FormTable<IDemoData>
          itemList={[
            {
              field: 'id',
              type: String,
              isKey: true,
              formProps: {
                hideInForm: true,
              },
            },
            {
              field: 'name',
              label: '姓名',
              type: String,
              displayInTable: true,
              formProps: {
                required: true,
                disableEdit: true,
              },
            },
            {
              field: 'age',
              label: '年龄',
              type: Number,
              displayInTable: true,
              formProps: {},
            },
            {
              field: 'createTime',
              label: '创建时间',
              type: Date,
              displayInTable: true,
              formProps: {
                span: 24,
                labelSpan: 3,
              },
            },
            {
              field: 'remark',
              label: '备注',
              type: String,
              formProps: {},
            },
          ]}
          getListFunction={async (currentPage: number) => {
            await Axios.get('.');
            return {
              dataSource: [
                {
                  id: 1,
                  name: `a${currentPage}`,
                  age: currentPage * 1,
                  createTime: '2019-1-1',
                },
                {
                  id: 2,
                  name: `b${currentPage}`,
                  age: currentPage * 2,
                },
              ],
              total: 34,
            };
          }}
          deleteFunction={() => {
            return Axios.delete('.');
          }}
          getFunction={() => {
            return Axios.get('.');
          }}
          updateFunction={() => {
            return Axios.put('.');
          }}
        />
      </div>
    );
  }
}

interface IDemoData {
  id: number;
  name: string;
  age: number;
}

export default DemoFormTable;
