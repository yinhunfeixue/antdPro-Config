import IComponentProps from '@/base/interfaces/IComponentProps';
import React, { PureComponent, ReactNode } from 'react';

interface IFormImgState {}
interface IFormImgProps extends IComponentProps {
  value?: string;
}

class FormImg extends PureComponent<IFormImgProps, IFormImgState> {
  public render(): ReactNode {
    return <img src={this.props.value} />;
  }
}

export default FormImg;
