## 环境准备

1. 项目中的设备及代码片段都基于 VSCODE 配置，请先安装-vscode
1. 安装 vscode 插件 tslint、eslint、Prettier

## 第一步

1. 修改网站名称——`config/defaultSettings.ts`
1. 修改 LOGO——替换图片`src/assets/logo.png`

现在你已完成了项目的初始化

## 需要记住

### 针对 IDE 的代码片段

- newEnum--创建枚举
- newCom--创建非页面的组件
- newPage--创建页面
- newService-创建 service 接口，包含增、删、改、查 4 个方法
- newModel--创建 model，包含增、删、改、查 4 个方法

代码片段的使用方式为：新建文件后，直接输入代码片段的短码即可

### 代码规则

- route 路径和文件路径一致，例如：`pages/aa/bb/LoginPage.tsx` 对应的路径为`#/aa/bb/LoginPage`

- pages、models、services 中的 **目录结构** 及 **文件名** 应保持一致 ,例如：`LoginPage.tsx、LoginModel.ts、LoginServices.ts`

* 常量请使用枚举定义，不允许在页面中直接写常量。例如

  正确写法：`user.type === UserTypeEnum.MANAGER`

  错误的写法：`user.type === 1`

### 通用组件

我们提供 3 大类组件，示例正在编写中

- 搜索列表组件--SearchTable

* 详情组件--Detail

- 文件组件--LimitUpload

- 重型的增删改查组件--FormTable

### 通用函数

优先使用通用函数来完成业务，这样做有利于提高开发速度及产品的一致性

- `ProjectUtil.createSearchString`--创建搜索的请求参数

* `AntdUtil.rendeTree`--渲染一颗树

- `AntdUtil.renderSelectOptions`--创建下拉框的选项

- `AntdUtil.renderFormItems`--渲染表单中的项

### 示例页面

请在`src/pages/Demo/`中编写示例页面，demo 页面的路由在`config/route.demoConfig.ts`中配置。

npm run build 时，会自行移除 demo 路由，无需手动修改

## VSCODE 环境配置修改了什么？

- 保存时
  - 自动格式化
  - 自动删除未使用的 import
- js,ts 都使用 eslint 中的规则 ，不用单独写 tslint
- import 时，优先使用 `@/**_/_**`，而非相对路径

* 代码片段

- 使用 prettier 格式化

* prettier 自动换行
* tab 占 2 个空间
