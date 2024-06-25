# 选择器

## 基本选择器

| 选择器          | 示例       | 描述                           |
| :-------------- | ---------- | :----------------------------- |
| .class          | .intro     | 选择 class="intro" 的所有元素  |
| #id             | #firstname | 选择 id="firstname" 的所有元素 |
| *               | *          | 选择所有元素                   |
| element         | p          | 选择所有元素                   |
| element,element | div,p      | 选择所有元素和所有元素         |
| element element | div p      | 选择元素内部的所有元素         |
| element>element | div>p      | 选择父元素为元素的所有元素     |
| element+element | div+p      | 选择紧接在元素之后的所有元素   |

### 标签选择

使用 `*` 可为所有元素设置样式

```css
/*通配符选择器*/
*{}
/*根据标签为元素设置样式*/
h1{
    color:red;
}
/*同时设置多个元素组合*/
h1,h2{
    color:red;
}
```

### 类选择器

```css
.class{}
span.class{}  //将类选择器指定为具体标签
```

### ID 选择器

```css
#container {
    background: red;
}
```

## 结构选择器

| 选择器           | 示例  | 描述                               |
| :--------------- | ----- | :--------------------------------- |
| element element  | div p | 选择元素内部的所有元素             |
| element>element  | div>p | 选择父元素为元素的所有元素         |
| element+element  | div+p | 选择紧接在元素之后的元素           |
| element~element2 | p~ul  | 选择元素同级并在元素后面的所有元素 |

### 后代选择器

`HTML`中元素是以父子级、兄弟关系存在的，后代选择器指元素后的元素（不只是子元素，而是后代元素）

```css
main article h2,main h1 {
    color: green;
}
```

### 子元素选择器

```css
main article>h2 {
    color: green;
}
```

### 紧邻兄弟选元素

用于选择紧挨着的同级兄弟元素

```css
main article+h2 {
    color: green;
}
```

### 后面兄弟元素

```css
main article~* {
    color: green;
}
```

## 属性选择器

根据属性来为元素设置样式也是常用的场景

| 选择器              | 示例            | 描述                                                         |
| ------------------- | --------------- | ------------------------------------------------------------ |
| [attribute]         | [target]        | 带有`target `属性所有元素                                    |
| [attribute=value]   | [target=_blank] | `target`属性等于"_blank"的所有元素                           |
| [attribute~=value]  | [title~=value]  | `title`属性包含单词“value”的所有元素                         |
| [attribute\|=value] | [title\|=value] | `title`属性值为`value`的单词或`value-class`以`-`连接的独立单词 |
| [attribute*=value]  | a[src*=“value”] | `src`属性中包含`value`字母的每个`a`元素                      |
| [attribute^=value]  | a[src^="https"] | `src`属性值以“https”开头的每个`a`元素                        |
| [attribute$=value]  | a[src$=".jpeg"] | `src`属性以“.jpeg”结尾的所有`a`元素                          |

为具有 `class` 属性的 h1 标签设置样式

```css
h1[class] {
    color: red;
}
```

约束多个属性

```css
h1[class][id]{
    color:red;
}
```

具有属性值设置样式

```css
a[href="https://www.baidu.com/"] {
    color: green;
}
```

`^` 以指定值开头的元素

```css
h2[name^="https"] {
    color: red;
}
```

## 伪类选择器

为元素的不同状态或不确定存在的元素设置样式规则。

:::tip 提示

同级别的第几个，不区分类别

:::

| 状态               | 示例                | 说明                        |
| ------------------ | ------------------- | --------------------------- |
| :first-child       | p:first-child       | 选中同级别的第一个标签      |
| :last-child        | p:last-child        | 选中同级别中的最后一个标签  |
| :nth-child(n)      | p:nth-child(n)      | 选中同级别中的第n个标签     |
| :nth-last-child(n) | p:nth-last-child(n) | 选中同级别中的倒数第n个标签 |
| :only-child        | p:only-child        | 选中父元素中唯一的标签      |

:::tip 提示

同级别同类型的第几个

:::

