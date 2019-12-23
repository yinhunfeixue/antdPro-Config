import IFormTableItem from '@/base/components/FormTable/IFormTableItem';
import IComponentProps from '@/base/interfaces/IComponentProps';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { Component, ReactNode } from 'react';
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
}
interface IFormTableProps<T> extends IComponentProps {
  /**
   * 数据描述列表
   */
  itemList: IFormTableItem[];

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
  editFunction?: (record: T) => Promise<void>;

  /**
   * 删除一项数据的方法
   */
  deleteFunction?: (record: T) => Promise<void>;

  /**
   * 删除多条数据的方法
   */
  deleteListFunction?: (recordList: any[]) => Promise<void>;

  /**
   * 渲染编辑列，如果不设置，则根据其它属性自动生成，规则为
   * + 如果设置了getFunction，生成查看按钮
   * + 如果设置了getFunction 和 editFunction，生成编辑按钮
   * + 如果设置了deleteFunction，生成删除按钮
   *
   * @param item 数据项
   * @param defaultRenderFunction 默认的渲染函数，如果需要按默认规则渲染，但又需要增加其它操作，可先调用defaultRenderFunction，再添加其它操作元素
   */
  editColumnsRender?: (
    text: any,
    item: T,
    index: number,
    defaultRenderFunction: (item: T) => ReactNode,
  ) => ReactNode;

  showQuickJumper?: boolean;

  showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | undefined;
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
    const { itemList, editColumnsRender } = this.props;
    let result: ColumnProps<any>[] = [];

    // 获取要显示的列
    if (itemList) {
      result = itemList
        .filter(item => item.displayInTable)
        .map(item => ({
          title: item.label,
          dataIndex: item.field,
        }));
    }
    // 渲染操作列
    let editColumn: any = null;
    if (editColumnsRender) {
      editColumn = {
        render: (text: any, record: T, index: number) => {
          return editColumnsRender(text, record, index, this.defaultEditColumnsRender);
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

  private defaultEditColumnsRender(record: T): ReactNode {
    const { getFunction, editFunction, deleteFunction } = this.props;
    const { deleteLoading } = this.state;
    /**
     * + 如果设置了getFunction，生成查看按钮
     * + 如果设置了getFunction 和 editFunction，生成编辑按钮
     * + 如果设置了deleteFunction，生成删除按钮
     */
    return (
      <React.Fragment>
        {getFunction && <Button type="link">查看</Button>}
        {getFunction && editFunction && <Button type="link">编辑</Button>}
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
  }

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
    } = this.state;

    const { showQuickJumper, showTotal } = this.props;
    return (
      <div className={styles.FormTable}>
        {/* 渲染列表 */}
        <Table
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
        {/* 渲染新增窗口 */}
        {/* 渲染查看窗口 */}
      </div>
    );
  }
}

export default FormTable;