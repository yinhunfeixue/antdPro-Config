import FormTableEditModal from '@/base/components/FormTable/FormTableEditModal';
import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IComponentProps from '@/base/interfaces/IComponentProps';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import classnames from 'classnames';
import React, { Component, CSSProperties, ReactNode } from 'react';
import styles from './FormTable.less';

interface IFormTableState<T> {
  /**
   * 表格列
   */
  tableColumns: ColumnProps<any>[];

  /**
   * 主键
   */
  tableKey: string;

  tableData: T[];

  tableTotal: number;

  tableCurrentPage: number;

  requestListLoading: boolean;
  deleteLoading: boolean;

  /**** 弹窗相关 *****/
  modalVisible: boolean;
  modalType?: DetailViewTypeEnum;
  selectedRecord?: T;

  /**
   * 表单一行有几列
   */
  columnCount?: number;

  labelSpan?: number;

  modalWidth?: number;
}
interface IFormTableProps<T> extends IComponentProps {
  /**
   * 数据描述列表
   */
  itemList: IFormTableItem<T>[];

  /**
   * 获取列表的方法
   */
  getListFunction: (
    currentPage: number,
  ) => Promise<{
    dataSource: T[];
    total: number;
  }>;

  /**
   * 获取一项的完整的数据的方法
   */
  getFunction?: (record: T) => Promise<T>;

  /**
   * 添加数据的方法
   */
  addFunction?: (record: T) => Promise<void>;

  /**
   * 修改数据的方法
   */
  updateFunction?: (record: T) => Promise<void>;

  /**
   * 删除一项数据的方法
   */
  deleteFunction?: (record: T) => Promise<void>;

  /**
   * 删除多条数据的方法
   */
  deleteListFunction?: (recordList: any[]) => Promise<void>;

  /**
   * 渲染编辑列，如果不设置，则使用默认规则，规则为
   * + 如果设置了`getFunction`且`showLook=true`，生成查看按钮
   * + 如果设置了`getFunction` 和 `updateFunction`，生成编辑按钮
   * + 如果设置了`deleteFunction`，生成删除按钮
   *
   * @param text 数据默认的文本
   * @param record 数据项
   * @param index 数据所在行号，从0开始
   * @param defaultRender 默认的渲染函数，如果需要按默认规则渲染，但又需要增加其它操作，可调用`defaultRender(record)`生成默认操作元素并插入到其它元素中间
   */
  editColumnRender?: (
    text: string,
    record: T,
    index: number,
    defaultRender: (record: T) => ReactNode,
  ) => ReactNode;

  /**
   * 是否显示查看
   */
  showLook?: boolean;

  showQuickJumper?: boolean;

  showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | undefined;

  /**
   * 表格的样式名
   */
  tableClassName?: string;

  /**
   * 表格的样式
   */
  tableStyle?: CSSProperties;
}

class FormTable<T> extends Component<IFormTableProps<T>, IFormTableState<T>> {
  constructor(props: IFormTableProps<T>) {
    super(props);
    this.state = {
      tableColumns: [],
      tableKey: '',
      tableData: [],
      tableTotal: 0,
      tableCurrentPage: 1,
      requestListLoading: false,
      deleteLoading: false,
      modalVisible: false,
      selectedRecord: undefined,
    };
  }

  componentDidMount() {
    this.updateTableColumns();
    this.updateTableKey();
    this.requestList();
  }

  async requestList() {
    const { tableCurrentPage } = this.state;
    const { getListFunction } = this.props;

    this.setState({ requestListLoading: true });
    const res = await getListFunction(tableCurrentPage);

    this.setState({
      tableData: res.dataSource,
      tableTotal: res.total,
      requestListLoading: false,
    });
  }

  componentDidUpdate(prevProps: IFormTableProps<T>) {
    if (prevProps.itemList !== this.props.itemList) {
      this.updateTableColumns();
      this.updateTableKey();
    }
  }

