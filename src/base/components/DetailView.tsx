import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IForm from '@/base/interfaces/IForm';
import { Spin } from 'antd';
import Form from 'antd/lib/form';
import React, { Component, ReactElement, ReactNode } from 'react';

class DetailView<T> extends Component<IDetailViewProps<T> & IForm, IDetailViewState<T>> {
  public constructor(props: IDetailViewProps<T> & IForm) {
    super(props);
    this.state = {
      serverData: undefined,
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

  private async getData() {
    const { getFunction, initData } = this.props;
    if (getFunction && initData) {
      this.setState({ loading: true });
      const data = await getFunction(initData);
      this.setState({ serverData: data, loading: false });
    }
  }

  /**
   * 保存数据
   */
  public async saveData(successHandler: (res: any) => void, errorHandler?: (error: any) => void) {
    const { initData, updateFunction, addFunction } = this.props;
    const { validateFields } = this.props.form;

    validateFields(async (errors, values) => {
      if (!errors) {
        try {
          this.setState({ loading: true });
          // 如果有初始数据，表示编辑；没有表示新增
          let res = null;
          if (initData) {
            if (updateFunction) {
              res = await updateFunction(initData, values);
            }
          } else if (addFunction) {
            res = await addFunction(values);
          }
          successHandler(res);
        } catch (error) {
          if (errorHandler) {
            errorHandler(error);
          }
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  public render(): ReactNode {
    const { initData } = this.props;
    return (
      <Spin spinning={this.state.loading}>
        {this.props.renderForm && this.props.renderForm(this, initData, this.state.serverData)}
        {this.props.renderControls && this.props.renderControls(this)}
      </Spin>
    );
  }
}
interface IDetailViewProps<T> {
  /**
   * 源数据，编辑、查看时，需要赋值
   */
  initData?: T;

  /**
   * 获取完整数据的方法
   *
   * @param initData 源数据
   */
  getFunction?: (initData: T) => Promise<T | null>;

  /**
   * 新增的方法
   *
   * @param clientData 初始数据
   */
  addFunction?: (clientData: T) => Promise<any>;

  /**
   * 更新数据的方法
   * @param initData 源数据
   * @param newData 新数据
   */
  updateFunction?: (initData: T, newData: T) => Promise<any>;

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
  renderForm?: (instance: DetailView<T>, initData?: T, serverData?: T) => ReactNode;

  renderControls?: (instance: DetailView<T>) => ReactNode;
}

interface IDetailViewState<T> {
  serverData?: T;
  loading: boolean;
}

export { DetailView as DetailViewClass };

export default (Form.create()(DetailView) as any) as <T>(
  props: IDetailViewProps<T>,
) => ReactElement;