| 状态                 | 示例                  | 说明                             |
| -------------------- | --------------------- | -------------------------------- |
| :first-of-type       | p:first-of-type       | 选中同级别同类型的第一个标签     |
| :last-of-type        | p:last-of-type        | 选中同级别中同类型的最后一个标签 |
| :nth-of-type(n)      | p:nth-of-type(n)      | 选中同级别中同类型的第n个标签    |
| :nth-last-of-type(n) | p:nth-last-of-type(n) | 选中同级别同类型的倒数第n个标签  |
| :only-of-type        | p:only-of-type        | 选中父元素唯一类型的某个标签     |

:::tip 提示

其他

:::

| 状态               | 示例                | 说明                                             |
| ------------------ | ------------------- | ------------------------------------------------ |
| :nth-child(odd)    | p:nth-child(odd)    | 选中同级别中所有的奇数                           |
| :nth-child(even)   | p:nth-child(even)   | 选中同级别中的所有偶数                           |
| :nth-child(xn+y)   | p:nth-child(xn+y)   | x和y是用户自定义的，而n是一个计数器，从0开始递增 |
| :nth-of-type(n)    | p:nth-of-type(2)    | 选择属于其父元素第二个 p 元素的每个 p 元素。     |
| :nth-of-type(odd)  | p:nth-of-type(odd)  | 选中同级别中同类型的所有奇数                     |
| :nth-of-type(even) | p:nth-of-type(even) | 选中同级别中同类型的所有偶数                     |
| :nth-of-type(xn+y) | p:nth-of-type(xn+y) | x和y是用户自定义的, 而n是一个计数器, 从0开始递增 |
| :not(selector)     | :not(p)             | 选择非 p 元素的每个元素                          |

:::tip 提示

伪类选择器

:::

| 状态     | 示例         | 说明                                   |
| -------- | ------------ | -------------------------------------- |
| :link    | a:link       | 选择所有未被访问的链接                 |
| :visited | a:visited    | 选择所有已被访问的链接                 |
| :hover   | a:hover      | 鼠标移动到元素上时                     |
| :active  | a:active     | 点击正在发生时                         |
| :focus   | input::focus | 选择获得焦点的 input 元素              |
| :root    | :root        | 选择文档的根元素即html                 |
| :empty   | p:empty      | 选择没有子元素的每个元素（包括文本节点 |

### :超链接伪类

定义链接的不同状态

```css
a:link {
    color: red
}
a:visited {
    color: green
}
a:hover {
    color: blue
}
a:active {
    color: yellow
}
```

不只是链接可以使用伪类，其他元素也可以使用

```css
input:focus {
    background: green;
}
input:hover {
    background: blue;
}
input:active {
    background: yellow;
}
```

### :target

用于控制具有锚点目标元素的样式

```css
div:target {
	color: red;
}
```

### :root

根元素选择伪类即选择 html

```css
:root {
    font-size: 100px;
}
```

### :empty

没有内容和空白的元素

```css
:empty {
    border: solid 2px red;
}
```

## 表单

| 选择器    | 示例           | 说明                        |
| --------- | -------------- | --------------------------- |
| :enabled  | input:enabled  | 选择每个启用的`input`元素   |
| :disabled | input:enabled  | 选择每个禁用的`input`元素   |
| :checked  | input:checked  | 选择每个被选中的`input`元素 |
| :required | input:required | 包含`required`属性的元素    |
| :optional | input:optional | 不包含`required`属性的元素  |
| :valid    | input:valid    | 验证通过的表单元素          |
| :invalid  | input:invalid  | 验证不通过的表单            |

## 字符伪类

| 状态           | 示例            | 说明                            |
| -------------- | --------------- | ------------------------------- |
| ::first-letter | p::first-letter | 选择每个`p`元素的首字母         |
| ::first-line   | p::first-line   | 选择每个`p`元素的首行           |
| ::before       | p::before       | 在每个`p`元素的内容之前插入内容 |
| ::after        | p::after        | 在每个 p 元素的内容之后插入内容 |

### 首字母大写

```css
p::first-letter {
    text-transform: uppercase;
}
```

### 段落首行处理

```CSS
p::first-line {
    font-size:20px;
}
```

### 在元素前添加

```css
span::before {
    content: '⇰';
    color: red;
}
span::after {
    content: '⟲';
    color: green;
}
```

### 添加属性内容

```css
h2::before {
    content: attr(title);
}
//<h2 title="css">web前端</h2>
```
