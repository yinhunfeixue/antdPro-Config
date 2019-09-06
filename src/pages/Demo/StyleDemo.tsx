import IPageProps from '@/base/interfaces/IPageProps';
import { Button, Input } from 'antd';
import React, { Component, ReactNode } from 'react';

interface IStyleDemoSate {}

class StyleDemo extends Component<IPageProps, IStyleDemoSate> {
  public render(): ReactNode {
    return (
      <div className="Area VControlgroup">
        <div className="HControlgroup">
          <Button>按钮</Button>
          <Button disabled>按钮-禁用</Button>
        </div>

        <div className="HControlgroup">
          <Input placeholder="这里是提示" />
          <Input disabled />
        </div>
      </div>
    );
  }
}

export default StyleDemo;
