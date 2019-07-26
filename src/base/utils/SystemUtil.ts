import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';

class SystemUtil {
  /**
   *
   * @param data
   * @param funs
   * @param apiFunction
   */
  public static *NormalCallRequest(
    data: AnyAction,
    funs: EffectsCommandMap,
    apiFunction: Function,
  ): any {
    const res = yield funs.call(apiFunction, data.payLoad);
    if (data.callBack && res) {
      data.callBack(res);
    }
    if (res.code === '10001' || res instanceof Blob) {
      if (data.callBack) {
        data.callBack(res);
      } else {
        message.error(res.msg);
      }
      return res;
    }
    return null;
  }

  /**
   * 导出blob为文件，并自动下载
   * @param blob
   * @param fileName
   */
  public static exportFileFromBlob(blob: Blob, fileName: string): void {
    const url: string = URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  /**
   * 创建表单项的验证规则
   * @param param0
   */
  public static createFormRules({
    /**
     * 是否必填
     */
    required,
    /**
     * 允许输入的最大长度
     */
    max = 50,

    /**
     * 正则验证
     */
    reg = '',
    requiredMsg = '',
  }: {
    required: boolean;
    max?: number;
    reg?: string;
    requiredMsg?: string;
  }): any[] {
    const result = [];
    if (required) {
      result.push({
        required,
        message: requiredMsg,
      });
    }
    if (max) {
      result.push({
        max,
        message: `不能超过${max}个字符`,
      });
    }
    if (reg) {
      result.push({
        pattern: reg,
        message: '请输入正确的格式',
      });
    }
    return result;
  }

  public static isEmptyArray(target: []): boolean {
    return !target || !target.length;
  }

  public static getExtension(path: string): string {
    if (path && path.length > 0) {
      const indexOfDot = path.lastIndexOf('.');
      if (indexOfDot >= 0) {
        return path.substr(indexOfDot);
      }
    }
    return '';
  }
}

export default SystemUtil;
