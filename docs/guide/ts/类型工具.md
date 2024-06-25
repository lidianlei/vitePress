# 类型工具

## is

**is 用于定义变量属于某个类型**

```ts
const isString = (x: unknown): boolean => typeof x === 'string'
function func(a: unknown) {
  if (isString(a)) {
    //error: 对象的类型为 "unknown"。
    a.toUpperCase()
  }
}
let a = 'ab'
func(a)
```

现在重新定义 isString 函数，使用 is 来定义变量为某个类型

- x is string 表示如果函数返回值为 true，则 x 为 string 类型

```ts
const isString = (x: unknown): x is string => typeof x === 'string'
function func(a: unknown) {
  if (isString(a)) {
    a.toUpperCase()
  }
}
let a = 'ab'
func(a)
```

## keyof

**获取类、接口索引组成的联合类型**

- keyof 可用于基本数据类型、any、class、interface、enum 等

任何类型都可以使用 keyof

```ts
type TYPE = keyof string
let str: TYPE = '11'
```

索引类型使用 keyof 时，获取索引名

```ts
type TYPE = keyof { name: string, age: number }
let str: TYPE = 'name'
```

### typeof

使用 typeof 可获取变量的类型

```TS
let str = '张三'
// type TYPE = string
type TYPE = typeof str
```

使用 typeof 获取对象的

```ts
let obj = { name: '张三', age: 18 }

/**
 type TYPE = {
  name: string;
  age: number;
 */
type TYPE = typeof obj
```

keyof 与 typeof 结合定义获取对象属性的函数

```ts
function getAttribute(obj: object, key: string) {
  return obj[key as keyof typeof obj]
}

const obj = { name: '张三' }
getAttribute(obj, 'name')
```

## in

in 用于遍历接口或联合类型的属性

- K in keyof T 指 K 类型为 keyof T 获取的 T 类型索引组成的联合类型

```ts
type USER = { name: string, age: number }
type MEMBER<T> = {
  [K in keyof T]: T[K]
}
const obj: MEMBER<USER & { address: string }> = {
  age: 18, name: '张三', address: '山东',
}
```

## extends

extends 在 TS 中拥有多个特性

### 类型继承

extends 实现类型的继承

```ts
type TYPE = { name: string }
interface typez extends TYPE {
  age: number
}
const obj: typez = { age: 18, name: '张三' }
```

extends 可用于泛型的类型限定

```ts
function func<T extends { id: number; render(n: number): number }>(arr: T[]) {
  arr.map((a) => a.render(a.id))
}
func([{ id: 1, render(n) { return n } }])
```

### 类型条件判断

extends 用于条件判断来决定返回什么类型，`A extends B ? true:false`。如果 A（狭窄类型） 可以赋予 B（宽泛类型） 类型则为 true

```ts
type TYPE = { name: string, age: number }
type TYPE1 = { name: string }
type TYPE2 = TYPE1 extends TYPE ? true : false
const OBJ: TYPE2 = false
```

联合类型的条件判断

```ts
type TYPE1 = string
type TYPE2 = string | number
const str1: TYPE2 extends TYPE1 ? string : boolean = false //boolean
const str2: TYPE1 extends TYPE2 ? string : boolean = '张三' //string
```

根据联合类型过滤掉指定索引

```ts
type User = { name: string, age: number, get(): void };
type FilterObjectProperty<T, U> = {
  [K in keyof T as Exclude<K, U>]: T[K]
}
type HD = FilterObjectProperty<User, 'name' | 'age'>
```

过滤掉指定的类型，以下代码含有下面几个含义

- 根据类型获取索引组合成的联合类型
- 根据新的联合类型提取出指定的索引，组合成新的类型

```ts
type USER = { name: string, age: number, get(a: string): void }
type FilterProperty<T, U> = {
  [K in keyof T]: T[K] extends U ? never : K
}[keyof T]
type UserType = Pick<USER, FilterProperty<USER, Function | number>>
```

### 泛型条件分配

如果泛型是普通类型，则与上面一样也是判断左侧类型是否可赋予右侧类型

```ts
type TYPE = string
type NAME<T> = T extends TYPE ? string : boolean
const str: NAME<string> = '张三' //string
```

如果 extends 是泛型类型，并且传入的类型是联合类型。则分别进行判断，最后得到联合类型。

```ts
type TYPE = string
type NAME<T> = T extends TYPE ? string : boolean
const bol: NAME<string | number> = false //string | boolean
```

条件判断也可以嵌套使用

```TS
type TYPE = string
type TYPE1 = string | number
type NAME<T> =
  T extends TYPE ? string :
    T extends TYPE1 ? symbol : boolean

const hd: NAME<string | number> = '张三'
```

使用**[]**包裹类型，表示使用泛型的整体进行比较

