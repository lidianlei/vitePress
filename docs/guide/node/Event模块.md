# Event模块

## 基础

**Node**使用**发布订阅模式**实现 Event 事件，`node`中的事件对象都是**events.EventEmitter**对象的实例*。在 Node 中多数模块都继承了事件，如`fs、http、stream`；

**常用方法**

- on 方法用于订阅监听事件
- emit 方法用于触发事件
- once 订阅一次事件，即执行后删除事件
- removeListener 移除事件
- removeAllListeners 移除所有事件

## 基本使用

- 注册多个事件监听

  ```js
  import EventEmitter from 'events';
  
  const event = new EventEmitter();
  //监听事件
  event.on('nodejs',(content)=>{
    console.log(`第一次触发时间：${content}`);
  })
  //监听事件
  event.on('nodejs',(content)=>{
    console.log(`第二次触发时间：${content}`);
  })
  console.log('事件驱动是异步的，所以这行代码先执行');
  //触发事件
  event.emit('nodejs','测试nodejs');
  //执行结果
  //事件驱动是异步的，所以这行代码先执行
  //第一次触发时间：测试nodejs
  //第二次触发时间：测试nodejs
  ```

  **once指注册一次事件监听，触发后就移除事件监听**

  ```js
  import EventEmitter from "events";
  const event = new EventEmitter();
  //监听事件
  event.once('nodejs',(content)=>{
    console.log(`第1次触发事件：${content}`)
  })
  let res = event.emit('nodejs','node')
  console.log(res);//true
  
  res = event.emit('nodejs','node');
  console.log(res);//false
  ```

  ## 自定义事件

  **EventEmitter**对象被继承来使用

```js
import EventEmitter from 'events'

class Uploader extends EventEmitter {
  constructor() {
    super()
  }
  make(file) {
    this.emit('success', `${file}-文件上传成功`)
  }
}
const uploadHandler = new Uploader()
uploadHandler.on('success', (message) => {
  console.log(message);//a.jpg-文件上传成功
})
uploadHandler.make('a.jpg');
```

## 事件信息

**listeners**可以获取指定事件的监听函数

```js
import EventEmitter from "events";
const event = new EventEmitter();
event.on('nodejs',()=>{
  console.log(1);
})
event.on('nodejs',()=>{
  console.log(2);
})
console.log(event.listeners('nodejs'));
event.listeners('nodejs').forEach((func)=>func());//1  2  
```

**listenerCount**获取指定事件的监听数量

```js
import EventEmitter from 'events';
const event = new EventEmitter();
event.on('nodejs',()=>{});
event.on('nodejs',()=>{});
console.log(event.listenerCount('nodejs'));//2
```

## 移除事件

使用**removeListener**移除已经注册的事件监听，参数一为事件名，参数二为监听函数

- **off**是**removeListener**别名

  ```js
  import EventEmitter from 'events';
  const event = new EventEmitter();
  
  //监听事件
  const listener = (content)=>{
    console.log(`第1次触发事件：${content}`)
  }
  event.on('nodejs',listener);
  event.removeListener('nodejs',listener);
  
  const res = event.emit('nodejs','node');
  console.log(res);//false
  ```

**使用 removeAllListeners 移除所有监听，不需要指定监听函数**

```js
import EventEmitter from 'events'
const event = new EventEmitter()
//监听事件
const listener = (content) => {
  console.log(`第1次触发事件：${content}`)
}
event.on('nodejs', listener)
//移除所有监听
event.removeAllListeners('nodejs')

const res = event.emit('nodejs', 'node')
console.log(res) //false
```