  private updateTableColumns(): void {
    const { itemList, editColumnRender } = this.props;
    let result: ColumnProps<any>[] = [];

    // 获取要显示的列
    if (itemList) {
      result = itemList
        .filter(item => item.displayInTable)
        .map(item => ({
          title: item.label,
          dataIndex: item.field,
          render: item.render,
        }));
    }
    // 渲染操作列
    let editColumn: any = null;
    if (editColumnRender) {
      editColumn = {
        render: (text: any, record: T, index: number) => {
          return editColumnRender(text, record, index, this.defaultEditColumnsRender);
        },
      };
    } else {
      editColumn = {
        render: (text: any, record: T, index: number) => {
          return this.defaultEditColumnsRender(record);
        },
      };
    }
    if (editColumn) {
      editColumn.className = styles.EditColumn;
    }
    result.push(editColumn);
    this.setState({ tableColumns: result });
  }

  private defaultEditColumnsRender = (record: T): ReactNode => {
    const { getFunction, updateFunction, deleteFunction, showLook } = this.props;
    const { deleteLoading } = this.state;
    /**
     * + 如果设置了getFunction，生成查看按钮
     * + 如果设置了getFunction 和 updateFunction，生成编辑按钮
     * + 如果设置了deleteFunction，生成删除按钮
     */
    return (
      <React.Fragment>
        {getFunction && showLook && (
          <Button
            type="link"
            onClick={() => {
              this.setState({
                modalVisible: true,
                selectedRecord: record,
                modalType: DetailViewTypeEnum.READ,
              });
            }}
          >
            查看
          </Button>
        )}
        {getFunction && updateFunction && (
          <Button
            type="link"
            onClick={() => {
              this.setState({
                modalVisible: true,
                selectedRecord: record,
                modalType: DetailViewTypeEnum.UPDATE,
              });
            }}
          >
            编辑
          </Button>
        )}
        {deleteFunction && (
          <Button
            type="danger"
            loading={deleteLoading}
            onClick={async () => {
              await this.deleteItem(record);
              await this.requestList();
            }}
          >
            删除
          </Button>
        )}
      </React.Fragment>
    );
  };

  private updateTableKey(): void {
    const dataSource = this.props.itemList;
    let result = '';
    if (dataSource) {
      let keyItem = dataSource.find(item => item.isKey);
      if (keyItem) {
        result = keyItem.field;
      }
    }
    this.setState({ tableKey: result });
  }

  private async deleteItem(record: T) {
    const { deleteFunction } = this.props;
    if (deleteFunction) {
      this.setState({ deleteLoading: true });
      await deleteFunction(record);
      this.setState({ deleteLoading: false });
    }
    return;
  }

  public render(): ReactNode {
    const {
      tableColumns,
      tableKey,
      tableData,
      tableTotal,
      tableCurrentPage,
      requestListLoading,
      modalVisible,
      selectedRecord,
      modalType,
      modalWidth,
      columnCount,
      labelSpan,
    } = this.state;

    const { itemList } = this.props;

    const { showQuickJumper, showTotal, className, style, tableClassName, tableStyle } = this.props;
    return (
      <div className={classnames(styles.FormTable, className)} style={style}>
        {/* 渲染列表 */}
        <Table
          style={tableStyle}
          className={tableClassName}
          loading={requestListLoading}
          columns={tableColumns}
          rowKey={tableKey}
          dataSource={tableData}
          pagination={{
            total: tableTotal,
            current: tableCurrentPage,
            showQuickJumper,
            showTotal,
            onChange: (current: number) => {
              this.setState({ tableCurrentPage: current }, () => {
                this.requestList();
              });
            },
          }}
        />
        {/* 渲染编辑窗口 */}
        <FormTableEditModal
          itemList={itemList}
          onCancel={() => this.setState({ modalVisible: false })}
          type={modalType}
          visible={modalVisible}
          data={selectedRecord}
          width={modalWidth}
          columnCount={columnCount}
          labelSpan={labelSpan}
        />
      </div>
    );
  }
}

export default FormTable;
