# 起步入门

### 语言介绍

JavaScript 官方名称是 `ECMAScript` 是一种属于网络的脚本语言,已经被广泛用于 Web 应用开发,常用来为网页添加各式各样的动态功能,为用户提供更流畅美观的浏览效果

1995 年 2 月 Netscape 的`布兰登.艾奇`开发了针对网景公司的 `Netscape Navigator`浏览器的脚本语言 LiveScript。之后 Netscape 与 Sun 公司联盟后 LiveScript 更名为 JavaScript

微软在 javascript 发布后为了抢占市场推出了 JScript。为了让脚本语言规范不在混乱，根据 javascript 1.1 版本推出了 ECMA-262 的脚本语言标准

ECMA 是欧洲计算机制造商协会由 Sum、微软、NetScape 公司的程序员组成

### 适用场景

- 浏览器网页端开发
- 做为服务器后台语言使用[Node.js(opens new window)](https://nodejs.org/en/)
- 移动端手机 APP 开发，如 Facebook 的 [React Native (opens new window)](https://facebook.github.io/react-native/)、`uniapp`、`PhoneGap`、`IONIC`
- 跨平台的桌面应用程序，如使用 [electronjs(opens new window)](https://electronjs.org/)

> 所以 JS 是一专多能的语言，非常适合学习使用

### 兼容性

下面是 ES6 兼容性状况，你也可以在 [https://caniuse.com/ (opens new window)](https://caniuse.com/)网站查看

### 脚本定义

**内嵌脚本**

像 style 标签一样，可以在 html 文档中使用`script`标签嵌入 javascript 代码。

```js
alert('js');
```

**外部文件**

通过设置 `src` 属性引入外部 js 文件。

```html
<script src="js.js"></script>
```

引入外部文件在标签体内的脚本不会执行，下面的 alert 弹窗不会执行。

```html
<script src="js.js">
    alert('js');
</script>
```

### 避免延迟

如果 js 放在 `<head>` 标签中要等到 js 加载并解析后才会显示`<body>`标签中的内容

### 代码注释

和大部分语言使用的注释方式相仿，有单行和多行注释。

**单行注释**

```js
// 这是单行注释
```

**多行注释**

```js
/*
  这是多行注释体验
  请关注后盾人每晚直
  */
```

### 自动分号

使用分号表示一段指令的结束，当没有输入分号时如果有换行符 JS 会自动添加分号，减少错误的发生。

- 但推荐每个指令都以分号结束
- 在使用构建工具时，不使用分号结束可能会造成异常

```js
let stat = true;
if (stat) {
    document.write('js');
}
```

## 变量声明

### 命名规则

`JS`中的变量是弱类型可以保存所有类型的数据，即变量没有类型而值有类型。变量名以`字母、$、_ 开始，后跟字母、数字、_`

合法的命名

```js
let name = 'web';
let $='js';
```

JS 语言关键字不能用来做变量名，比如 `true、if、while、class` 等

```js
let class = 'js';
```

### 变量声明

使用多种方式定义变量比如 var、let 等

```js
let name = 'web';
```

代码是声明和赋值的结合

```js
let name ;
name = 'js';
```

使用`,` 可以同时声明多个变量

```js
let n = 2,f = 3;
console.log(f);//3
```

变量可以更换不同类型的数据

```js
let web = 'js';
console.log(typeof web);//string

num = 18;
console.log(typeof num);//number
```

### 弱类型

在`JS`中变量类型由所引用的值决定的

```js
var web = "js";
console.log(typeof web); //string
web = 10;
console.log(typeof web); //number
web = {};
console.log(typeof web); //object
```

### 变量提升

解析器会先解释代码，然后把声明的变量提升到最前，这就叫变量提升

```js
var web = 'js';
console.log(web);
let while = 'ts'; //Unexpected strict mode reserved word
```

使用 `var` 声明代码会被提升到前面

```js
console.log(a); //undefined
var a = 1;
console.log(a);  //1

//以上代码解析器执行过程如下
var a;
console.log(a); //undefined
a = 1;
console.log(a); //1
```

`if(false)` 中定义的 var 也会发生变量提升，注释掉`if` 结果会不同

```js
var web = "js";
function func() {
  if (false) {
    var web = "ts";
  }
  console.log(web);//undefined
}
func();
```

使用 `var` 定义的代码，声明会被提升到前面，赋值还在原位置

```js
console.log(web);
var web = 'js';

//以上代码解析器执行过程如下
var web;
console.log(web); //
web = 'ts';
```

### TDZ

`TDZ`又称暂时性死区，指变量在作用域内已经存在，但必须在`let / const`声明后才可以使用

`TDZ`可以让程序保持先声明后使用的习惯，让程序更稳定

- 变量要先声明后使用
- 建议使用`let / const`而少使用`var`

使用`let / const`声明的变量在声明前存在临时性死区（TDZ）使用会发生错误

```js
console.log(x); // Cannot access 'x' before initialization
let x = 1;
```

在`run`函数作用域中产生 TDZ，不允许变量在未声明前使用

```js
web = "js";
function run() {
  console.log(web);// Cannot access 'web' before initialization
  let web = "ts";
}
run();
```

 b 没有声明赋值不允许直接使用

```js
function func(a = b, b = 3) {}
func(); //Cannot access 'b' before initialization
```

因为 a 已经赋值，所以 b 可以使用 a 变量，下面代码访问正常

```js
function func(a = 2, b = a) {}
func();
```

## 块作用域

### 共同点

`var / let / const`共同点是全局作用域中定义的变量，可以在函数中使用

```js
var web = 'js';
function show() {
  return web;
}
console.log(show());//js
```

函数中声明的变量，只能在函数及其子函数中使用

```js
function func() {
  var web = "js";

  function show() {
    console.log(web);
  }
  show(); //子函数结果: js
  console.log(web); //函数结果: js
}
func();
console.log(web); //web is not defined
```

函数中声明的变量就像声明了私有领地，外部无法访问

```js
var web = "js";
function func() {
  var web = "ts";
  console.log(web); //ts
}
func();
console.log(web); //js
```

### var

使用 `var` 声明的变量存在于最近的函数或全局作用域中，没有块级作用域的机制。

没有块作用域很容易污染全局，下面函数中的变量污染了全局环境

```js
function run() {
  web = "js";
}
run();
console.log(web); //js
```

没有块作用作用域时 var 也会污染全局

```js
for (var i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i);//10
```

使用`let`有块作用域时则不会

```js
let i = 100;
for (let i = 0; i < 6; i++) {
  console.log(i);
}
console.log(i);//100
```

`var` 没有块作用域概念， `do/while` 定义的变量可以在块外部访问到

```js
var num = 0;
function show() {
  var step = 10;
  do {
    var res = 0;
    console.log(num = step++);
    res = num;
  } while (step < 20);
  console.log(`结果是${res}`);
}
show();//结果是19
```

`var` 全局声明的变量也存在于 `window`对象中

```js
var web = "js";
console.log(window.web); //js
```

以往没有`块作用域时`使用`立即执行函数`模拟块作用域

```js
(function() {
  var $ = this.$ = {};
  $.web = "js";
}.bind(window)());
console.log($.web);//js
```

有了块作用域后实现就变得简单多了

```js
{
  let $ = (window.$ = {});
  $.web = "js";
}
console.log($.web);
```

### let

与 `var` 声明的区别是 `let/const` 拥有块作用域，下面代码演示了块外部是无法访问到`let`声明的变量。

- 建议将`let`在代码块前声明
- 用逗号分隔定义多个

`let`存在块作用域特性，变量只在块域中有效

```js
if (true) {
  let web = 'js',url = 'js';
  console.log(web); //js
}
console.log(web); //web is not defined
```

块内部是可以访问到上层作用域的变量

```js
if (true) {
  let user = "js";
  (function() {
    if (true) {
      console.log(`这是块内访问：${user}`);
    }
  })();
}
console.log(user);// user is not defined
```

每一层都是独立作用域，里层作用域可以声明外层作用域同名变量，但不会改变外层变量

```js
function run() {
  web = "js";
  if (true) {
    let web = "ts";
    console.log(web); //ts
  }
  console.log(web); //js
}
run();
```

### const

使用 `const` 用来声明常量，这与其他语言差别不大，比如可以用来声明后台接口的 URI 地址

- 常量名建议全部大写
- 只能声明一次变量
- 声明时必须同时赋值
- 不允许再次全新赋值
- 可以修改引用类型变量的值
- 拥有块、函数、全局作用域

常量不允许全新赋值举例

```js
try {
  const name = "web";
  name = "js"; //产生错误
} catch (error) {
  throw new Error(error);
}
```

改变常量的引用类型值

```js
const INFO = {
  web: 'ts',
  num: 1
};
INFO.num = '11';
console.log(INFO);//{web: 'ts', num: '11'}
```

在不同作用域中可以重名定义常量

```js
const NAME = 'web';
function show() {
  const NAME = 'name';
  return NAME;
}
console.log(show());//name
console.log(NAME);//web
```

### 重复定义

使用 var 可能造成不小心定义了同名变量

```js
//name
var name = "js";
//商品价格
var name = "ts";
console.log(name);//ts
```

使用`let` 可以避免上面的问题，因为 let 声明后的变量不允许在同一作用域中重新声明

```js
let web = 'js';
let web = 'ts'; //Identifier 'web' has already been declared
```

不同作用域可以重新声明

```js
let web = 'js';
if (true) {
  let web = 'ts'; //Identifier 'web' has already been declared
}
```

但可以改变值这是与 const 不同点

```js
let price = 90;
price = 88;
console.log(`商品价格是:${price}`);//88
```

`let` 全局声明的变量不存在于 `window`对象中，这与`var`声明不同

```js
let web = "js";
console.log(window.web); //undefined
```

### Object.freeze

如果冻结变量后，变量也不可以修改了，使用严格模式会报出错误

```js
const INFO = {
  name: 'web',
  web: 'js'
};
Object.freeze(INFO);
INFO.web = 'ts'; //Cannot assign to read only property 'web' of object '#<Object>'
console.log(INFO);
```

### 传值与传址

根据数据类型数值、字符串等简单数据类型，引用类型指对象数据类型

基本类型复制是值的复制，互相不受影响

```js
let a = 100;
let b = a;
a = 200;
console.log(b);//100
```

对于引用类型来讲，变量保存的是引用对象的指针。变量间赋值时其实赋值是变量的指针，这样多个变量就引用的是同一个对象

```js
let a = {
  web: "js"
};
let b = a;
a.web = "ts";
console.log(b);//ts
```

## undefined

对声明但未赋值的变量返回类型为 `undefined` 表示值未定义

```js
let defin;
console.log(typeof defin);//undefined;
```

函数参数或无返回值是为`undefined`

```js
function func(web) {
  console.log(web); //undefined
  return web;
}
console.log(func()); //undefined
```

### null

`null` 用于定义一个空对象，即如果变量要用来保存引用类型，可以在初始化时将其设置为 null

## 严格模式

严格模式可以让我们及早发现错误，使代码更安全规范，推荐在代码中一直保持严格模式运行

### 基本差异

变量必须使用关键词声明，未声明的变量不允许赋值

```js
"use strict";
url = 'js'; //url is not defined
```

强制声明防止污染全局

```js
function run() {
  web = "js";
}
run();
console.log(web); // web is not defined
```

关键词不允许做变量使用

```js
var public = 'js';
```

变量参数不允许重复定义

```js
function func(name, name) {}
```

单独为函数设置严格模式

```js
function strict(){
  "use strict";
  return "严格模式";
}
function notStrict() {
  return "正常模式";
}
```

为了在多文件合并时，防止全局设置严格模式对其他没使用严格模式文件的影响，将脚本放在一个执行函数中

```js
(function () {
  "use strict";
  name = 'web';
})();
```

### 解构差异

非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明

```js
({name,url} = {name:'web',web:'js'});
console.log(name, url);
```