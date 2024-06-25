# Ajax

## 基础知识

浏览器天生具发送`HTTP`请求的能力，比如在在址栏输入内容，提交`FORM`表单等。本章来学习通过`JS`程序来管理`HTTP`请求的能力。

使用`JS`脚本发送`HTTP`请求，不会带来页面的刷新，所以用户体验非常好

## XHLHttpRequest

使用`XMLHttpRequest`发送请求，是一种存在很久的方案。现代浏览器支持使用`fetch`的异步请求方式，`fetch`基于`promise`异步操作体验更好

### 基本使用

使用`XMLHttpRequest`发送请求需要执行以下几步

1. 使用`new XMLHttpRequest`创建`xhr`对象
2. `xhr.open`初始化请求参数
3. `xhr.send`发送网络请求
4. `xhr.onload`监听请求结果
5. `xhr.onerror`请求中断等错误发生时的处理

### 响应类型

通过设置`xhr.responseType`对响应结果进行声明，来对结果自动进行处理

可以使用的响应类型

| 类型     | 说明                                             |
| -------- | ------------------------------------------------ |
| text     | 响应结果为文本                                   |
| json     | 响应结果为`JSON`，系统会自动将结果转为`JSON`对象 |
| blob     | 二进制数据响应                                   |
| document | `XML DOCUMENT`内容                               |

### 使用示例

```js
const xhr = new XMLHttpRequest();
xhr.timeout = 5000;
xhr.open('GET', 'web.js');
xhr.send();
xhr.onload = function () {
  if (xhr.status == 200) {
    console.log(xhr.response);
  }else {
    console.log(xhr.status);
  }
}
xhr.onerror = function (e) {
  console.log(e);
}
```

### 发送表单

使用`XMLHttpRequest`发送`POST`请求

**异步请求**

```js
const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  //阻止默认事件
  e.preventDefault();
  post("web.js",new FormData(this))
})

function post(url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.send(data);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.response);
    } else {
      console.log(xhr.status);
    }
  }
}
```

### 封装请求类

结合`Promise`来构建一个`XHR`异步处理类，使异步请求操作变得更简单

```js
class WEB {
  options = {
    responseType: 'json',
  }

  constructor(method = "GET", url, data = null, options) {
    this.method = method;
    this.url = url;
    this.data = this.formatData(data);
    Object.assign(this.options, options)
  }

  formatData(data) {
    if (typeof data != 'object' || data == null) data = {}
    let form = new FormData()
    for (const [name, value] of Object.entries(data)) {
      form.append(name, value)
    }

    return form
  }

  static get(url, options) {
    return new this("GET", url, null, options).xhr();
  }

  xhr() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(this.method, this.url);
      xhr.responseType = this.options.responseType;
      xhr.send(this.data);
      xhr.onload = function () {
        if (xhr.status !== 200) {
          reject(new Error)
        } else {
          resolve(xhr.response)
        }
      }
      xhr.onerror = function (error) {
        reject(error)
      }
    })
  }
}
```

使用 WEB.get 静态方法发送 GET 请求

```js
WEB.get('web.js', { 
    responseType: 'text',
}).then((response) => {
	console.log(response)
})
```

使用 WEB.get 静态方法发送 POST 请求

```js
WEB.post('web.js', data, {
  responseType: 'json',
}).then((response) => {
  console.log(response)
})
```

## FETCH

`FETCH`是`JS`升级后提供的更简便的网络请求的操作方法，内部使用`Promise`来完成的异步请求

- `response.json()`接收`JSON`类型数据
- `response.text()`接收`TEXT`类型数据
- `response.blog()`接收`Blog`二进制数据

### 请求步骤

使用`fetch`方法发送异步请求需要分以下两个步骤

#### 响应头解析

第一步对服务器返回的响应头进行解析，会接到`Request`类创建的对象实例，里面包含以下属性

- `status.HTTP`状态码
- `ok:`状态码为`200-299`时为`true`的布尔值

#### 响应内容解析

第二部对返回的保存在`resonse.body`中的响应结果进行解析，支持以下几种方式对结果进行解析

- response.json()接收 JSON 类型数据
- response.text()接收 TEXT 类型数据
- response.blog()接收 Blog 二进制数据

> 以上方法不能同时使用，因为使用一个方法后数据已经被处理，其他方法就不可以操作了

#### 发送请求

使用`fetch`发送`GET`请求

```js
fetch(`web.js`).then(response => {
  return response.json()
}).then(articles => {
  console.log(articles)
})
```

因为`fetch`结果是 `promise`所以也可以使用`async/await`操作

```js
async function query() {
  const response = await fetch(`web.js`)
  const articles = await response.json()
  console.log(articles)
}
query()
```

### POST请求

发送 POST 请求需要设置请求头 Request header

#### 发送请求

- 发送的 JSON 类型需要设置请求头为 `application/json;charset=utf-8`

```js
async function post() {
  const response = await fetch(`web.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ name: 'web' }),
  })
  if (response.ok) {
    const articles = await response.json()
    console.log(articles)
  }
}
post()
```
### axios封装

```js
export default function ajax(url = '', params = {}, type = 'GET') {
    // 1. 变量
    let promise;

    // 2. 返回一个promise对象
    return new Promise((resolve, reject) => {
        // 2.1 判断请求的类型
        if (type.toUpperCase() === 'GET') { // get请求
            // 2.2 拼接字符串
            let paramsStr = '';
            // 2.3 遍历
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&';
            });
            // 2.4 过滤最后的&
            if (paramsStr) {
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
            }
            // 2.5 拼接完整路径
            url += '?' + paramsStr;
            // 2.6 发起get请求
            promise = axios.get(url);
        } else if (type.toUpperCase() === 'POST') { // post请求
            // 2.7 发起post请求
            promise = axios.post(url, params);
        }
        // 2.8 处理结果并返回
        promise.then((response) => {
             resolve(response.data);
        }).catch(error => {
             reject(error);
        })
    });
}
```
