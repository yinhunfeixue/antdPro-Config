import React, { ReactElement } from 'react';
import { Select, Tree } from 'antd';

const { TreeNode } = Tree;

class AntdUtil {
  /**
   * 根据数据源创建select的options列表
   * @param dataSource 数据源
   * @param labelFunction 把每一项转换成显示文字的函数，如果不设置，则使用toString()
   * @param valueFunction 把每一项转换成value，如果不设置，则使用toString()
   */
  public static createSelectOptions(
    dataSource: any[],
    labelFunction?: (item: any) => ReactElement,
    valueFunction?: (item: any) => any,
  ): ReactElement[] {
    if (dataSource && dataSource.length) {
      return dataSource.map(
        (item, i): ReactElement => (
          <Select.Option key={i} value={valueFunction ? valueFunction(item) : item}>
            {labelFunction ? labelFunction(item) : item}
          </Select.Option>
        ),
      );
    }
    return [];
  }

  /**
   * 创建树控件
   *
   * createTree(data, (node)=>{title:node.name}, (node)=>node.children)
   *
   * @param treeData 树的数据
   * @param createNodeProps 给单个treenode结点创建Props的函数，格式为fun(node)
   * @param getChildrenFunction 获取子结点列表的函数，格式为fun(node)
   * @param treeProps 树的Props属性
   */
  public static createTree(
    treeData: any[],
    createNodeProps: (item: any) => any,
    getChildrenFunction: (item: any) => any[],
    treeProps: any,
  ): ReactElement | null {
    if (treeData) {
      return (
        <Tree {...treeProps}>
          {AntdUtil.loopTreeNode(treeData, createNodeProps, getChildrenFunction)}
        </Tree>
      );
    }
    return null;
  }

  private static loopTreeNode(
    treeData: any[],
    createNodeProps: (item: any) => any,
    getChildrenFunction: (item: any) => any[],
  ): ReactElement[] {
    return treeData.map(
      (item, i): ReactElement => {
        const children = getChildrenFunction(item);
        return (
          <TreeNode key={i} {...createNodeProps(item)}>
            {children
              ? AntdUtil.loopTreeNode(children, createNodeProps, getChildrenFunction)
              : null}
          </TreeNode>
        );
      },
    );
  }
}

export default AntdUtil;
