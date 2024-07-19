# 模块管理

推荐使用 webpack 进行 TypeScript 模块打包是

## 命名空间

TypeScript 像其他编程语言一样，存在命名空间（namespace）的概念

当我们定义以下同名变量时是不允许的，这种情况可以通过命名空间解决

```ts
let name: string = '张三'
let name: string = '李四'
```

使用命名空间将变量隔离

- 数据需要使用 export 导出才可以使用
- 子命名空间也需要 export 后才可以使用

```ts
namespace User {
  export let name: string = '张三'
}
namespace Member {
  let name: string = '李四'
}
console.log(User.name);
console.log(Member.name); //报错，因为没有使用 export 将变量导出
```

命名空间支持嵌套

```ts
namespace User {
  export let name: string = '张三'
  export namespace Member {
    export let name: string = '李四'
  }
}

console.log(User.name);
console.log(User.Member.name); //李四 获取子命名空间中的数据
```

## 单独编译

将每个 ts 文件单独进行编译，然后在 html 文件中依次引入

首先创建 tsconfig.js

```text
tsc --init
```

然后执行文件监测

```text
tsc -w
```

创建`user.ts`模块文件

```ts
namespace User {
  export let name: string = '张三'
}
namespace Member {
  export let name: string = '李四'
}
```

在 index.ts 文件中定义业务内容，即使用 User.ts 中的数据 User.name

```ts
console.log(User.name);
```

然后执行编译

```text
tsc -w
```

## 合并打包

通过命令将多个文件进行打包

```ts
tsc --outFile ./dist/app.js user.ts index.ts
```

## reference

在 index.ts 中使用 `reference` 引入依赖的文件

```ts
/// <reference path="user.ts"/>
console.log(User.name);
```

使用下面的命令编译到一个文件中

```text
tsc --outFile ./dist/app.js index.ts
```

## amd

使用 amd 模块打包较上面的打包方式方便些，因为我们可以在代码中使用 js 模块的 export/import 语法

首先创建 ts 配置文件 tsconfig.js

```text
tsc --init
```

然后修改配置项

```text
...
"module": "amd"
...
```

然后创建 user.ts，并且只导出 User 类

```ts
export namespace User {
  export let name: string = '张三'
}
export namespace Member {
  export let name: string = '李四'
}
```

在 index.ts 文件中 import 导入 ts 编译后的 User.js 模块

```ts
import { User } from './user.js'
```

然后执行命令进行编译

```ts
tsc --outFile ./dist/app.js
```

- 因为是 amd 模块所以需要使用 require.js 处理