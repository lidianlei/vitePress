# 环境配置

## 介绍

`typescript`是`javascript`的一个超集，typescript 可以运行于任何系统，并且是开源免费的

ypescript 有以下几个特点

- `typescript`会在编译时对代码进行严格的静态类型检查，可以在编码阶段就发现问题，而不是在上线运行时才发现
- `typeScript`语法遵循`ES`规范，更细速度快，不断支持最新的`ECMAScript`新特性，如装饰器、`public/private`修饰符
- `typescript`支持`OOP`（面向对象）的接口，抽象类，多态特性
- `typescript`可以为`IDE`提供更好的代码补全、接口提示、跳转到定义
- 还有重要一点是众多科技公司已经采用`typeScript`进行开发，也是前端工程师需要掌握的就业技能

## 安装环境

### node

首先需要安装 [node.js (opens new window)](https://nodejs.org/en/)我相信做前端的都已经安装了

### 全局安装 TS

然后执行以下命令安装`typescript`

```js
npm install -g typescript
```

如果你使用的是 mac 系统也可以执行

```js
brew install typescript
```

如果是 linux 系统可以通过相应的软件管理命令安装，比如以下是 manjaro 的安装示例

```js
sudo pacman -Sy typescript
```

安装后执行以下命令检查是否安装成功

```js
tsc -v
//如果显示以下内容即表示安装成功
// Version 4.2.4
```

### 项目安装 TS

除了全局安装外，也可以在项目中独立安装 typescript，这可以限定项目使用的`typescript`版本

```js
yarn init -y
```

安装 typescript

```js
yarn add -D typescript
```

查看版本

```js
yarn tsc -v
```

## 编辑器

**`.ts`是`typescript`的扩展名，在首次使用`vscode`编写.ts 文件时，`vscode`会自动下载支持`typescript`的插件环境**

## 编译 TS

使用`tsc`命令可以将 ts 文件编译为 js 文件，如果在编译过程中有 ts 错误将在命令行报出

每次修改 ts 文件后再执行命令编译会过于繁琐，可以执行以下命令自动监听 ts 文件内容并自动生成 js 文件

```js
tsc web.ts -w
```

## 常见问题

如果在 windows 系统中执行 tsc 命令报以下错误

```js
... 因为在此系统上禁止运行脚本 ...
```

需要以管理员身份执行 powerShell，然后执行以下命令，在出现的提示选择 `Y`

```js
set-ExecutionPolicy RemoteSigned
```