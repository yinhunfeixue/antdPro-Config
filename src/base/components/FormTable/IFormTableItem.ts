import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { RadioGroupProps } from 'antd/lib/radio';
import { SelectProps } from 'antd/lib/select';
import FormTableTypeEnum from './FormTableTypeEnum';
export default interface IFormTableItem<T> {
  /**
   * 属性名称
   */
  field: string;

  /**
   * 数据类型，默认为FormTableTypeEnum.String
   */
  type?: FormTableTypeEnum;

  /**
   * 显示的标签名称
   */
  label?: string;

  /**
   * 是否是标识符
   */
  isKey?: boolean;

  /**
   * 是否在表格中显示
   */
  displayInTable?: boolean;

  render?: (text: any, record: T, index: number) => React.ReactNode;

  formProps?: {
    /**
     * 不在表单中显示
     */
    hideInForm?: boolean;

    /**
     * 是否禁止编辑
     */
    disableEdit?: boolean;

    /**
     * 是否必填
     */
    required?: boolean;

    /**
     * 在表单中占的列数
     */
    span?: number;

    labelSpan?: number;

    /**
     * 指定的控件类型，如果未指定，则根据type自动创建，规则为
     * + String--Input
     * + Number--InputNumber
     * + Date--DatePicker
     * + File--File
     * + Array--Select
     * + DataArray--RangePicker
     * + Boolean--Switch
     * + Tree--Tree
     */
    controlType?: FormTableControlEnum | string;

    controlProps?: RadioGroupProps | CheckboxGroupProps | SelectProps;
  };
}
