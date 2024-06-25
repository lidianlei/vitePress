# Canvas

## 基础知识

获取元素

```js
const el = document.getElementById("canvas");
```

然后，创建 context 对象

*getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法*

```js
const ctx = el.getContext("2d")
```

设置fillStyle属性可以是CSS颜色，渐变，或图案。fillStyle 默认设置是#000000（黑色）

```js
ctx.fillStyle = "red"
```

fillRect(*x,y,width,height*) 方法定义了矩形当前的填充方式

```js
ctx.fillRect(0,0,175,200)
```

### 颜色、样式和阴影

| 属性                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [fillStyle](https://www.runoob.com/tags/canvas-fillstyle.html) | 设置或返回用于填充绘画的颜色、渐变或模式 |
| [strokeStyle](https://www.runoob.com/tags/canvas-strokestyle.html) | 设置或返回用于笔触的颜色、渐变或模式     |
| [shadowColor](https://www.runoob.com/tags/canvas-shadowcolor.html) | 设置或返回用于阴影的颜色                 |
| [shadowBlur](https://www.runoob.com/tags/canvas-shadowblur.html) | 设置或返回用于阴影的模糊级别             |
| [shadowOffsetX](https://www.runoob.com/tags/canvas-shadowoffsetx.html) | 设置或返回阴影与形状的水平距离           |
| [shadowOffsetY](https://www.runoob.com/tags/canvas-shadowoffsety.html) | 设置或返回阴影与形状的垂直距离           |

| 方法                                                         | 描述                                    |
| :----------------------------------------------------------- | :-------------------------------------- |
| [createLinearGradient()](https://www.runoob.com/tags/canvas-createlineargradient.html) | 创建线性渐变（用在画布内容上）          |
| [createPattern()](https://www.runoob.com/tags/canvas-createpattern.html) | 在指定的方向上重复指定的元素            |
| [createRadialGradient()](https://www.runoob.com/tags/canvas-createradialgradient.html) | 创建放射状/环形的渐变（用在画布内容上） |
| [addColorStop()](https://www.runoob.com/tags/canvas-addcolorstop.html) | 规定渐变对象中的颜色和停止位置          |

### 线条样式

| 属性                                                         | 描述                                       |
| :----------------------------------------------------------- | :----------------------------------------- |
| [lineCap](https://www.runoob.com/tags/canvas-linecap.html)   | 设置或返回线条的结束端点样式               |
| [lineJoin](https://www.runoob.com/tags/canvas-linejoin.html) | 设置或返回两条线相交时，所创建的拐角类型。 |
| [lineWidth](https://www.runoob.com/tags/canvas-linewidth.html) | 设置或返回当前的线条宽度                   |
| [miterLimit](https://www.runoob.com/tags/canvas-miterlimit.html) | 设置或返回最大斜接长度                     |

### 矩形

| 方法                                                         | 描述                         |
| :----------------------------------------------------------- | :--------------------------- |
| [rect()](https://www.runoob.com/tags/canvas-rect.html)       | 创建矩形                     |
| [fillRect()](https://www.runoob.com/tags/canvas-fillrect.html) | 绘制"被填充"的矩形           |
| [strokeRect()](https://www.runoob.com/tags/canvas-strokerect.html) | 绘制矩形（无填充）           |
| [clearRect()](https://www.runoob.com/tags/canvas-clearrect.html) | 在给定的矩形内清除指定的像素 |

### 路径

| 方法                                                         | 描述                                                    |
| :----------------------------------------------------------- | :------------------------------------------------------ |
| [fill()](https://www.runoob.com/tags/canvas-fill.html)       | 填充当前绘图（路径）                                    |
| [stroke()](https://www.runoob.com/tags/canvas-stroke.html)   | 绘制已定义的路径                                        |
| [beginPath()](https://www.runoob.com/tags/canvas-beginpath.html) | 起始一条路径，或重置当前路径                            |
| [moveTo()](https://www.runoob.com/tags/canvas-moveto.html)   | 把路径移动到画布中的指定点，不创建线条                  |
| [closePath()](https://www.runoob.com/tags/canvas-closepath.html) | 创建从当前点回到起始点的路径                            |
| [lineTo()](https://www.runoob.com/tags/canvas-lineto.html)   | 添加一个新点，然后在画布中创建从该点到最后指定点的线条  |
| [clip()](https://www.runoob.com/tags/canvas-clip.html)       | 从原始画布剪切任意形状和尺寸的区域                      |
| [quadraticCurveTo()](https://www.runoob.com/tags/canvas-quadraticcurveto.html) | 创建二次贝塞尔曲线                                      |
| [bezierCurveTo()](https://www.runoob.com/tags/canvas-beziercurveto.html) | 创建三次贝塞尔曲线                                      |
| [arc()](https://www.runoob.com/tags/canvas-arc.html)         | 创建弧/曲线（用于创建圆形或部分圆）                     |
| [arcTo()](https://www.runoob.com/tags/canvas-arcto.html)     | 创建两切线之间的弧/曲线                                 |
| [isPointInPath()](https://www.runoob.com/tags/canvas-ispointinpath.html) | 如果指定的点位于当前路径中，则返回 true，否则返回 false |

### 转换

| 方法                                                         | 描述                                           |
| :----------------------------------------------------------- | :--------------------------------------------- |
| [scale()](https://www.runoob.com/tags/canvas-scale.html)     | 缩放当前绘图至更大或更小                       |
| [rotate()](https://www.runoob.com/tags/canvas-rotate.html)   | 旋转当前绘图                                   |
| [translate()](https://www.runoob.com/tags/canvas-translate.html) | 重新映射画布上的 (0,0) 位置                    |
| [transform()](https://www.runoob.com/tags/canvas-transform.html) | 替换绘图的当前转换矩阵                         |
| [setTransform()](https://www.runoob.com/tags/canvas-settransform.html) | 将当前转换重置为单位矩阵。然后运行 transform() |

### 文本

| 属性                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [font](https://www.runoob.com/tags/canvas-font.html)         | 设置或返回文本内容的当前字体属性         |
| [textAlign](https://www.runoob.com/tags/canvas-textalign.html) | 设置或返回文本内容的当前对齐方式         |
| [textBaseline](https://www.runoob.com/tags/canvas-textbaseline.html) | 设置或返回在绘制文本时使用的当前文本基线 |

| 方法                                                         | 描述                       |
| :----------------------------------------------------------- | :------------------------- |
| [fillText()](https://www.runoob.com/tags/canvas-filltext.html) | 在画布上绘制"被填充的"文本 |
| [strokeText()](https://www.runoob.com/tags/canvas-stroketext.html) | 在画布上绘制文本（无填充） |
| [measureText()](https://www.runoob.com/tags/canvas-measuretext.html) | 返回包含指定文本宽度的对象 |

### 图像绘制

| 方法                                                         | 描述                         |
| :----------------------------------------------------------- | :--------------------------- |
| [drawImage()](https://www.runoob.com/tags/canvas-drawimage.html) | 向画布上绘制图像、画布或视频 |

### 像素操作

| 属性                                                         | 描述                                                |
| :----------------------------------------------------------- | :-------------------------------------------------- |
| [width](https://www.runoob.com/tags/canvas-imagedata-width.html) | 返回 ImageData 对象的宽度                           |
| [height](https://www.runoob.com/tags/canvas-imagedata-height.html) | 返回 ImageData 对象的高度                           |
| [data](https://www.runoob.com/tags/canvas-imagedata-data.html) | 返回一个对象，其包含指定的 ImageData 对象的图像数据 |

| 方法                                                         | 描述                                                      |
| :----------------------------------------------------------- | :-------------------------------------------------------- |
| [createImageData()](https://www.runoob.com/tags/canvas-createimagedata.html) | 创建新的、空白的 ImageData 对象                           |
| [getImageData()](https://www.runoob.com/tags/canvas-getimagedata.html) | 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据 |
| [putImageData()](https://www.runoob.com/tags/canvas-putimagedata.html) | 把图像数据（从指定的 ImageData 对象）放回画布上           |

### 合成

| 属性                                                         | 描述                                   |
| :----------------------------------------------------------- | :------------------------------------- |
| [globalAlpha](https://www.runoob.com/tags/canvas-globalalpha.html) | 设置或返回绘图的当前 alpha 或透明值    |
| [globalCompositeOperation](https://www.runoob.com/tags/canvas-globalcompositeoperation.html) | 设置或返回新图像如何绘制到已有的图像上 |

### 其他

| 方法          | 描述                           |
| :------------ | :----------------------------- |
| save()        | 保存当前环境的状态             |
| restore()     | 返回之前保存过的路径状态和属性 |
| createEvent() |                                |
| getContext()  |                                |
| toDataURL()   |                                |

## 项目模板

因为使用到了 Typescript，所以我们使用 vite 创建 typescript 项目，并选择使用 `vanilla` 模板来开发

```text
$ yarn create vite
```

项目安装执行结果

```text
执行结果
✔ Project name: 
✔ Select a framework: › vanilla
✔ Select a variant: › vanilla-ts
```

目录结构

```text
├── images				 		//图片文件
│   └── p2.jpeg
├── index.html				//项目模板文件
├── package.json			//项目配置文件
├── src
│   ├── main.ts				//项目主文件，我们在这里编码
│   ├── style.css			//公共样式
│   └── vite-env.d.ts	//TS类型声明文件
├── tsconfig.json			//TS配置文件
└── yarn.lock					//扩展包版本锁定文件
```

##  矩形绘制

使用 strokeRect 方法绘制边框矩形

### 实心矩形 fillRect

使用`fillRect`方法可以绘制实心矩形，下面是 fillRect 方法的参数说明

| 参数   | 说明                 |
| :----- | :------------------- |
| x      | 矩形左上角的 x 坐标  |
| y      | 矩形左上角的 y 坐标  |
| width  | 矩形的宽度，以像素计 |
| height | 矩形的高度，以像素计 |

纯色填充画布

```ts
const el = document.querySelector<HTMLCanvasElement>('#canvas')!
const ctx = el.getContext("2d")!;
ctx.fillStyle = '#16a085'
ctx.fillRect(0,0,300,300)
```

### 空心矩形 strokeRect 

使用`strokeRect`方法可以绘制空心矩形

```ts
const el = document.querySelector<HTMLCanvasElement>('#canvas')!
//画布对象
const ctx = el.getContext("2d")!;
//定义填充颜色
ctx.fillStyle = '#16a085';
//线条宽度
ctx.lineWidth=30;
//边角类型： bevel 斜角  round圆角  miter 尖角
ctx.lineJoin="round"
//绘制矩形边框
ctx.strokeRect(50, 50, 300, 300)
```

## 圆形绘制

### arc

| 参数               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| x                  | 圆的中心的 x 坐标。                                          |
| *y*                | 圆的中心的 y 坐标。                                          |
| *r*                | 圆的半径。                                                   |
| *sAngle*           | 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。          |
| *eAngle*           | 结束角，以弧度计。                                           |
| *counterclockwise* | 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针 |

### 绘制空心圆

**beginPath() 方法开始一条路径，或重置当前的路径**

**stroke()绘制已定义的路径**

```ts
const el = document.querySelector<HTMLCanvasElement>('#canvas')!
//画布对象
const ctx = el.getContext("2d")!;
//填充画布颜色
ctx.beginPath()
ctx.strokeStyle = "red";
ctx.lineWidth=20;
ctx.arc(100,100,60,0,2*Math.PI)
ctx.stroke()
```

### 绘制实心圆

**fill() 填充当前绘图（路径）**

```ts
const el = document.querySelector<HTMLCanvasElement>('#canvas')!
//画布对象
const ctx = el.getContext("2d")!;
//填充画布颜色
ctx.beginPath();
ctx.fillStyle="f1c40f";
ctx.lineWidth=20;
ctx.arc(100,100,60,0,2*Math.PI);
ctx.fill()
```

##  节点绘制

- `beginPath()`重置绘制路径
- `lineTo()`开始绘制线条
- `moveTo()`把路径移动到画布中的指定点，但不会创建线条（`lineTo()`方法绘制线条）
- `closePath()`闭合线条绘制，即当前点链连接到线条开始绘制点
- `lineWidth`线条宽度
- `storkeStyle`线条的样式，可以是颜色、渐变
- `stroke()`根据上面方法定义的节点绘制处线条

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//填充画布颜色
ctx.fillStyle="red"
ctx.fillRect(0,0,el.width,el.height)
//开始画线
ctx.beginPath();
//移动起始点
ctx.moveTo(200,10)
//下一个节点
ctx.lineTo(400,200)
//下一个节点
ctx.lineTo(10,200)
//闭合节点
ctx.closePath();
//线宽
ctx.lineWidth = 10;
//线颜色
ctx.strokeStyle = "f1c40f"
//画线
ctx.stroke()
```

## 线性渐变

使用`canvas`的`createLinearGradient()`方法可以创建线性的渐变对象，用于实现线性渐变效果

### createLinearGradient

| 参数 | 描述                |
| ---- | ------------------- |
| x0   | 渐变开始点的`X`坐标 |
| y0   | 渐变开始点的`Y`坐标 |
| x1   | 渐变结束点的`X`坐标 |
| y1   | 渐变结束点的`Y`坐标 |

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//定义渐变的开始与结束坐标
const gradient = ctx.createLinearGradient(0,0,500,500);
//当以渐变位置与颜色，参数一为位置从0~1之间，参数二为即变颜色
gradient.addColorStop(0, '#1abc9c');
gradient.addColorStop(0.5, '#9b59b6');
gradient.addColorStop(1, '#f1c40f');
//渐变填充
ctx.strokeStyle = gradient;
//设置线的宽度
ctx.lineWidth = 20;
//绘制矩形
ctx.strokeRect(100,100,300,300)
```

### 渐变填充

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//定义渐变的开始与结束坐标
const gradient = ctx.createLinearGradient(0, 0, 500, 500);
//定义渐变位置与颜色参数一为从0~1之间，参数二为即变颜色
gradient.addColorStop(0, '#1abc9c')
gradient.addColorStop(0.5, '#9b59b6')
gradient.addColorStop(1, '#f1c40f')
//定义填充颜色
ctx.fillStyle = gradient
//绘制矩形
ctx.fillRect(0, 0, 500, 500)
```

## 清空区域

**`clearRect`在给定的矩形内清除指定的像素**

将红色画布上清除一块区域，清除后的内容是透明的

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
ctx.fillStyle = "skyblue"
ctx.fillRect(0,0,500,500);
ctx.clearRect(50,50,100,100)
```

## 填充文字

**使用`canvas`的 `fillText`方法绘制填充文字**

### fillText

| 参数     | 描述                                    |
| -------- | --------------------------------------- |
| text     | 规定在画布上输出的文本                  |
| x        | 开始绘制文本的`X`坐标位置（相对于画布） |
| y        | 开始绘制文本的`Y`坐标（相对于画布）     |
| maxWidth | 可选，允许的最大文本宽度，以像素计算    |

### textBaseline

**`textBaseline`用于定义文字基线**

| 参数        | 说明                           |
| ----------- | ------------------------------ |
| alphabetic  | 默认，文本基线是普通的字母基线 |
| top         | 文本基线是`em`方框的顶端       |
| hanging     | 文本基线是悬挂基线             |
| middle      | 文本基线是`em`方框的正中       |
| ideographic | 文本基线是表意基线             |
| bottom      | 文本基线是`em`方框的低端       |

###  textAlign

**`textAlign`用于文本的对齐方式的属性**

| 参数   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| left   | 文本左对齐                                                   |
| right  | 文本右对齐                                                   |
| center | 文本居中对齐                                                 |
| start  | 文本对齐节点开始的地方（左对齐指本地从左向右，右对齐指本地从右向左） |
| end    | 文本对齐界线结束的地方 （左对齐指本地从左向右，右对齐指本地从右向左） |

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//填充样式
ctx.fillStyle = 'red'
//文字大小与字体设置
ctx.font = '30px CascadiaMono'
//定义文字基线
ctx.textBaseline = 'top'
//文字居中
ctx.textAlign = 'left'
ctx.fillText('canvas', 10, 200)
```

### 激变文字

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
// 定义渐变的开始与结束坐标
const gradient = ctx.createLinearGradient(0,0,500,500);
// 定义渐变位置与颜色，参数一为位置是从 0～1 之间，参数二为激变颜色
gradient.addColorStop(0, '#1abc9c')
gradient.addColorStop(0.5, '#9b59b6')
gradient.addColorStop(1, '#f1c40f')
//渐变填充
ctx.strokeStyle = gradient;
//文字大小与字体设置
ctx.font = '30px CascadiaMono'
ctx.strokeText("TYPESCRIPT",10,250)
```

## 图片填充

**createPattern() 在指定的方向上重复指定的元素**

### 参数说明

| 参数      | 说明                             |
| --------- | -------------------------------- |
| image     | 规定要使用的图片、画布或视频元素 |
| repeat    | 默认，该模式在水平和垂直向重复   |
| repeat-x  | 该模式只在水平方向重复           |
| repeat-y  | 该模式只在垂直方向重复           |
| no-repeat | 该模式指显示一次（不重复）       |

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//创建图片对象
const img= new Image();
img.src = "";
//图片加载后处理
img.onload=()=>{
  //第二个参数："repeat|repeat-x|repeat-y|no-repeat"
  const pat = ctx.createPattern(img, 'repeat')!;
  //指定填充方式为贴图
  ctx.fillStyle = pat
  //开始填充
  ctx.fillRect(0, 0, 600, 600)
}
```

## 图片缩放

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//创建图片对象
const img = new Image()
img.src = 'icon.jpeg'
//图片加载后处理
img.onload = () => {
  el.width = img.naturalWidth * scale(img, el)
  el.height = img.naturalHeight * scale(img, el)
  //绘制图片
  ctx.drawImage(img, 0, 0, el.width, el.height)
}

//取最小缩放比例
function scale(img: HTMLImageElement, el: HTMLCanvasElement): number {
  return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight)
}
```

## 绘制像素

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//创建图片对象
ctx.fillStyle = "red";
ctx.fillRect(0,0,el.width,el.height);
//向画中绘制点
for (let i = 0;i<1000;i++){
  //随机生成坐标
  const x = Math.floor(Math.random() * el.width)
  const y = Math.floor(Math.random() * el.height)
  //绘制 5*5 白板
  ctx.rect(x,y,5,5);
  ctx.fillStyle = "#fff";
  ctx.fill()
}
```

```ts
const el = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = el.getContext("2d")!;
//创建图片对象
ctx.fillStyle = "#000";
ctx.fillRect(0,0,el.width,el.height);
//向画出中绘制点
for (let index=0;index<15;index++){
  ctx.beginPath()
  //随机设置绘制位置
  //随机设置圆的半径
  ctx.arc(Math.random() * el.width, Math.random() * el.height, 5 + Math.floor(Math.random() * 100), 0, 2 * Math.PI)
  
  //随机设置填充颜色
  ctx.fillStyle = ['yellow', 'red', '#16a085', '#2ecc71', '#f1c40f', '#9b59b6'].sort(() => {
    return Math.floor(Math.random() * 3) ? 1 : -1
  })[0];
  ctx.fill()
}
```
