# Buffer

## 基础

在`node`开发中随处可见`Buffer`的使用，所以对`Buffer`的理解是很有必要的，对你更深刻的了解`node`很有帮助

> 在不了解Buffer的情况下，也不影响你使用 node.js

## 基本概念

在前端使用`JS`是不需要操作二进制数据，但在后端对大文件打开、写入等操作，需要处理二进制数据流

**Buffer**是用于存放二进制数据的缓存区（内存），比如我们读取大文件时，一次载入内存会占用大量内存，这种情况可以使用**Buffer**将数据一块一块加入到**Buffer**内存中，然后再以流的形式一段一段传递，这样减少内存占用，加快数据读取处理

也可以把**Buffer**理解为你在看在线视频时的缓冲区数据

现实生活类似，京东咋爱各地建立的仓储点，这个仓储点就是**Buffer**,有了这个仓储点就不需要从商家源头运货了，京东不断地保证仓储点有货，这可以保证最快的把货送到客户手里。

## 操作体验

- **Buffer**是全局类不需要引用其他模块
- **Buffer**是内存数据和大家了解的数组一样，只不过存储的是二进制

```js
const buffer = Buffer.from('nodejs');
console.log(buffer);//<Buffer 6e 6f 64 65 6a 73>

//返回的 JSON 表示形式，值为 unicode 码
console.log(buffer.toJSON());//{ type: 'Buffer', data: [ 110, 111, 100, 101, 106, 115 ] }

//转换为字符串
console.log(buffer.toString());//nodejs

//可以像数组一样，修改 Buffer 数据
buffer[0] = 18;
console.log(buffer.toString('utf-8'));
```

**定义Buffer 储存大小，超过大小的数据将被忽略**

```js
//定义 Buffer 空间为4个字节
const buffer = Buffer.alloc(4);
buffer.write('nodejs')
// 只能保存 node 4个字节数据
console.log(buffer.toString());//node
```

