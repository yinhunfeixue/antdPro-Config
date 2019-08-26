import React, { Component, ReactElement } from 'react';
import IPageProps from '@/base/interfaces/IPageProps';
import AntdUtil from '@/base/utils/AntdUtil';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IRenderTreeSate {}

interface ITreeItemData {
  id: string;
  label: string;
  children?: ITreeItemData[];
}

class RenderTree extends Component<IPageProps, IRenderTreeSate> {
  private treeData: ITreeItemData[] = [
    {
      id: '1',
      label: 'a',
      children: [
        {
          id: '11',
          label: 'aa',
          children: [
            {
              id: '111',
              label: 'aaa',
            },
          ],
        },
        {
          id: '12',
          label: 'aa2',
        },
        {
          id: '13',
          label: 'aa3',
        },
      ],
    },
    {
      id: '2',
      label: 'b',
    },
  ];
  public render(): ReactElement {
    return (
      <PageHeaderWrapper>
        {AntdUtil.rendeTree(
          this.treeData,
          (item: ITreeItemData) => ({
            key: item.id,
            value: item.id,
            title: item.label,
          }),
          (item: ITreeItemData) => item.children,
          { showLine: true },
        )}
      </PageHeaderWrapper>
    );
  }
}

export default RenderTree;
