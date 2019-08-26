import React, { Component, ReactElement } from 'react';
import IPageProps from '@/base/interfaces/IPageProps';
import { Select } from 'antd';
import AntdUtil from '@/base/utils/AntdUtil';

interface IRenderSelectOptionSate {}

class RenderSelectOption extends Component<IPageProps, IRenderSelectOptionSate> {
  public render(): ReactElement {
    return (
      <div>
        <h1>文本===值</h1>
        <Select>{AntdUtil.renderSelectOptions([1, 2, 3])}</Select>

        <h1>文本 !== 值</h1>
        <Select>
          {AntdUtil.renderSelectOptions(
            [{ label: 'a', value: 1 }, { label: 'b', value: 2 }],
            item => item.label,
            item => item.value,
          )}
        </Select>

        <h1>格式化文本</h1>
        <Select>
          {AntdUtil.renderSelectOptions(
            [{ label: 'a', value: 1 }, { label: 'b', value: 2 }],
            (item, index) => `第${index + 1}项: ${item.label}`,
            item => item.value,
          )}
        </Select>
      </div>
    );
  }
}

export default RenderSelectOption;
