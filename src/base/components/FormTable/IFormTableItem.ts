export default interface IFormTableItem {
  /**
   * 属性名称
   */
  field: string;

  /**
   * 数据类型
   */
  type: NumberConstructor | StringConstructor | DateConstructor;

  /**
   * 显示的标签名称
   */
  label?: string;

  /**
   * 是否是标识符
   */
  isKey?: boolean;

  /**
   * 是否必填
   */
  required?: boolean;

  /**
   * 是否不可编辑
   */
  disableEdit?: boolean;

  /**
   * 是否在表格中显示
   */
  displayInTable?: boolean;
}
