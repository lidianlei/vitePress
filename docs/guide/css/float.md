# Float

## 浮动布局

float 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素。

### FLOAT

使用浮动可以控制相邻元素间的排列关系。

| 选项  | 说明     |
| ----- | -------- |
| left  | 向左浮动 |
| right | 向右浮动 |
| none  | 不浮动   |

### 文档流

没有设置浮动的块元素是独占一行的，浮动是对后面元素的影响

### 丢失空间

如果只给第一个元素设置浮动，第二个元素不设置，后面的元素会占用第一个元素空间。

### 使用浮动

两个元素都设置浮动后，会并排显示

### 浮动边界

浮动元素边界不能超过父元素的 padding

### 浮动转块

元素浮动后会变为块元素包括行元素如 `span`，所以浮动后的元素可以设置宽高

```css
a {
    float: left;
    width: 300px;
}
```

## 清除浮动

不希望元素受浮动元素影响时，可以清除浮动

### CLEAR

css提供了`clear`规则用于清楚元素浮动影响

| 选项  | 说明               |
| ----- | ------------------ |
| left  | 左边远离浮动元素   |
| right | 右连远离浮动元素   |
| both  | 左右都远离浮动元素 |

### AFTER

使用`::after`伪类父元素添加后标签，实现清楚浮动

```css
.clearfix::after{
    content:"";
    display:"block";
    clear:both;
}
```

### OVERFLOW	

子元素使用浮动后将不占用空间，这时父元素高度将为零，通过添加父元素`overflow`属性可以清楚浮动

将会使用父元素产生 `BFC` 机制，即父元素的高度计算会包括浮动元素的高度

```css
article {
    overflow: hidden;
}
```

## 页面布局

1. 首先根据设计稿确定页面大小（主要指宽度，移动端不需要考虑），如 1200px 宽度
2. 水平分割页面主要区域
3. 每个区域中按以上两步继续细分

## 形状浮动（shape-outside）

通过形状浮动可以让内容围绕图片，类似于我们在 word 中的环绕排版。要求图片是有透明度的 PNG 格式

### 距离控制

| 选项        | 说明       |
| ----------- | ---------- |
| margin-box  | 外边距环绕 |
| padding-box | 内边距环绕 |
| border-box  | 边线环绕   |
| content-box | 内容环绕   |

**外边距环绕**

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    padding: 30px;
    margin: 30px;
    border: solid 30px green;
    shape-outside: margin-box;
}
```

**边框环绕**

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    padding: 30px;
    margin: 30px;
    border: solid 30px green;
    shape-outside: border-box;
}
```

### 显示区域（clip-path）

| 选项    | 说明   |
| ------- | ------ |
| circle  | 圆形   |
| ellipse | 椭圆   |
| polygon | 多边形 |

**圆形**

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    padding: 30px;
    margin: 30px;
    background: red;
    clip-path: circle(50% at center);
}
```

**椭圆**

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    padding: 30px;
    margin: 30px;
    background: red;
    clip-path: ellipse(50% 80% at 100% 0);
}
```

**多边形**

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    padding: 30px;
    margin: 30px;
    background: red;
    clip-path: polygon(50% 0, 100% 100%, 0 100%)
}
```

### 内移距离（shape-outside）

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    padding: 30px;
    margin: 30px;
    background: red;
    shape-outside: inset(50px 30px 80px 50px) padding-box;
}
```

### 环绕模式

| 选项    | 说明     |
| ------- | -------- |
| circle  | 圆形环绕 |
| ellipse | 椭圆环绕 |
| url     | 图片环绕 |
| polygan | 多边环绕 |

**圆形环绕**

```css
img {
    padding: 20px;
    float: left;
    shape-outside: circle(50%) padding-box;
}
```

**椭圆环绕**

```css
img {
    padding: 20px;
    float: left;
    shape-outside: ellipse(80px 70px) padding-box;
}
```

**图片环绕**

```css
img {
    float: left;
    shape-outside: url(xj.png);
}
```

**多边环绕**

```css
span.shape {
    float: left;
    width: 100px;
    height: 100px;
    background: red;
    clip-path: polygon(50px 0px, 0 100px, 100px 100px);
    shape-outside: polygon(50px 0px, 0 100px, 100px 100px);
}
```