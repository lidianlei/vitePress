# http

Node 提供简单易用的 HTTP 服务，同样继承于 EventEmitter 类

## 基本使用

创建http服务器，并监听**request**事件，处理用户请求并向客户端发送响应

- **res.write**向客户端响应内容
- **res.end**响应完毕，也可以一次设置响应内容

```js
import http from 'http'
//创建服务
const service = http.createServer()
//客户端请求事件
service.on('request', (req, res) => {
  console.log(req.method)
  //向客户端响应内容
  res.write('nodejs')
  //告之客户端数据响应完毕
  res.end()
})

//监听端口
service.listen(8080,'localhost', () => {
  console.log('HOST: http://localhost:8080')
})
```

通过设置 **http.createServer** 的回调函数，来监听 **request** 事件

### 主机名

如果不设置主机名，或设置为**0.0.0.0** 表示允许任何 IP 访问，这样局域网其他电脑可以通过 IP 当问到你的项目

设置主机名为**localhost** 或 **127.0.0.1** 只允许本机访问

可以通过**ifconfig** 查看本机 IP 地址，然后通过 IP 地址进行访问

```js
service.listen(3000, '0.0.0.0', () => {
  console.log('HOST: http://localhost:3000')
})
```

**设置第二个参数主机设置为 **127.0.0.1**，表示只允许本地访问**

```js
service.listen(3000, '127.0.0.1', () => {
  console.log('HOST: http://localhost:3000')
})
```

### 头信息

通过 **setHeader** 与 **statusCode** 设置响应头

响应 HTML 数据，并设置编码为 utf-8

```js
import http from 'http';
//创建服务
const service = http.createServer((req,res)=>{
  //设置状态码 200 并指定响应类型与编码
  res.writeHead(200,{
    'Content-type':"text/html;charset=utf-8"
  })
  //响应数据
  res.end(`<h1>nodejs</h1>`)
})
//监听端口
service.listen(8080,()=>{
  console.log('HOST: http://localhost:8080')
})
```

**通过 res.writeHead 同时设置状态码与响应头信息**

```js
import http from "http";
//创建服务
const service = http.createServer((req,res)=>{
  //设置头信息
  res.writeHead(200,{
    'Content-Type':"application/json"
  })
  //响应数据
  res.end(JSON.stringify({name:"nodejs"}))
})
//监听端口
service.listen(8080,()=>{
  console.log('HOST: http://localhost:8080')
})

```

### 页面跳转

通过设置头信息进行页面跳转

```js
import {createServer} from "http";

const service = createServer((req,res)=>{
  res.statusCode=301;
  res.setHeader('location','https://www.baidu.com');
  res.end();
})

service.listen(8080)
```

## 路由基础

创建简单的路由，即根据请求响应不同结果

```js
import {createServer} from "http";

const service = createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader("Content-type","text/html;charset=utf8");
  switch (req.url){
    case '/home':
      res.write(`<h1>nodejs</h1>`)
      res.end();
      break
    case '/about':
      res.end('<h2>关于我们</h2>')
      break
    case '/user':
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ name: 'admin' }))
      break
    default:
      res.end('404')
  }
})

service.listen(8080, () => {
  console.log(`host: http://localhost:8080`)
})
```

## 响应数据

客户端响应数据

### HTML

通过设置头信心来告知浏览器，服务器端响应的是 HTML 数据

```js
import {pipeline} from "stream";
import {createReadStream} from "fs";
import {createServer} from "http";

const service = createServer((req,res)=>{
  res.writeHead(200,{
    "Content-type":"text/html;charset=utf8"
  });
  pipeline(createReadStream("index.html"),res,()=>{})
})

service.listen(8080, () => {
  console.log(`host: http://localhost:8080`)
})
```

### JSON

后端作为接口是，需要传递 JSON 数据给前端

```js
import {createServer} from "http";
const user = [{name:"nodejs"},{name:"vue"}];
const service = createServer((req,res)=>{
  res.writeHead(200,{
    'Content-type':"application/json"
  });
  res.end(JSON.stringify(user))
})

service.listen(8080, () => {
  console.log(`host: http://localhost:8080`)
})
```

### 变量解析

演示模板变量的替换流程，首先创建模板文件 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title></title>
</head>
<body>
{{name}} 欢迎你
</body>
</html>
```

后台逻辑

```js
import {readFileSync} from 'fs';
import {createServer} from "http";

const service=createServer((req,res)=>{
  res.writeHead(200,{
    "Content-type":"text/html"
  });
  //模板变量
  const vars = {name:"nodejs"};;
  //加载模板
  const template = readFileSync(__dirname + '/index.html', 'utf-8');
  //替换模板变量
  const content = template.replace(/\{\{(.*?)\}\}/gi, (match, ...args) => {
    return vars[args[0]]
  });
  res.end(content);
})
service.listen(8080, () => {
  console.log(`host: http://localhost:8080`)
})
```

## 表单数据

获取客户端表单数据

### 基本原理

```js
import {createServer} from "http";

const users = [];
const service = createServer((req,res)=>{
  res.statusCode=200;
  res.setHeader("Content-Type","text/html;charset=utf8");
  if (req.method=='POST'&&req.url=='/user'){
    req.on('data',(data)=>{
      //buffer 转换
      const user = data.toString();
      //转为 JSON 对象报错
      user.push(JSON.parse(user));
      req.pipe(res)
    })
  }
  if (req.method=="GET"&&req.url=='/user'){
    res.end(JSON.stringify(users))
  }
})
service.listen(8080, () => {
  console.log(`host: http://localhost:8080`)
})
```

### 使用扩展包

使用 [multiparty (opens new window)](https://www.npmjs.com/package/multiparty)包解析前端非常方便，下面使用流并结合插件 [multiparty (opens new window)](https://www.npmjs.com/package/multiparty)扩展包实现文件上传

```js
import { createReadStream, createWriteStream, mkdirSync } from 'fs'
import { createServer } from 'http'
import multiparty from 'multiparty'
import { pipeline } from 'stream'

const service = createServer((req, res) => {
  var form = new multiparty.Form()
  form.parse(req, function (err, fields, files) {
    //创建目录
    mkdirSync('uploads');
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

