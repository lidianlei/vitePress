# FS模块

## 基本知识

node 即然是服务器端环境，所以可以操作服务器文件的读写，这与基于浏览器的 JS 是由区别的

需要使用 node.js 的**fs**模块操作文件和管理目录

## 同步操作

使用**readFileSync** 与 **writeFileSync** 对文件进行同步读写操作

- 同步操作会阻塞进程
- 如果是写入文件，可以不设置编码

### 读取文件

使用`fs`模块读取文件，因为`readFileSync`返回内容为`Buffer`，所以使用`toString`转为字符串

```js
import {readFileSync} from "fs";
const content = readFileSync('./1.txt');

console.log(content.toString('utf-8'));
```

也可以指定`readFileSync`的第二个参数即字符编码，将读取的内容转为字符串

```js
import {readFileSync,writeFileSync} from 'fs';
//不指定编码时返回 Buffer 二进制数据流，可以使用 toString()转为字符串
//指定编码后转为字符串返回
const content = readFileSync('./node.json','utf-8');
console.log(content);
```

### 写入文件

使用**writeFileSync**方法可以写入文件

```js
//同步写入文件
writeFileSync('1.txt', 'nodejs 写入')
//通过设置 flat:a 选项来追加文件内容
writeFileSync('1.txt', 'nodejs追加内容', { flag: 'a' })
```

## 异步操作

同步文件操作会阻塞进程，所以使用异步文件操作拥有更好的性能，也是推荐的做法

### 回调函数

使用`readFile`与`writeFile`可以对文件进行异步操作，不阻塞进程拥有更好的性能

- Node.js 以错误优先为思想，所以回调函数第一个参数为错误信息，没有错误时值为 null

```js
import {readFile,writeFile} from 'fs';

readFile("./1.txt",'utf-8',(error,content)=>{
  if (error){
    console.log(error);
  }else {
    console.log(content);
    //异步写入文件
    writeFile('xj.txt',content,(error)=>{
      if (error) console.log(error)
      else console.log("文件写入成功");
    })
  }
})
```

### Promise

使用 **Promise** 对文件的操作方法进行封装

```js
import {readFile,writeFile} from "fs";

//获取文件
function fileGetContent(file){
  return new Promise((resolve)=>{
    readFile(file,'utf-8',(error,content)=>{
      resolve(content)
    })
  })
}
//写入文件
function filePutContent(file,content){
  return new Promise((resolve)=>{
    writeFile(file,content,(error)=>{
      if (error) throw error
      resolve(true)
    })
  })
}

//使用 async / await 使用代码更清晰
async function node(){
  const content = await fileGetContent('1.txt');
  await filePutContent('2.txt',content);
  
  console.log("2.txt 写入成功");
}

node();
console.log("先输出...");
```

#### fs/promises

其实我们不需要自己封装，因为 Node 提供了 Promise 操作机制

**fs/promises** 提供了 Promise 操作机制

```js
import {readFile} from "fs/promises";
readFile("./2.txt",'utf-8').then((content)=>{
  console.log(content);
}).catch((error)=>{
  console.log(error);
})
```

## 文件信息

### existsSync

使用 **existsSync** 判断文件或目录是否存在，返回值时 **boolean**

```js
import {existsSync} from 'fs';
if (existsSync('./1.txt')){
  console.log("文件存在");
}
```

### stat

使用**stat**可以获取文件或目录详细信息，比如可用来判断是否时文件或目录

```js
import {stat} from "fs";
stat('./1.txt',(error,stats)=>{
  if (error) throw new Error('文件不存在或没有操作权限');
  if (stats.isFile()){
    console.log("这是文件");
  }
  if (stats.isDirectory()){
    console.log("这是目录");
  }
})
```

**`fs/promises`提供了 Promise 的操作方法**

```js
import {stat} from "fs/promises";

//是否是目录
async function fileType(file) {
  try {
    const stats = await stat(file);
    return stats.isDirectory() ? 'dir' : "file"
  } catch (error) {
    if (error) throw new Error('文件不存在或没有操作权限')
  }
}
fileType('./1.txt').then((type) => {
  console.log(type === 'dir' ? '目录' : '文件');
})
```

### unlink

**使用`unlink`执行异步删除文件**

```js
import {unlink,writeFileSync} from 'fs';
writeFileSync('./1.txt','node');
setTimeout(()=>{
  //三秒后删除文件
  unlink('1.txt',(error)=>{
    if (error) throw error
    console.log("文件删除成功");
  })
},3000)
```

**fs/promises中封装了 Promise 删除文件方法**

```js
import {writeFileSync} from 'fs';
import {unlink} from 'fs/promises'

async function deleteFile(){
  await unlink('2.txt')
}

writeFileSync('2.txt','node');
setTimeout(()=>{
  deleteFile()
},3000)
```

## 目录管理

使用 Node 操作目录

### 创建目录

使用 **mkdirSync** 以同步的方式创建多级目录

```js
import {mkdirSync} from "fs";

const state = mkdirSync('a/b/c',{recursive:true});
if (state){
  console.log('目录创建成功');
}
```

**使用 mkdir 可以创建目录，如果已经存在将报错**

```js
import {mkdir} from 'fs';

mkdir('node',(error)=>{
  if (error) throw error;
  console.log('目录创建成功');
})
```

**fs/promise 提供了 Promise 操作方法**

```js
import {mkdir} from "fs/promises";

async function dir(){
  await mkdir('nodejs')
}
dir();
```

### 删除目录

使用**rmdirSync**以同步的方式删除多级目录，同步删除会阻塞代码，建议尽可能使用异步操作

recursive 是否递归

```js
import {rmdirSync} from 'fs';
rmdirSync('a',{recursive:true})
```

**使用 rmdir 异步删除目录，默认只能删除空目录**

```js
import {rmdir} from "fs";
rmdir('nodejs',(error)=>{
  if (error) throw error;
  console.log("目录删除成功");
})
```

**递归删除目录，即删除目录中所有内容，可以删除非空目录**

```js
import {rmdir} from "fs";
rmdir('node',{recursive:true},(error)=>{
  if (error) throw error;
  console.log('目录删除成功');
})
```

**fs/promises 提供了 Promise 操作方法，用于异步删除目录**

```js
import {rmdir} from "fs/promises";
rmdir('node.json').then((e)=>{
  console.log('删除成功');
}).catch((error)=>{
  console.log('删除失败');
})
```

**下面是递归删除目录，非空目录也可以一次删除**

```js
import { rmdir } from 'fs'
rmdir('node', { recursive: true }, (error) => {
  if (error) throw error
  console.log('目录删除成功')
})
```

