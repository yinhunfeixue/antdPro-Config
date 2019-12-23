import IFormItemData from '@/base/interfaces/IFormItemData';
import { Col, Select, Tree } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { AntTreeNodeProps, TreeProps } from 'antd/lib/tree';
import React, { ReactElement, ReactNode } from 'react';

const { TreeNode } = Tree;

class AntdUtil {
  /**
   * 根据数据源创建select的options列表
   * @param dataSource 数据源
   * @param labelFunction 把每一项转换成显示文字的函数，如果不设置，则使用toString()
   * @param valueFunction 把每一项转换成value，如果不设置，则使用toString()
   */
  public static renderSelectOptions(
    dataSource: any[],
    labelFunction?: (item: any, index: number) => ReactElement | string,
    valueFunction?: (item: any, index: number) => any,
  ): ReactElement[] {
    if (dataSource && dataSource.length) {
      return dataSource.map(
        (item, i): ReactElement => (
          <Select.Option key={i} value={valueFunction ? valueFunction(item, i) : item}>
            {labelFunction ? labelFunction(item, i) : item}
          </Select.Option>
        ),
      );
    }
    return [];
  }

  /**
   * 创建树控件
   *
   * rendeTree(data, (node)=>{title:node.name}, (node)=>node.children)
   *
   * @param treeData 树的数据
   * @param createNodeProps 给单个treenode结点创建Props的函数，格式为fun(node)
   * @param getChildrenFunction 获取子结点列表的函数，格式为fun(node)
   * @param treeProps 树的Props属性
   */
  public static rendeTree(
    treeData: any[],
    createNodeProps: (item: any) => AntTreeNodeProps,
    getChildrenFunction: (item: any) => any[] | undefined,
    treeProps: TreeProps,
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
    getChildrenFunction: (item: any) => any[] | undefined,
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

  /**
   * 渲染表单项
   * @param dataSource 表单数据源
   * @param defaultSpan 默认span值 ，每项占用的列数（列的含义请参考antd, https://ant.design/components/grid-cn/)
   * @param defaultFormLabelSpan 默认每个表单项的标签中用的列数
   */
  public static renderFormItems(
    dataSource: IFormItemData[],
    defaultSpan?: number,
    defaultFormLabelSpan?: number,
  ): ReactNode {
    if (!dataSource || !dataSource.length) {
      return null;
    }
    // 设置formlabelspan
    return dataSource.map((item, index) => {
      const formLabelSpan = item.formLabelSpan ? item.formLabelSpan : defaultFormLabelSpan;

      const formItemSpanArg: any = {};
      if (formLabelSpan) {
        // 如果label有值，正常设置；如果label无值，设置offset
        if (item.label) {
          formItemSpanArg.labelCol = { span: formLabelSpan };
          formItemSpanArg.wrapperCol = { span: 24 - formLabelSpan };
        } else {
          formItemSpanArg.wrapperCol = { offset: formLabelSpan };
        }
      }
      const formItem = (
        <FormItem key={index} label={item.label} {...formItemSpanArg} {...item.formItemProps}>
          {item.content}
        </FormItem>
      );

      // 判断是否加上列
      const span = item.span ? item.span : defaultSpan;
      if (span) {
        return (
          <Col key={index} span={span}>
            {formItem}
          </Col>
        );
      }
      return formItem;
    });
  }
}

export default AntdUtil;
