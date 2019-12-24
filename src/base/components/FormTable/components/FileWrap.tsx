import ComponentWrap from '@/base/components/FormTable/components/ComponentWrap';
import FormTableControlEnum from '@/base/components/FormTable/FormTableControlEnum';
import { Button, Icon, Upload } from 'antd';
import React from 'react';

class FileWrap extends ComponentWrap {
  render() {
    const { type, disabled } = this;
    switch (type) {
      case FormTableControlEnum.FileImage:
        return (
          <Upload disabled={disabled} listType="picture-card">
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
          </Upload>
        );
      default:
        return (
          <Upload disabled={disabled}>
            <Button disabled={disabled}>Upload</Button>
          </Upload>
        );
    }
  }
}

export default FileWrap;
