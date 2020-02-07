import IComponentProps from '@/base/interfaces/IComponentProps';
import { fillUserData, IUserData } from '@/pages/Demo/BestPractice/IUserData';
import EditModal from '@/pages/Demo/BestPractice/ResetForReuse/EditModal';
import { Button, Card } from 'antd';
import React, { Component, ReactNode } from 'react';

interface IIndexState {
  userList: IUserData[];
  selectedUserID?: string;
}
interface IIndexProps extends IComponentProps {}

class Index extends Component<IIndexProps, IIndexState> {
  private editModal: EditModal | null = null;

  constructor(props: IIndexProps) {
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

  private editItem(id?: string) {
    this.setState({ selectedUserID: id }, () => {
      if (this.editModal) {
        this.editModal.show();
      }
    });
  }

  public render(): ReactNode {
    const { userList, selectedUserID } = this.state;
    const selectedUser = this.getSelectedUser();
    return (
      <Card title="窗口打开时，重置数据">
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 20 }}>
            <Button onClick={() => this.editItem()}>新建</Button>
            {userList.map(item => {
              const selected = selectedUserID === item.id;
              return (
                <div
                  key={item.id}
                  style={{ padding: '10px 15px', background: selected ? '#aaa' : '#fff' }}
                  onClick={() => this.editItem(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <EditModal
            ref={target => {
              this.editModal = target;
            }}
            sourceData={selectedUser}
            onSuccess={(data: IUserData) => {
              if (selectedUser) {
                fillUserData(selectedUser, data);
              } else {
                this.state.userList.push(data);
              }
              this.forceUpdate();
            }}
          />
        </div>
      </Card>
    );
  }
}

export default Index;
