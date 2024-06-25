# Set

用于存储任何类型的唯一值，无论是基本类型还是对象引用

- 只能保存值没有键名
- 严格类型检测如字符串不等于数值型数字
- 值时唯一的
- 遍历顺序时添加的顺序，方便保存回调函数

## 基本使用

对象可以属性最终都会转为字符串

```js
let obj = { 1: "js", "1": "ts" };
console.log(obj); //{1: 'ts'}
```

**使用对象作为键名时，会将对象转为字符串后使用**

```js
let obj = {1:"js","1":"ts"};
console.log(obj);//{1: 'ts'}

let obj1 = {[obj]:"vue"}
console.log(obj1);//{[object Object]: 'vue'}
console.log(obj[obj.toString()]);//undefined
console.log(obj1["[object Object]"]);//vue
```

**使用数组做初始数据**

```js
let set = new Set(["js", "ts"]);
console.log(set.values());//SetIterator{'js', 'ts'}
```

**`Set`中是严格类型约束的，下面的数值`1`与字符串`1`属于两个不同的值**

```js
let set = new Set();
set.add(1);
set.add("1");
console.log(set); //Set(2) {1, "1"}
```

**使用`add`添加元素，不允许重复添加`js`值**

```js
let set = new Set();
set.add('js');
set.add('ts');
set.add('ts');
console.log(set.values());//SetIterator{'js', 'ts'}
```

### 获取数量

```js
let set = new Set(["js","ts"]);
console.log(set.size);//2
```

### 元素检测

```js
let set = new Set();
set.add("js", "ts");
console.log(set.has("js", "ts"));//true
```

### 删除元素

使用`delete`方法删除单个元素，返回值为`boolean`类型

```js
let set = new Set();
set.add("js");
set.add("ts");

console.log(set.delete("ts"));//true
console.log(set.values());//SetIterator{'js'}
console.log(set.has("ts"));//false
```

***使用`clear`删除所有元素**

```js
let set = new Set();
set.add('js');
set.add('ts');
set.clear();

console.log(set.values());//SetIterator{}
```

### 数组转换

可以使用`点语法`或`Array.form`静态方法将`Set`类型转换为数组，这样就可以使用数组处理函数了

```js
const set = new Set(["js","ts"]);
console.log([...set]);//['js', 'ts']
console.log(Array.from(set));//['js', 'ts']
```

移除`Set`中大于`5`的数值

```js
let set = new Set("123456789");
set = new Set([...set].filter(item => item < 5));
console.log(set);//Set(4){'1', '2', '3', '4'}
```

### 去除重复

**去除字符重复**

```js
console.log([...new Set("javascript")].join(""));//javscript
```

**去除数组重复**

```js
const arr = [1, 2, 3, 4, 5, 6, 1, 2, 3]
console.log(...new Set(arr))//1 2 3 4 5 6
```

### 遍历数据

使用`keys() / values() / entries()`都可以返回迭代对象，因为`set`类型只有值所以`keys`与`values`方法结果一致

```js
const set = new Set(["js","ts","vue"]);
console.log(set.values());//SetIterator{'js', 'ts', 'vue'}
console.log(set.keys());//SetIterator{'js', 'ts', 'vue'}
console.log(set.entries());//SetIterator{'js' => 'js', 'ts' => 'ts', 'vue' => 'vue'}
```

可以使用`forEach`遍历`Set`数据，默认使用`values`方法创建迭代器

为了保持和遍历数组参数统一，函数中的`value`与`key`是一样的

```js
let arr = [1,4,6,83,21,2]
let set = new Set(arr);
set.forEach((item,key) => console.log(item,key));
```

也可以使用 `forof` 遍历Set数据，默认使用 `values` 方法创建迭代器

```js
let set = new Set([7, 6, 2, 8, 2, 6]);

for (const iterator of set) {
  console.log(iterator); // 7 6 2 8
}
```

### 交集

获取两个集合共同存在的元素

```js
let set = new Set(["js","ts"]);
let set1 = new Set(["vue","ts"]);

let newSet = new Set(
  [...set].filter(item => set1.has(item))
)
console.log(newSet);//Set(1){'ts'}
```

### 差集

在集合a中出现但不在集合b中出现元素集

