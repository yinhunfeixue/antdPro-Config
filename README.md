# 强制规范，业务组件

本项目做两件事

- 强制规范
- 针对公司常见业务提示快速使用的业务组件

## 环境准备

1. IDE--vscode
1. 安装插件 tslint、eslint、Prettier

## 针对 IDE 的配置

在.vscode 目录中，增加了 ide 的配置，如下

- 保存时格式化文件
- 输入完一行时格式化
- 使用 Prettier 格式化

## 针对 IDE 的代码片段

- newEnum--创建枚举
- newCom--创建非页面的组件
- newPage--创建页面
- newService-创建 service 接口，包含增、删、改、查 4 个方法
- newModel--创建 model，包含增、删、改、查 4 个方法
