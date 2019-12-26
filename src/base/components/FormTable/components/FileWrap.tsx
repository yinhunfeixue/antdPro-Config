import ComponentWrap from '@/base/components/FormTable/components/ComponentWrap';
import LimitUpload, { UploadType } from '@/base/components/FormTable/LimitUpload';
import React, { ReactNode } from 'react';

class FileWrap extends ComponentWrap {
  private maxNumber?: number;
  private chooserRender?: () => ReactNode;

  /**
   * 实例化
   * @param type 上传类型
   * @param maxNumber 最大上传数量
   * @param chooserRender 文件选择元素的渲染方法
   */
  constructor(type?: UploadType, maxNumber: number = 0, chooserRender?: () => ReactNode) {
    super(type);
    this.maxNumber = maxNumber;
    this.chooserRender = chooserRender;
  }

  render() {
    const { type, disabled, maxNumber, chooserRender } = this;
    return (
      <LimitUpload
        maxNumber={maxNumber}
        type={type as any}
        disabled={disabled}
        chooserRender={chooserRender}
      />
    );
  }
}

export default FileWrap;