```js
let set = new Set(["js","ts"]);
let set1 = new Set(["vue","ts"]);

let newSet = new Set(
  [...set].filter(item => !set1.has(item))
)
console.log(newSet);//Set(1){'js'}
```

### 并集

将两个集合合并成一个新的集合，由于Set特性当然也不会产生重复元素

```js
let set = new Set(["js","ts"]);
let set1 = new Set(["vue","ts"]);

let newSet = new Set([...set,...set1]);
console.log(newSet);//Set(3){'js', 'ts', 'vue'}
```

## WeakSet

`WeakSet`结构同样不会存储重复的值，他的成员必须只能是对象类型的值

- 垃圾回收不考虑`WeakSet`，即被`WeakSet`引用时计数器不加一，所以对象不被引用时不管`WeakSet`是否在使用都将删除
- 因为`WeakSet`是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行`forEach()`遍历等操作
- 也是因为弱引用，`WeakSet`结构没有`keys(),values(),entries()`等方法和`size`属性
- 因为是弱引用所以当外部引用删除时，希望自动删除数据时使用`WeakMap`

### 声明定义

由于初级部署对象类型将产生错误

```js
new WeakSet(["js", "ts"]); //Invalid value used in weak set
new WeakSet("vue"); //Invalid value used in weak set
```

**`WeakSet`的值必须为对象类型**

```js
let set = new WeakSet([["js"], ["ts"]]);
console.log(set);//WeakSet{Array(1), Array(1)}
```

**将DOM节点保存到`WeakSet`**

```js
document.querySelectorAll("button").forEach(item => Wset.add(item));
```

### 基本操作

```js
const set = new WeakSet();
const arr = ["ts"];
//添加操作
set.add(arr);
console.log(set.has(arr));

//删除操作
set.delete(arr);

//检索判断
console.log(set.has(arr));
```

### 垃圾回收

`WeakSet`保存的对象不会增加引用计数器，如果一个对象不被引用了会自动删除

- 下列中的数组被`arr`引用了，引用计数器+ 1
- 数据又添加到了 set 的 `WeakSet`中，引用计数器还是 1
- 当 `arr`设置为`null`时，引用计数`-1`此时对象引用为`0`
- 当垃圾回收时对象被删除，这是`WeakSet`也就没有记录了

```js
const set = new WeakSet();
let arr = ["js"];
set.add(arr);
console.log(set.has(arr));//true

arr = null;
console.log(set);//WeakSet{Array(1)}

setTimeout(()=>{
  console.log(set);
},1000)//WeakSet{}
```

### 案例操作

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }
    body {
        padding: 200px;
    }
    ul {
        list-style: none;
        display: flex;
        width: 200px;
        flex-direction: column;
    }
    li {
        height: 30px;
        border: solid 2px #e67e22;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        color: #333;
        transition: 1s;
    }
    a {
        border-radius: 3px;
        width: 20px;
        height: 20px;
        text-decoration: none;
        text-align: center;
        background: #16a085;
        color: white;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
    }
    .remove {
        border: solid 2px #eee;
        opacity: 0.8;
        color: #eee;
    }
    .remove a {
        background: #eee;
    }
</style>

<body>
    <ul>
        <li>houdunren.com <a href="javascript:;">x</a></li>
        <li>hdcms.com <a href="javascript:;">x</a></li>
        <li>houdunwang.com <a href="javascript:;">x</a></li>
    </ul>
</body>

<script>
    class Todos {
        constructor() {}
        run() {
            this.items = document.querySelectorAll("ul>li");
            this.lists = new WeakSet();
            this.record();
            this.addEvent();
        }
        addEvent() {
            this.items.forEach(item => {
                item.querySelector("a").addEventListener("click", event => {
                    //检测WakeSet中是否存在Li元素
                    const parentElement = event.target.parentElement;
                    if (!this.lists.has(parentElement)) {
                        alert("已经删除此TODO");
                    } else {
                        //删除后从记录的WakeSet中移除
                        parentElement.classList.add("remove");
                        this.lists.delete(parentElement);
                    }
                });
            });
        }
        record() {
            this.items.forEach(item => this.lists.add(item));
        }
    }
    new Todos().run();
</script>
```