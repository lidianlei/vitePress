# Stream与Pipe

## Stream

**Stream**是大多数 Node.js 应用程序所依赖的主要功能之一，比如 HTTP 请求、文件的读写操作等，

### 基本概念

stream 是哦那个一个点到另一个点的数据流。可以将流理解为 Buffer 的搬运工，将 Buffer 一块块的搬运（流动）到目的地。比如想前端发送一个大文件内容时，使用 stream 可以边读取边发送，传统模式要一次读取文件再发送，所有使用 Stream 可以为我们带来更好的内存和事件效率

- **Stream**用于处理数据的传输
- 在开发中我们多数使用的是对**stream**的封装，一般不需要自己写**stream**的控制
- **stream**主要用在网络请求，文件处理等**IO**操作
- 在处理大文件时才可以体验到**stream**的效率

### EvenrEmitter

**Stream**流对像是**EventEmitter**的实例，所以拥有事件处理机制

- open 文件被打开时触发
- close 文件被关闭时触发
- data 当有初级读取时触发
- end 数据读取完毕时触发，早于 clsoe 事件
- error 在接收和写入过程中发生错误时触发

## 可读流

可读流指数据从源头（如磁盘）读取内存，也可以将流理解为 Buffer 的搬运工，将 Buffer 一块块的搬运（流动）到目的地

- 数据会分块读取
- Buffer 数据时二进制的，所以结果时二进制表示
- 使用着这种方式时一块一块读取处理数据，所以要比一次读取文件到内存性能更好
- stream 使用默认的 64KB 的 Buffer

### 基本操作

通过读取超大文件 node.json，体验 Buffer 的操作大数据

```js
import {createReadStream,createWriteStream} from 'fs';

//创建可读流，将数据以块的形式读取，每次读取一点放到缓存区
const readStream = createReadStream('./node.txt',{
  encoding:"utf-8"
})
const writeStream = createWriteStream('1.txt');
//每次读取到数据时，会触发函数
readStream.on('data',(chunk)=>{
  console.log(chunk);
  writeStream.write(chunk)
})
```

可以在读取时设置编码，指定Buffer大小

```js
const readStream = createReadStream('./node.txt', {encoding: 'utf8',highWaterMark: 2 })
```

### http

http 服务相应大文件例子

一次加载文件后相应会占用大量内容，同时用户会等待

```js
import {readFile} from "fs";
import {createServer} from 'http';
const service = createServer((req,res)=>{
  readFile('1.txt',(error,content)=>{
    res.end(content)
  })
})
service.listen(3000)
```

现在改用 流 的方式，通过 Buffer 一块一块读取，然后响应数据

```js
import {createReadStream,readFile} from 'fs';
import {createServer} from 'http';
const service = createServer((req, res)=>{
  const readStream = createReadStream('1.txt');
  readStream.on('data',(c)=>{
    res.write(c)
  })
  readStream.on('end',()=>res.end())
})

service.listen(3000)
```

## 可写流

**可写流**是消费者上游流过来的数据

- 写入文件
- 压缩数据
- 接收客户端的请求
- 服务器响应数据到客户端

### 基本操作

使用可写流，将读取到的流写入到新文件，测试时需要一个特别大的node.json 才可以看到效果

```js
import {createReadStream,createWriteStream} from "fs";

const readStream = createReadStream('./node.json');
const writeStream = createWriteStream('./xj.json');

readStream.on('data',(chunk)=>{
  console.log('<读取了一个块...');
  writeStream.write(chunk);
  console.log('>写入了一个块')
})
```

### 流式写入

使用流生成 1000 行数据

```js
import {createWriteStream} from 'fs';

const stream = createWriteStream('1.txt');
for (let i=0;i<=1000;i++){
  stream.write('nodejs\n')
}
```

## PIPE管道

使用 PIPE 可以让我们对流的操作更简单

### 基本使用

流的读取与写入是通过事件监听手动操作的，可以通过**PIPE管道**简化该操作，从读取流中获取数据然后通过管道传递到写入流中完成数据的写入

使用管道不需要手动监听数据事件，管道颞部会自动完成，下面将上面**可写流**例子使用管道操作

```js
import {createReadStream,createWriteStream} from 'fs';

const readStream = createReadStream('./node.json');
const writeStream = createWriteStream('./xj.json');
//使用管道将可读流的数据，传递给可写流创建文件
readStream.pipe(writeStream)
```

### pipeline

使用**pipeline**工具函数可以实现管道操作，并可以方便的捕捉错误

```js
import {createReadStream,createWriteStream} from 'fs';
import {pipeline} from 'stream';

const readStream = createReadStream('1.txt');
const writeStream = createWriteStream('xj.txt');
pipeline(readStream,writeStream,(error)=>{
  console.log("出错了");
  throw error;
})
```

## 自定义可读流

既然**stream**贯穿**node**的应用，所以在**node**中有固定的规范，这样不用**stream**才可以协同工作，**pipe**管道才可以有效应用。下面来学习自定义流的控制，自定义流需要使用**node**内置的模块**stream**。

### 选项参数

可读流需要继承**Readable**类实现，通过构造函数产地的选项如下

- **encoding** 数据编码，如果设置了会将读取的 Buffer 数据转为字符串
- **objectMode** 缓冲区数据内同为 JS 对象
- **highWaterMark** 对于字符串数据为缓存区大小，对于 JS 对象为对象的数量

