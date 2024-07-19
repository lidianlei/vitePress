# 安装配置

## 基本知识

各个浏览器厂商会开发解析Javascript的引擎如google chrome、Apple safari。因为不同厂商的引擎对ecmascript的解析程序不同，所以有些功能可能在有的浏览器有效，但在其他的浏览器无效。

比较著名的引擎是chrome 的v8，它是由c++编写的，而且它有个特点可以内置到其他C++程序中，这就为node.js的实现提供的基础。所以可以把nodejs简单来理解为使用v8引擎可以解析javascript语法，同时也可以调用c++功能进行文件操作，网络通信等功能。

**Nodejs vs Browser**

- nodejs是开源、跨平台的javascript运行时环境，它是运行时，不时语言或框架，是在浏览器之外的Javascript使用
- nodejs可以使用javascript调用c++，实现计算底层操作
- nodejs运行时包含 [v8引擎 (opens new window)](https://github.com/nodejs/node/tree/main/deps/v8)（解析javascript）、[libuv (opens new window)](https://github.com/nodejs/node/tree/main/deps/uv)(进行计算机文件、网络等底层操作) 等等。通过查看[nodejs源码 (opens new window)](https://github.com/nodejs/node/tree/main/src)，我们会知道nodejs使用c++进行文件或网络操作
- nodejs使用libuv库，让开发者使用[javascript (opens new window)](https://github.com/nodejs/node/tree/main/lib)调用c++程序
- nodejs 没有基于浏览器的javascript的DOM、BOM等概念这与但是拥有文件系统操作功能
- nodejs 我们可以随意选择版本，但浏览器的javascript运行在众多用户电脑中，所以版本不是由我们决定的

安装后执行以下命令，查看安装的nodejs版本

```js
node -v
```

编写index.js内容如下

```js
console.log(__dirname)
```

然后在命令行执行该文件，好可以查看到当前目录的 `node.js`执行的结果

## 类型支持

开发中经常使用 `typescript`进行开发，所以我们来配置`Node`的`typescript`开发环境

### 安装软件

- [ts-node (opens new window)](https://github.com/TypeStrong/ts-node#overview)使您能够直接在 Node 上执行 TypeScript.js而无需预编译
- [nodemon (opens new window)](https://github.com/remy/nodemon)nodemon 监视源中的任何更改并自动重新启动服务器，非常适合开发
- [typescript (opens new window)](https://www.tslang.cn/index.html#download-links)安装typescript

执行以下命令进行安装

```js
pnpm add -g add ts-node nodemon typescript @types/node
```

### 文件结构

```js
├── package.json
├── pnpm-lock.yaml
└── src
    ├── http.ts
    └── index.ts
```

### package.json

创建 `package.json`文件

```js
pnpm init
```

`package.json`文件内容为

- 将主文件修改为 **index.ts**
- 因为会自动调用 **ts-node** 命令，所以dev 命令可以简写为 **dev:nodemon**

```json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "dev": "nodemon"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^18.7.8",
    "ts-node": "^10.9.1",
    "typescript": "^4.7.4"
  }
}
```

###  tsconfig.json

然后创建 tsconfig.json 文件

```js
tsc --init
```

配置项内容如下

```json
{
  "compilerOptions": {
    //ts编译为的ES的版本
    "target": "ESNext",
    //使用的模块规范
    "module": "NodeNext",
    //兼容common.js模块到ESM
    "esModuleInterop": true,
    //开启严格类型校验
    "strict": true,
    //允许导入扩展名为.json的模块
    "resolveJsonModule": true
  },
  //我们代码位置
  "include": ["./**/*"]
}
```

### 运行测试

下面我们来运行项目，项目的主文件是 **src/index.ts**，文件内容如下

```js
import os from 'os'

console.log(os.version())
```

接着执行命令来运行项目

```js
pnpm run dev
```