import { Select } from 'antd';

class HSelect extends Select {
  public static defaultProps = Object.assign({}, Select.defaultProps, {
    allowClear: true,
  });
}

export default HSelect;
