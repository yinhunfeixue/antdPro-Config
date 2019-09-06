import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IForm from '@/base/interfaces/IForm';
import { Form, Spin } from 'antd';
import Axios from 'axios';
import React, { Component, ReactNode } from 'react';

class DetailView extends Component<IDetailViewProps & IForm, IDetailViewState> {
  public constructor(props: IDetailViewProps & IForm) {
    super(props);
    this.state = {
      serverData: null,
      loading: false,
    };
  }

  public componentDidMount(): void {
    // 如果是编辑模式，则先获取数据
    if (
      this.props.type === DetailViewTypeEnum.READ ||
      this.props.type === DetailViewTypeEnum.UPDATE
    ) {
      this.getData();
    }
  }

  private aaa(a: string = '11') {
    console.log(a);
  }

  private getData() {
    const { getRequestData, parseServerData } = this.props;
    if (getRequestData && parseServerData) {
      this.setState({ loading: true });
      const data = getRequestData(this.props.initData);
      Axios.request(data).then(res => {
        this.setState({ serverData: parseServerData(res), loading: false });
      });
    }
  }

  /**
   * 保存数据
   */
  public saveData(successHandler: (res: any) => void, errorHandler?: (error: any) => void) {
    const { initData, updateRequestData, addRequestData } = this.props;
    const { validateFields } = this.props.form;

    validateFields((errors, values) => {
      if (!errors) {
        // 如果有初始数据，表示编辑；没有表示新增
        let requestData: any = null;
        if (initData) {
          if (updateRequestData) {
            requestData = updateRequestData(this.props.initData, values);
          }
        } else if (addRequestData) {
          requestData = addRequestData(this.props.initData, values);
        }

        this.setState({ loading: true });
        Axios.request(requestData)
          .then(() => {
            this.setState({ loading: false });
          })
          .then(res => {
            if (successHandler) {
              successHandler(res);
            }
          })
          .catch(error => {
            if (errorHandler) {
              errorHandler(error);
            }
          });
      }
    });
  }

  public render(): ReactNode {
    return (
      <Spin spinning={this.state.loading}>
        {this.props.renderForm &&
          this.props.renderForm(this, this.props.initData, this.state.serverData)}
        {this.props.renderControls && this.props.renderControls(this)}
      </Spin>
    );
  }
}
interface IDetailViewProps {
  /**
   * 源数据，编辑、查看时，需要赋值
   */
  initData?: any;

  /**
   * 获取完整数据的方法
   *
   * @param initData 源数据
   */
  getRequestData?: (initData: any) => any;

  /**
   * 解析从服务器获取的数据
   *
   * @param response 服务器响应的数据
   */
  parseServerData?: (response: any) => any;

  /**
   * 新增的方法
   *
   * @param data 新增的数据
   */
  addRequestData?: (initData: any, clientData: any) => any;

  /**
   * 更新数据的方法
   * @param initData 源数据
   * @param newData 新数据
   */
  updateRequestData?: (initData: any, newData: any) => any;

  /**
   * 窗口类型
   */
  type: DetailViewTypeEnum;

  /**
   * 渲染表格项
   * @param instance DetailView实例，其中instance.props.form可获取表单实例
   * @param initData 通过props传入的初始数据
   * @param serverData 通过getRequestData获取且通过parseServerData解析后返回的数据
   */
  renderForm?: (instance: DetailView, initData: any, serverData: any) => ReactNode;

  renderControls?: (instance: DetailView) => ReactNode;
}

interface IDetailViewState {
  serverData: any;
  loading: boolean;
}

export default (Form.create()(DetailView) as any) as (props: IDetailViewProps) => any;

export { DetailView as DetailViewClass };
