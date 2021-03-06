import FormTableEditModal from '@/base/components/FormTable/FormTableEditModal';
import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import DetailViewTypeEnum from '@/base/Enums/DetailViewTypeEnum';
import IComponentProps from '@/base/interfaces/IComponentProps';
import { Button, Table } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ColumnProps, TableProps, TableRowSelection } from 'antd/lib/table';
import classnames from 'classnames';
import React, { Component, CSSProperties, ReactNode } from 'react';
import styles from './FormTable.less';

const defaultPageSize = 10;

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
  editRecord?: T;

  /**
   * 表单一行有几列
   */
  columnCount?: number;

  labelSpan?: number;

  modalWidth?: number;

  selectedRowKeys: string[] | number[];

  selectedRows: T[];
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
   * 是否显示查看按钮
   */
  showLook?: boolean;

  /**
   * 是否显示快速跳转页码的输入框
   */
  showQuickJumper?: boolean;

  /**
   * 显示总数量的方法
   */
  showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | undefined;

  /**
   * 表格的样式名
   */
  tableClassName?: string;

  /**
   * 表格的样式
   */
  tableStyle?: CSSProperties;

  /**
   * 表格每页显示的数量
   */
  pageSize?: number;

  /**
   * 隐藏页码器
   */
  hidePage?: boolean;

  /**
   * 选中操作，设置此属性后，会自动显示多选框
   * 组件内部有默认的选中处理，如果需要使用默认选中处理，但是外部又无需额外操作，可设置 `rowSelection={{}}`
   */
  rowSelection?: TableRowSelection<T>;

  tableProps?: TableProps<T>;

  /**
   * 自定义数据项转换为控件的方法
   *
   * @param item 数据项
   * @param value 数据项当前的值
   * @param form antd中form的包装器，一般使用其中的getFieldDecorator方法
   * @param disabled 是否期望禁用
   */
  customControlRender?: (
    item: IFormTableItem<T>,
    value: any,
    form: WrappedFormUtils,
    disabled: boolean,
  ) => ReactNode;

  /**
   * 搜索表单类型
   */
  searchFormType?: any;
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
      editRecord: undefined,
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    this.updateTableColumns();
    this.updateTableKey();
    this.changePage();
  }

  /**
   * 刷新表格数据
   */
  public refreshTable() {
    this.changePage();
  }

  /**
   * 重置表格到第1页，并刷新
   */
  public resetTable() {
    this.changePage(1);
  }

  private changePage(pageIndex?: number) {
    if (!pageIndex) {
      pageIndex = this.state.tableCurrentPage;
    }
    const maxPageIndex = this.maxPageIndex;
    if (pageIndex < 1) {
      pageIndex = 1;
    }
    if (pageIndex > maxPageIndex) {
      pageIndex = maxPageIndex;
    }
    this.setState({ tableCurrentPage: pageIndex }, () => this.requestList());
  }

  async requestList() {
    const { tableCurrentPage } = this.state;
    const { getListFunction } = this.props;

    this.setState({ requestListLoading: true });
    const res = await getListFunction(tableCurrentPage);

    this.setState(
      {
        tableData: res.dataSource,
        tableTotal: res.total,
        requestListLoading: false,
      },
      () => {
        // 如果当前页码大于总页码，重新请求一次；当删除最后一页的最后一行是会出现这种情况
        if (this.state.tableCurrentPage > this.maxPageIndex) {
          this.changePage();
        }
      },
    );
  }

  private get pageSize() {
    return this.props.pageSize || defaultPageSize;
  }

  private get maxPageIndex() {
    return Math.ceil(this.state.tableTotal / this.pageSize);
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
                editRecord: record,
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
                editRecord: record,
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
              await this.changePage();
            }}
          >
            删除
          </Button>
        )}
      </React.Fragment>
    );
  };

  private onRowChange = (selectedRowKeys: string[] | number[], selectedRows: T[]) => {
    this.setState({ selectedRowKeys, selectedRows });
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
      editRecord,
      modalType,
      modalWidth,
      columnCount,
      labelSpan,
    } = this.state;

    const { itemList } = this.props;

    const {
      showQuickJumper,
      showTotal,
      className,
      style,
      tableClassName,
      tableStyle,
      hidePage,
      tableProps,
      rowSelection,
      customControlRender,
      searchFormType,
    } = this.props;

    const toTableProps: TableProps<T> = {
      ...tableProps,
    };

    if (rowSelection) {
      // 如果设置了rowSelection且设置了onChange，则外部onChange和内部onChange都需要执行
      toTableProps.rowSelection = {
        ...rowSelection,
        onChange: (keys, rows) => {
          this.onRowChange(keys, rows);
          if (rowSelection.onChange) {
            rowSelection.onChange(keys, rows);
          }
        },
      };
    }
    return (
      <div className={classnames(styles.FormTable, className)} style={style}>
        {/* 渲染搜索列表 */}
        {searchFormType && React.createElement(searchFormType, {})}
        {/* 渲染列表 */}
        <Table
          {...toTableProps}
          style={tableStyle}
          className={tableClassName}
          loading={requestListLoading}
          columns={tableColumns}
          rowKey={tableKey}
          dataSource={tableData}
          pagination={
            hidePage
              ? false
              : {
                  total: tableTotal,
                  current: tableCurrentPage,
                  showQuickJumper,
                  showTotal,
                  pageSize: this.pageSize,
                  onChange: (current: number) => {
                    this.changePage(current);
                  },
                }
          }
        />
        {/* 渲染编辑窗口 */}
        <FormTableEditModal
          customControlRender={customControlRender}
          itemList={itemList}
          onCancel={() => this.setState({ modalVisible: false })}
          type={modalType}
          visible={modalVisible}
          data={editRecord}
          width={modalWidth}
          columnCount={columnCount}
          labelSpan={labelSpan}
        />
      </div>
    );
  }
}

export default FormTable;
