# Map

`Map`是一组键值对的结构，用于解决以往不能用对象作为键的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

## 声明定义

可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组

```js
let map = new Map([
  ['js', 'web1'],
  ['ts','web2']
]);
console.log(map.get('js'));//web1
```

使用`set`方法添加元素，支持链式操作

```js
let map = new Map();
let obj = {
  web:"js"
}
map.set(obj,'ts').set('name','vue')
console.log(map.entries());//MapIterator{{…} => 'ts', 'name' => 'vue'}
```

使用构造函数`new Map`创建的原理

```js
const map = new Map();
const arr = [["web1","js"],["web2","ts"]];

arr.forEach(([key,value]) =>{
  map.set(key,value);
})
console.log(map);//Map(2){'web1' => 'js', 'web2' => 'ts'}
```

### 获取数量 size

```js
console.log(map.size)
```

### 元素检测 has

```js
console.log(map.has("js"))
```

### 读取元素

```js
let map = new Map();
let obj = {
  web:"js"
}
map.set(obj,"ts");
console.log(map.get(obj));//ts
```

### 删除元素

使用`delete()`方法删除单个元素

```js
let map = new Map();
let obj = {
  web:"js"
}
map.set(obj,"ts")
console.log(map.get(obj));//ts
map.delete(obj);
console.log(map.get(obj));//undefined
```

使用`clear`方法清除`Map`所有元素

```js
let map = new Map();
let obj1 = {
  web:"js"
}
let obj2 ={
  web:"ts"
}
map.set(obj1,{
  title:"TS"
})
map.set(obj2,{
  title:"JS"
})
console.log(map.size);//2
map.clear()
console.log(map.size);//0
```

### 遍历数据

使用`keys() / values() / entries()` 都可以返回可遍历的迭代对象

```js
let map = new Map([["web1","js"],["web2","ts"]]);
console.log(map.keys());//MapIterator{'web1', 'web2'}
console.log(map.values());//MapIterator{'js', 'ts'}
console.log(map.entries());//MapIterator{'web1' => 'js', 'web2' => 'ts'}
```

可以使用`keys / values`函数遍历键值对

```js
let map = new Map([["web1","js"],["web2","ts"]]);
for (const key of map.keys()) {
  console.log(key);
}
for (const value of map.values()) {
  console.log(value);
}
```

**使用`for/of`遍历操作，直播遍历Map 等同于使用`entries()` 函数**

```js
let map = new Map([["web1","js"],["web2","ts"]]);
for (const [key, value] of map) {
  console.log(`${key}=>${value}`);
}
```

**使用`forEach`遍历操作**

```js
let map = new Map([["web1","js"],["web2","ts"]]);

map.forEach((value, key) =>{
  console.log(`${key}=>${value}`);
})
```

### 数组转换

可以使用`展开语法`或`Array.form`静态方法将`Set`类型转为数组，这样就可以使用数组处理函数

```js
let map = new Map([['web1',"js"],['web2','ts']]);
console.log(...map);//['web1', 'js'] ['web2', 'ts']
console.log(...map.entries());//['web1', 'js'] ['web2', 'ts']
console.log(...map.values());//js ts
console.log(...map.keys());//web1 web2
```

检测包含`js`的值组成新Map

```js
let map = new Map([["web1","js"],["web2","ts"]]);
let newArr = [...map].filter(function (item) {
  return item[1].includes("js");
})
map = new Map(newArr)
console.log(...map.keys());//web1
console.log(...map.values());//js
```

### 节点集合

`map`的`key`可以为任意类型

```js
const divMap = new Map();
const divs = document.querySelectorAll("div");
console.log(divs);//NodeList(2)
divs.forEach(div=>{
  divMap.set(div,{
    content:div.getAttribute("desc")
  })
})
console.log(divMap);//Map(2){div => {…}, div => {…}}
divMap.forEach((config,elem) => {
  elem.addEventListener("click", function() {
    alert(divMap.get(this).content);
  });
})
```

## WeakMap

`WeakMap`对象是一组键 / 值对的集

- 键名必须是对象
- `WeakMap`对键名是弱引用的，键值是正常引用的
- 垃圾回收不考虑`WeakMap`的键名，不会改变引用计数器，键在其他地方不被引用即删除
- 因为`WeakMap`是弱引用，由于其他地方操作成员可能不存在，所以不可以进行`forEach()`遍历等操作
- 也是因为弱引用，`WeakMap`结构没有`keys() values() entries()`等方法和`size`属性
- 当键的外部引用删除时，希望自动删除数据时使用`WeakMap`

### 声明定义

```js
new WeakSet("js")//Invalid value used in weak set
```

将DOM节点保存到`WeakSet`

```js
const set = new WeakMap();
document.querySelectorAll("div").forEach(item=>set.set(item,item.innerHTML));
console.log(set);//WeakMap{div => 'js', div => 'ts'}
```

### 基本操作

`WeakSet`的常用指令

```js
const map = new WeakMap();
const arr = ["js"];

//添加操作
map.set(arr, "ts");
console.log(map.has(arr)); //true

//删除操作
map.delete(arr);

//检索判断
console.log(map.has(arr));//false
```

### 垃圾回收

`WeakMap`的键名对象不会增加引用计数器，如果一个对象不被引用了会自动删除

- 当`obj`删除时内存即清除，因为WeakMap是弱引用不会产生引用计数
- 当垃圾回收时因为对象被删除，这时WeakMap也就没有记录了

```js
let map = new WeakMap();
let obj = {};
map.set(obj, "js");
console.log(map);//WeakMap{{…} => 'js'}
obj = null;
console.log(map);//WeakMap{{…} => 'js'}

setTimeout(function () {
  console.log(map);
},500)//WeakMap{}
```