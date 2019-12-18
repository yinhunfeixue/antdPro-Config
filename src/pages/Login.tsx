import IComponentProps from '@/base/interfaces/IComponentProps';
import IForm from '@/base/interfaces/IForm';
import '@/base/style/Theme.less';
import { Button, Form, Input } from 'antd';
import React, { Component, ReactNode } from 'react';
import styles from './Login.less';

interface ILoginState {}
interface ILoginProps extends IComponentProps, IForm {}

class Login extends Component<ILoginProps, ILoginState> {
  public render(): ReactNode {
    return (
      <div className={styles.Login}>
        <div className={styles.Bg} />
        <main>
          <img className={styles.Logo} src={require('@/assets/login/logo.png')} />
          <Input />
          <Input />
          <Button type="primary" block size="large">
            登录
          </Button>
        </main>
      </div>
    );
  }
}

export default Form.create()(Login);