```TS
type TYPE = string | number
type TYPE1 = string | number
type NAME<T> = [T] extends [TYPE] ? string : boolean
const hd: NAME<string | number> = '张三' //string
```

## Exclude

- 从 T 泛型类型 中过滤掉 U 的类型
- never 是任何类型的子类型，可以赋值给任何类型，没有类型是 never 的子类型或可以赋值给 never 类型(never 本身除外)

```TS
type EXCLUDE<T, U> = T extends U ? never : T
type TYPE1 = string
type TYPE2 = string | number
const num: EXCLUDE<TYPE2, TYPE1> = 100; //number
```

事实上 typescript 已经提供了 Exclude 关键字用于完成上面的工作，所以我们不需要单独定义 Exclude 类型了

```ts
type TYPE1 = string
type TYPE2 = string | number
const num: Exclude<TYPE2, TYPE1> = 100;
```

## Extract

Extract 与 Exclude 相反，用于获取相交的类型。

```ts
type TYPE1<T, U> = T extends U ? T : never;
type TYPE2 = string | number | boolean
const str: TYPE1<TYPE2, string | number> = '张三';
```

取两个类型相同的属性名

```ts
type TYPE1 = string | number | boolean
const str: Extract<TYPE1, string | number> = '张三';
```

## Pick

pick 可以用于从属性中挑选出一组属性，组成新的类型。

定义 pick 类型用于从`TYPE1`类型中挑选出 name 与 age 类型

```ts
type TYPE1 = { name: string, age: number, skill: string }
type PICK<T, U extends keyof T> = {
  [P in U]: T[P]
}
type HD = PICK<TYPE1, 'name' | 'age'>
const obj: HD = { name: '张三', age: 18 }
```

typescript 已经原生提供了 Pick 类型，所以我们不用像上面那样自己定义了

```ts
type TYPE1 = { name: string, age: number, skill: string }
type HD = Pick<TYPE1, 'name' | 'age'>
const obj: HD = { name: '张三', age: 18 }
```

## Omit

从类型中过滤掉指定属性，这与 Pick 类型工具功能相反

```ts
type OBJ = { name: string, age: number, city: string }

type MyOmit<T, U> = Pick<T, {
  [K in keyof T]: K extends U ? never : K
}[keyof T]>
type obj = MyOmit<OBJ, 'name' | 'age'> //{city:string}
```

可以将上面代码使用 Exclude 优化

```ts
type OBJ = { name: string, age: number, city: string }
type MyOmit<T, U> = Pick<T, Exclude<keyof T, U>>
type obj = MyOmit<OBJ, 'name' | 'age'> //{city:string}
```

typescript 已经提供了类型工具 Omit

```ts
type OBJ = { name: string, age: number, city: string }
type obj = Omit<OBJ, 'name' | 'age'> //{city:string}
```

## Partial

定义 Partial 类型，用于将全部属性设置为可选

```TS
type TYPE = { name: string, age: number }

type PARTIAL<T> = {
  [P in keyof T]?: T[P]
}
const obj: PARTIAL<TYPE> = { name: '张三' } // {name?:string,age?:number}
```

Typescript 原生提供了 Partial 的支持，所以我们不用自己定义了

```TS
type TYPE = { name: string, age: number }
const obj: Partial<TYPE> = { name: '向军' }
```

## Record

Record 常用于快速定义对象类型使用

实现一个 Record，RECORD 类型的第一个参数为索引，第二个为类型

```ts
type RECORD<K extends string | number | symbol, V> = {
  [P in K]: V
}
type OBJ = RECORD<'name' | 'age', string | number>
const obj: OBJ = { name: "张三", age: 18 }
```

typescript 原生已经提供了 Record 类型，下面定义 MEMBER 类型，索引为字符串，值为任何类型

```ts
type OBJ = Record<'name' | 'age', any>
const obj: OBJ = { name: "张三", age: 18}
```

## infer

- infer 只能在 extends 中使用
- infer 的类型变量，只能在 extends 条件的 true 中使用

使用 infer 推断属性值类型

```ts
type OBJ = { name: string, age: number }
type AttrType<T> = T extends { name: infer M, age: infer M } ? M : T
type valueType = AttrType<OBJ> //string | number
```

使用 infer 获取值类型

```ts
type USER = { name: string, age: number, get(a: string): void }
type GetType<T> = {
  [K in keyof T]: T[K] extends (infer U) ? U : K
}[keyof T]
type valueType = GetType<USER>;
```

获取函数返回值类型

```ts
type OBJ = (n: string) => number[]
type GetFunctionReturnValue<T> = T extends ((...args: any) => (infer U)[]) ? U : T
type valueType = GetFunctionReturnValue<OBJ>;
```