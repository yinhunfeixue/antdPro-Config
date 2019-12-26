import ArrayWrap from '@/base/components/FormTable/components/ArrayWrap';
import StringWrap from '@/base/components/FormTable/components/StringWrap';
import FormTable from '@/base/components/FormTable/FormTable';
import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import FormTableTypeEnum from '@/base/components/FormTable/FormTableTypeEnum';
import IPageProps from '@/base/interfaces/IPageProps';
import { Button } from 'antd';
import Axios from 'axios';
import React, { Component, ReactNode } from 'react';

interface IDemoFormTableSate {}

class DemoFormTable extends Component<IPageProps, IDemoFormTableSate> {
  public render(): ReactNode {
    return (
      <FormTable<IDemoData>
        editColumnRender={(text, record, index, defaultRender) => {
          return (
            <>
              <Button>额外的操作</Button>
              {defaultRender(record)}
              <Button>额外的操作2</Button>
            </>
          );
        }}
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
            render: (text, record) => {
              return record.enable ? '是' : <span style={{ color: '#ff0000' }}>否</span>;
            },
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
            formProps: {
              componentWrap: new StringWrap(FormTableControlEnum.Image),
            },
          },
          {
            field: 'createTime',
            label: '创建时间',
            type: FormTableTypeEnum.Date,
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
              disableEdit: true,
              componentWrap: new ArrayWrap(['杀人', '放火', '装逼'], FormTableControlEnum.Checkbox),
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
          const dataSource = [];
          for (let i = 0; i < 30; i++) {
            dataSource.push({
              id: i,
              name: `a${currentPage}`,
              age: currentPage * i,
              createTime: new Date().toUTCString(),
              enable: true,
              diedTime: [new Date().toUTCString(), new Date().toUTCString()],
              sex: 1,
              photo:
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=664782282,1142354879&fm=15&gp=0.jpg',
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
            });
          }
          return {
            dataSource,
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
  photo?: string;
}

export default DemoFormTable;
