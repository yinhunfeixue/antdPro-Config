enum DetailViewTypeEnum {
  /**
   * 新增
   */
  ADD,

  /**
   * 更新
   */
  UPDATE,

  /**
   * 阅读
   */
  READ,
}

namespace DetailViewTypeEnum {
  /**
   *
   * @param value
   */
  export function toString(value: DetailViewTypeEnum) {
    switch (value) {
      case DetailViewTypeEnum.ADD:
        return '新增';
      case DetailViewTypeEnum.UPDATE:
        return '编辑';
      case DetailViewTypeEnum.READ:
        return '详情';
      default:
        return '';
    }
  }
}
export default DetailViewTypeEnum;
