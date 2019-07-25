import { Cascader } from 'antd';

class HCascader extends Cascader {
  public static defaultProps = Object.assign({}, Cascader.defaultProp, {
    placeholder: '请选择',
    allowClear: true,
  });
}

export default HCascader;
