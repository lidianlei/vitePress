# Symbol

`Symbol`用于防止属性名冲突而产生的，比如向第三方对象中添加属性时

`Symbol`的值是唯一的，独一无二的不会重复的

## 基础知识

### Symbol

```js
let sym1 = Symbol();
let sym2 = Symbol();

console.log(sym1);//Symbol()
console.log(sym1 === sym2);//false
```

**`Symbol`不可以添加属性**

### 描述参数

可传入字符串用于描述`Symbol`，方便在控制台分辨`Symbol`

```js
let sym1 = Symbol("is name");
let sym2 = Symbol("这是一个测试");

console.log(sym1); //Symbol(is name)
console.log(sym2.toString()); //Symbol(这是一个测试)
console.log(typeof sym2.toString()); //string
```

传入相同参数`Symbol`也是独立唯一的，因为参数只是描述而已，但使用`Symbol.for`则不会

```js
let sym1 = Symbol("js");
let sym2 = Symbol("js");
console.log(sym1 === sym2); //false
```

**使用`description`可以获取传入的描述参数**

```js
let sym = Symbol("js");
console.log(sym.description); js
```

### Symbol.for

根据描述获取`Symbol`，如果不存在则新建一个`Symbol`

- 使用`Symbol.for`会在系统中将`Synbol`登记
- 使用`Symbol`则不会登记

```js
let sym1 = Symbol.for("js");
let sym2 = Symbol.for("js");
console.log(sym1 === sym2); //true
```

### Symbol.keyFor

`Symbol.keyFor`根据使用`Symbol.for`等级的`Symbol`返回描述，如果找不到返回`undefined`

```js
let sym1 = Symbol.for("js");
console.log(Symbol.keyFor(sym1)); //js

let sym2 = Symbol("vue");
console.log(Symbol.keyFor(sym2)); //undefined
```

### 对象属性

`Symbol`是独一无二的所以可以保证对象属性的唯一

- `Symbol`声明和访问使用`[]`（变量）形式操作
- 也不能使用`.`语法，因为`.`语法是操作字符串属性的

下面写法是错误的，会将`symbol`当成字符串`symbol`处理

```js
let symbol = Symbol("js");
let obj = {
  symbol: "ts"
};
console.log(obj);//{symbol: 'ts'}
```

**正确写法是以`[]` 变量形式声明和访问**

```js
let symbol = Symbol("js");
let obj = {
  [symbol]: "ts"
};
console.log(obj[symbol]); //ts
```

## 实例操作

### 缓存操作

使用`Symbol`可以解决在报错数据时由于名称相同造成的耦合覆盖问题

```js
class Cache {
  static data = {};
  static set(name, value) {
    this.data[name] = value;
  }
  static get(name) {
    return this.data[name];
  }
}

let web1 = {
  name: "web",
  key: Symbol("js")
};

let web2 = {
  name: "web",
  key: Symbol("ts")
};
Cache.set(web1.key, web1);
Cache.set(web2.key, web2);
console.log(Cache.get(web1.key));//{name: 'web', key: Symbol(js)}
console.log(Cache.get(web2.key));//{name: 'web', key: Symbol(ts)}
```

### 遍历属性

Symbol 不能使用 `for/in`、`for/of` 遍历操作

```js
let symbol = Symbol("js");
let obj = {
  name: "web",
  [symbol]: "ts"
};

for (const key in obj) {
  console.log(key); //name
}

for (const key of Object.keys(obj)) {
  console.log(key); //name
}
```

**可以使用`Object.getOwnPropertySymbols`获取所有`Symbol`属性**

```js
for (const key of Object.getOwnPropertySymbols(obj)) {
  console.log(key);//Symbol(js)
}
```

**使用`Reflect.ownKeys(obj)`获取所有包括`Symbol`**

```js
for (const key of Reflect.ownKeys(obj)) {
  console.log(key); //name  Symbol(js)
}
```

**如果对象不想被遍历，可以使用`Symbol`保护**

```js
const site = Symbol("js");
class User {
  constructor(name) {
    this[site] = "web";
    this.name = name;
  }
  getName() {
    return `${this[site]}-${this.name}`;
  }
}
const use = new User("ts");
console.log(use.getName());
for (const key in use) {
  console.log(key);
}
```