### 非流动性模式

非流动模式指我们对流自定义控制，通过监听 **radable** 事件完成

```js
import {Readable, ReadableOptions} from 'stream'

class HdReadStream extends Readable {
  //data:操作的流数据  options:可读流选项
  constructor(data, options = {}) {
    super(options)
  }

//向缓存区中推入数据
  _read(size) {
    this.push(this.data)
    //数据已经推入完毕,如果不设置将一直推入
    //你可以注释掉看看效果
    this.push(null)
  }
}

//创建流实例，并声明编码为 utf8，提出数据时将转换为 utf8 字符串
const node = new HdReadStream('nodejs', {encoding: 'utf-8'})

//非流动模式，手动控制流
node.on('readable', () => {
  let chunk = ''
  //每次读取一个字节数据
  //每读一次后，从缓冲区中删除一个字节，直到缓存区读完
  while ((chunk = node.read(1))) {
    //上面设置了 encoding:utf-8 ，数据会转为utf8字符串
    console.log(chunk)
  }
})
//数据读取完毕后的事件
node.on('end', () => console.log('数据读取完成'))
```

### 流动模式

流动模式指对流的控制自动完成，需要监听 **data** 事件完成，流动模式自动完成，所以操作更方便

使用流动模式操作对象数据

```js
import { Readable } from 'stream'

class HdReadStream extends Readable {
  //data:操作的流数据  options:可读流选项
  constructor(data, options = {}) {
  super(options)
}

//向缓存区中推入数据
_read(size) {
  this.push(JSON.stringify(this.data))
  //数据已经推入完毕,如果不设置将一直推入
  //你可以注释掉看看效果
  this.push(null)
}
}

//创建流实例，并声明编码为 utf8，提出数据时将转换为 utf8 字符串
const node = new HdReadStream([{ name: 'nodejs' }, { name: 'node' }], { encoding: 'utf-8', objectMode: true })

//非流动模式，手动控制流
node.on('data', (chunk) => {
  console.log(JSON.parse(chunk)[1].name)
})

//数据读取完毕后的事件
node.on('end', () => console.log('数据读取完成'))
//读取时发生错误
node.on('error', () => console.log('数据读取失败'))
```

## 自定义可写流

可写流需要继承 **Writable** 类实现。

```js
import { writeFile } from 'fs/promises'
import { Writable } from 'stream'

//自定义可写流
class HdWritableStream extends Writable {
  constructor(file, options = {}) {
    //objectMode: _write 方法的 chunk 参数为对象
    super({ ...options, objectMode: true })
    //创建文件或清空已存在文件内容
    writeFile(file, '')
  }
  
  _write(chunk, encoding, callback) {
  //使用 Promise 向文件中追加内容，并调用 callback 触发可写流事件
  writeFile(chunk.file, chunk.content, { flag: 'a' }).then(() => {
  callback()
})
}
}

const node = new HdWritableStream('node.txt')

//写入完成事件
node.on('finish', () => console.log('文件写入完成'))
//写入
node.write({ file: 'node.txt', content: 'nodejs写入' }, () => {
  console.log('文件写入成功')
})

node.write({ file: 'node.txt', content: ' 晚8点直播' })
```

## Transform 转换流

Transform流包含了Readable和Writeable特性，在读写过程中可以修改和变换数据

使用 Transform 流，将数据转换后使用可读流推入缓存区，然后使用 Transform 流将缓存区数据使用可写流处理

创建用户文件 **user.json**

```js
[
    {"name":"node","age":10},
    {"name":"next","age":25}
]
```

使用 **transform** 转换流完成实例。执行过程是使用 **createReadStream** 可读流读取 **user.json** 文件，然后使用 **createWriteStream** 写入文件

```js
import {createReadStream, createWriteStream} from 'fs'
import {pipeline, Transform} from 'stream'

// 定义 Transform 流
class HdTransformStream extends Transform {
  constructor(options = {}) {
    super(options)
  }
  
  //数据转换
  _transform(chunk, encoding, callback) {
    //数据转换为JS对象，提取年龄大于20用户名
    JSON.parse(String(chunk)).forEach((user) => {
      if (user.age > 20) this.push(`${user.name} \n`)
    })
    callback()
  }
  
  // 写入流结束前调用
  _flush(callback) {
    this.push('\nnodejs')
    callback()
  }
}
//读取
const readStream = createReadStream('./user.json')
//转换流
const hdTransform = new HdTransformStream()
//写入流
const writeStream = createWriteStream('./xj.txt')
//使用管道转换流
pipeline(readStream, hdTransform, writeStream, (error) => {
  if (error) console.log('执行失败', error)
})
```

## 文件上传

使用流并结合插件 [multiparty (opens new window)](https://www.npmjs.com/package/multiparty)扩展包实现文件上传

```js
import {createReadStream, createWriteStream, mkdirSync} from 'fs'
import {createServer} from 'http'
import multiparty from 'multiparty'
import {pipeline} from 'stream'

const service = createServer((req, res) => {
  const form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    //创建目录
    mkdirSync('uploads')
    
    //将临时文件使用流保存数据
    pipeline(
      createReadStream(files.file[0].path),
      createWriteStream('./uploads/' + files.file[0].originalFilename),
      (error) => {
        error ? console.log(error) : res.end('文件上传成功')
      },
    )
  })
})
service.listen(3000)
```

