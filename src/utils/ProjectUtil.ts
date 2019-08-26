import Moment from 'moment';

export default class SystemUtil {
  /**
   * 创建搜索字符串
   * 规则如下
   * + 无值，忽略
   * + customeRule 有设置，优先按customeRule设置的规则
   * + 字符串，模糊搜索 LK
   * + 数字或可转换成数字的字符串，精确搜索 EQ
   * + 长度为1的moment数组，精确搜索EQ
   * + 长度为2的moment数组，范围搜索1--D_GE,2--D_LE
   * @param {*} params
   * @param {*} customeRule 自定义规则函数，格式为customeRule(params, key)=>string，返回值格式为为Q=key_EQ=value
   */
  public static createSearchString(
    params: any,
    customeRule?: (params: any, key: string) => string,
  ) {
    const DATE_FORMAT = 'YYYY-MM-DD';
    const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    let paramsList = [];
    for (let key in params) {
      let value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        let currentStr = null;
        if (customeRule) {
          currentStr = customeRule(params, key);
        }
        // 如果未自定义规则，则使用通用规则
        if (!currentStr) {
          switch (true) {
            // 数字使用EQ
            case typeof value === 'number':
              currentStr = `Q=${key}_EQ=${value}`;
              break;
            // 字符串使用LK
            case typeof value === 'string':
              currentStr = `Q=${key}_LK=${value}`;
              // }
              break;
            // 单个日期使用EQ
            case value instanceof Moment:
              currentStr = `Q=${key}_EQ=${value.format(DATE_FORMAT)}`;
              break;
            // 多日期使用D_GE
            case value instanceof Array && value.length >= 2:
              if (value[0] instanceof Moment) {
                currentStr = `Q=${key}_D_GE=${value[0].format(
                  TIME_FORMAT,
                )}&&Q=${key}_D_LE=${value[1].format(TIME_FORMAT)}`;
              }
              break;
            default:
              break;
          }
        }
        if (currentStr) {
          paramsList.push(currentStr);
        }
      }
    }

    if (paramsList.length) {
      return `?${paramsList.join('&&')}`;
    }
    return '';
  }
}
