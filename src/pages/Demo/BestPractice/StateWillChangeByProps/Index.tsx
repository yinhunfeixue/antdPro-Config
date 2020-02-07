import IComponentProps from '@/base/interfaces/IComponentProps';
import ChangeName from '@/pages/Demo/BestPractice/StateWillChangeByProps/ChangeName';
import { Card } from 'antd';
import React, { Component, ReactNode } from 'react';

interface IStateWillChangeByPropsState {
  userList: IUserData[];
  selectedUserID?: string;
}
interface IStateWillChangeByPropsProps extends IComponentProps {}

class StateWillChangeByProps extends Component<
  IStateWillChangeByPropsProps,
  IStateWillChangeByPropsState
> {
  constructor(props: IStateWillChangeByPropsProps) {
    super(props);
    this.state = {
      userList: [
        {
          id: '1',
          name: 'aaaaa',
        },
        {
          id: '2',
          name: 'bbbbbbb',
        },
        {
          id: '3',
          name: 'cccc',
        },
      ],
    };
  }

  private getSelectedUser() {
    const { userList, selectedUserID } = this.state;
    if (selectedUserID) {
      return userList.find(item => item.id === selectedUserID);
    }
    return;
  }

  public render(): ReactNode {
    const { userList, selectedUserID } = this.state;
    const selectedUser = this.getSelectedUser();
    return (
      <Card title="state中的值受外部影响，也受内部影响">
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 20 }}>
            {userList.map(item => {
              const selected = selectedUserID === item.id;
              return (
                <div
                  key={item.id}
                  style={{ padding: '10px 15px', background: selected ? '#aaa' : '#fff' }}
                  onClick={() => {
                    this.setState({ selectedUserID: item.id });
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <ChangeName
            disabled={selectedUser === undefined}
            name={selectedUser ? selectedUser.name : ''}
            onPressEnter={(value: string) => {
              if (selectedUser) {
                selectedUser.name = value;
                this.forceUpdate();
              }
            }}
          />
        </div>
      </Card>
    );
  }
}

export default StateWillChangeByProps;
