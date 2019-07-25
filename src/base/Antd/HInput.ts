import { Input } from 'antd';

class HInput extends Input {
  public static defaultProps = Object.assign({}, Input.defaultProps, {
    allowClear: true,
    maxLength: 50,
  });
}

export default HInput;
