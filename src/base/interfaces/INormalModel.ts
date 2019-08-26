import { Effect } from 'dva';
import { Reducer } from 'redux';

export default interface INormalModel {
  namespace: string;
  state?: {
    [key: string]: any;
  };
  effects: {
    /**
     * 增加
     */
    add: Effect;
    /**
     * 修改
     */
    update: Effect;
    /**
     * 删除
     */
    remove: Effect;
    /**
     * 选择
     */
    select: Effect;

    [propName: string]: Effect;
  };
  reducers?: {
    [key: string]: Reducer<{}>;
  };
}
