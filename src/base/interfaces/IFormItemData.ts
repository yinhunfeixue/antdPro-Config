import { ReactNode } from 'react';

export default interface IFormItemData {
  /**
   * 标签
   */
  label?: string;
  /**
   * 内容
   */
  content: ReactNode;

  /**
   * 占用的列宽，无值表示不使用列
   */
  span?: number;

  formLabelSpan?: number;

  formItemProps?: any;
}
