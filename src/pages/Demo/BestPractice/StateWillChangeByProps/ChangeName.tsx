import IComponentProps from '@/base/interfaces/IComponentProps';
import { Input } from 'antd';
import Lodash from 'lodash';
import React, { Component, ReactNode } from 'react';

interface IChangeNameState {
  name: string;
}
interface IChangeNameProps extends IComponentProps {
  name: string;
  disabled: boolean;
  onPressEnter: (value: string) => void;
}

class ChangeName extends Component<IChangeNameProps, IChangeNameState> {
  constructor(props: IChangeNameProps) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.updateName();
  }

  componentDidUpdate(prevProps: IChangeNameProps, prevState: IChangeNameState) {
    if (!Lodash.isEqual(this.props.name, prevProps.name)) {
      this.updateName();
    }
  }

  private updateName() {
    this.setState({ name: this.props.name });
  }

  public render(): ReactNode {
    const { name } = this.state;
    const { onPressEnter, disabled } = this.props;
    return (
      <div>
        <Input
          disabled={disabled}
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
          onPressEnter={() => {
            onPressEnter(name);
          }}
          placeholder="输入新的名称，按回车保存"
        />
      </div>
    );
  }
}

export default ChangeName;
