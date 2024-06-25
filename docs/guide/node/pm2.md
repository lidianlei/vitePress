# PM2

## 基础知识

**PM2**是一个守护进程管理器，它将帮助您管理和保持应用程序在线，PM2 的入门非常简单，它以简单直观的 CLI 形式提供，可通过 NPM 进行安装

```js
pnpm add -g pm2@latest
# or
yarn global add pm2
# or
npm install pm2@latest -g
```

然后安装typescript支持包

```js
pm2 install typescript
pm2 install ts-node
```

### 配置

执行命令创建配置文件

```js
pm2 init simple
```

### 运行

执行以下命令运行

```js
pm2 start app.ts
```

停止项目

```js
pm2 stop app.ts
```

文件更改时监视并重新启动应用程序

```js
pm2 start app.ts --watch
```

运行时指定应用名称

```js
pm2 start app.ts --name "nodejs" --watch
```

根据名称关闭应用

```js
pm2 stop houdunren
```

## 常用命令

### 查看

显示进程状态

```js
pm2 list
#或
pm2 ls
```

查看log

```js
pm2 log
```

### 删除

删除id为0的进程

```js
pm2 delete 0
```

从pm2列表中删除所有流程

```js
pm2 delete all 
```

### 更新

更新pm2

```js
npm install pm2@latest -g
```

更新内存中的pm2

```js
pm2 update
```

## 监控

查看资源占用

```js
pm2 monit
```