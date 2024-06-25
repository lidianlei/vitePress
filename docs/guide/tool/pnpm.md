# pnpm

## 安装介绍

[pnpm (opens new window)](https://pnpm.io/zh/installation)含义为 performant npm 意指『高性能的 npm』，与npm一样的都是软件包管理工具。pnpm 比其他包管理器快 2 倍

**安装pnpm**

使用`npm`安装

```js
npm install -g pnpm
```

## 镜像加速

使用镜像加速可以让我们下载软件更快，可以访问 [nrm (opens new window)](https://doc.houdunren.com/soft/7.2 nrm.html#nrm介绍)文档安装使用

## 常用命令

### 安装软件

**全局安装**

```js
pnpm add -g <Module Name>
```

**为当前项目安装软件包**

```js
pnpm add <Module Name>
```

**根据`package.json`安装软件**

```js
pnpm install
# 或者
pnpm i
```

**生产环境**

- 在`package.json`文件`dependencies`属性下增加记录

- `pnpm install`时会自动安装该软件包

- 使用`pnpm install --production`或者`NODE_ENV`变量为`production`时，安装该软件包

  ```js
  pnpm add <Module Name>
  ```

**开发环境**

- 在`package.json`文件`devDependencies`属性下增加记录
- `pnpm install`时会自动安装该软件包
- 使用`pnpm install --production`或者`NODE_ENV`变量值为`production`时，不会安装该软件包

```js
pnpm add -D <Module Name>
```

### 查看软件

列出项目的依赖

```js
pnpm ls
# 或
pnpm list
```

**查看本地已安装的包信息**

```js
pnpm ls tailwindcss
# 或者
pnpm ls | grep tailwindcss
```

**查看包信息**

```js
pnpm info tailwindcss
# 或者
pnpm view tailwindcss
```

**列出项目的依赖，并限制显示的依赖深度**

```js
pnpm list --depth=2
```

**查看全局包信息**

```js
pnpm list -g
```

### 更新软件

跟新`pnpm`自身

```js
pnpm add -g pnpm
```

**更新所有软件**

```js
prpm update
# 或
pnpm up
```

**更新指定软件包**

```js
pnpm update <Module Name>
```

### 卸载软件

**删除全局软件**

```js
pnpm uninstall -g <Module Name>
# 或者
pnpm rm -g <Module Name>
# 或者
pnpm un -g <Module Name>
```

**删除项目中软件包**

```js
pnpm un <Module Name>
```

