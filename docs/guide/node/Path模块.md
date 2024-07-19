# Path模块

> path模块是node.js的内置模块，用于解析文件路径操作

## __dirname

获取当前脚本所在目录，这是内置函数，不需要`require`

```js
console.log(__dirname);
```

## __filename

当前脚本的路径

```js
console.log(__filename);
```

## basename

返回文件名中最后部分，一般是文件名

- `path`是`node`内置模块，导入标准命名是**node:path**，不过`node：`是可以省略的

```js
import path from 'node:path'
console.log(path.basename('./src/module/app.ts'))
//app.ts
```

## dirname

返回文件中的目录部分

```js
console.log(path.dirname('./src/module/app.ts')) 
//./src/module
```

## extname

返回文件名的扩展名

```js
console.log(path.extname('/src/module/app.ts')) //.ts
```

## parse

获取文件的详细信息

```js
import path from 'path'
console.log(path.parse('/src/module/app.ts'));
//结果
{
  root: '/',
  dir: '/src/module',
  base: 'app.ts',
  ext: '.ts',
  name: 'app'
}
```

## format

这是**parse**的反函数，将对象转换为路径字符串

```js
import path from 'path'
console.log(path.format(path.parse(__dirname)))
```

## isAbsolute

判断路径是否是绝对路径

```js
const path = require("path");
console.log(path.isAbsolute('./src/module/app.ts')) //false
console.log(path.isAbsolute('/etc')) //true
```

## join

根据不同操作系统中的路径分隔符，组成新的文件路径

```js
const path = require("path");

console.log(path.join('./src', 'module', 'app.ts'));//src/module/app.ts
console.log(path.join('src', 'module', '../app.ts'));//src/app.ts
```

## resolve

根据不同操作系统中的路径分隔符，返回绝对路径的文件

```js
import path from 'path'
console.log(path.resolve('./src', 'module', 'app.ts')) 
//C:\Users\16798\Desktop\nodejs\03\src\module\app.ts
```

