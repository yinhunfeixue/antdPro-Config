import ArrayWrap from '@/base/components/FormTable/components/ArrayWrap';
import FormTable from '@/base/components/FormTable/FormTable';
import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import FormTableTypeEnum from '@/base/components/FormTable/FormTableTypeEnum';
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
              isKey: true,
              formProps: {
                hideInForm: true,
              },
            },
            {
              field: 'name',
              label: '姓名',
              displayInTable: true,
              formProps: {
                required: true,
                disableEdit: true,
              },
            },
            {
              field: 'enable',
              label: '启用',
              type: FormTableTypeEnum.Boolean,
              displayInTable: true,
            },
            {
              field: 'age',
              label: '年龄',
              type: FormTableTypeEnum.Number,
              displayInTable: true,
            },
            {
              field: 'sex',
              label: '性别',
              type: FormTableTypeEnum.Array,
              displayInTable: true,
              render: (text: any, record: IDemoData, index: number) => {
                return record.sex === 1 ? '男' : '女';
              },
              formProps: {
                componentWrap: new ArrayWrap(
                  [
                    {
                      value: 1,
                      label: '男',
                    },
                    {
                      value: 2,
                      label: '女',
                    },
                  ],
                  FormTableControlEnum.Radio,
                ),
              },
            },
            {
              field: 'photo',
              label: '头像',
              type: FormTableTypeEnum.File,
            },
            {
              field: 'createTime',
              label: '创建时间',
              type: FormTableTypeEnum.Date,
              displayInTable: true,
              formProps: {
                span: 24,
                labelSpan: 3,
              },
            },
            {
              field: 'skills',
              label: '技能',
              type: FormTableTypeEnum.Array,
              formProps: {
                componentWrap: new ArrayWrap(
                  ['杀人', '放火', '装逼'],
                  FormTableControlEnum.Checkbox,
                ),
              },
            },
            {
              field: 'work',
              label: '职业',
              type: FormTableTypeEnum.Array,
              formProps: {
                componentWrap: new ArrayWrap(['杀人', '放火', '装逼']),
              },
            },
            {
              field: 'diedTime',
              label: '预计死亡时间',
              type: FormTableTypeEnum.DateArray,
              displayInTable: true,
            },
            {
              field: 'remark',
              label: '备注',
            },
            {
              field: 'att',
              label: '附件',
              type: FormTableTypeEnum.File,
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
                  createTime: new Date().toUTCString(),
                  enable: true,
                  diedTime: [new Date().toUTCString(), new Date().toUTCString()],
                  sex: 2,
                  att: [
                    {
                      uid: '1',
                      name: 'xxx.png',
                      status: 'done',
                      response: 'Server Error 500', // custom error message to show
                      url: 'http://www.baidu.com/xxx.png',
                    },
                  ],
                  skills: ['杀人', '放火'],
                  work: '放火',
                },
                {
                  id: 2,
                  name: `b${currentPage}`,
                  age: currentPage * 2,
                  createTime: new Date().toUTCString(),
                  sex: 2,
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
  age?: number;
  createTime: string;
  enable?: boolean;
  sex?: number;
  /**
   * 预计死亡时间
   */
  diedTime?: string[];
  att?: any[];
  /**
   * 工作技能
   */
  skills?: string[];
  work?: string;
}

export default DemoFormTable;
