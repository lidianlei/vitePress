# 基础

### 文件命名

- 使用小写字线命名文件，不要出现中文字符
- 扩展名标准是`.html`，当然也可以使用`.htm`
- 多个单词可以使用`-` 或 `_` 连接，建议使用`-` 字符如`user-create.html`

### URL

统一资源定位符，用于表示资源在网络上的地址，每个部分以`/`进行分隔

参数说明

| 参数             | 说明                                |
| ---------------- | ----------------------------------- |
| https            | 访问协议 http 或 https、ftp、mailto |
| www.baidu.com    | 服务器地址                          |
| css/front/lesson | 资源目录                            |
| index.html       | 文件名                              |

### 访问路径

#### 绝对路径

绝对路径包含`主机+服务器地址+目录+文件名`的完整路径

#### 相对路径

相对路径是指相对当前目录的地址

```js
# 当前目录的文件
index.html

# 上级目录中的文件
../index.html

# 子目录中的文件
block/user.html

# 根目录中的文件
/bootstrap.html
```

## 页面结构

### 语义标签

`html`标签都有具体语义，虽然技术上可以使用`div`标签标大部分内容，但选择清晰的语义标签更容易表示。`h1~h6`表示标题，`p`标签表示内容、强调内容使用`em`标签

```html
<article>
	<h1>web</h1>
	<p>html</p>
</article>
```

### 嵌套关系

元素可以相互嵌套包裹，即元素存在父子级关系

```html
<article>
	<h1>web</h1>
	<div>
      	<p>html</p>
      	<span>css</span>
	</div>
</article>
```

### 基本结构

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

| 标签        | 说明                                            |
| ----------- | ----------------------------------------------- |
| DOCTYPE     | 声明为HTML文档                                  |
| html        | lang：网页语言，比如en/zh等，非必须项目         |
| head        | 文档说明部分，对搜索引擎提供信息或加载CSS、JS等 |
| title       | 网页标题                                        |
| keyword     | 向搜索引擎说明你的网页的关键词                  |
| description | 向搜索引擎描述网页内容的摘要信息                |
| body        | 页面主题内容                                    |

### 内容标签

```js
1.页眉页脚
	header:标签用于定义文档的页眉
    footer:标签定义文档或节的页脚，页脚通常包含文档的作者 版权信息 使用条款链接 联系信息等
2.导航元素：nav 导航链接
    <main>
        <article>
            <section>
                <h2>锁机制</h2>
             </section>
             <section>
                <h2>事物处理</h2>
            </section>
        </article>
	</main>
3.通用容器：div 通用容器
```

| 标签    | 功能     | 说明                                                         |
| ------- | -------- | ------------------------------------------------------------ |
| main    | 主要区域 | 表示页面主要区域，一个页面中`main`元素组合最好只出现一次     |
| article | 主要区域 | 标签规定独立的包含内容区域，`article`标签表示一个独立的内容容器 |
| section | 区块定义 | 定义一个区块，一般是一组相似内容的排列组合                   |
| aside   | 附加区域 | 用于设置与主要区域无关的内容，比如侧边栏                     |
| nav     | 导航元素 | 使用`nav`设置导航链接                                        |

## 文本标签

### 基本标签

| 标签 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| p    | 标记一个段落                                                 |
| pre  | 原样显示文本内容包括空白，换行等                             |
| br   | 在html中回车会忽略，使用`br`标签可以实现换行效果             |
| span | 标配与 div 标签都是没有语义的，span 常用于对某些文本特殊控制，但该文本又没有适合的语义标签 |

### 描述文本

| 标签     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| small    | 用于设置描述，声明等文本                                     |
| time     | 标签定义时间或日期，或者两者                                 |
| abbr     | 用于描述一个缩写内容                                         |
| sub      | 用于数字的下标内容                                           |
| sup      | 用于数字的上标内容                                           |
| del      | `del` 标签表示删除的内容，`ins` 一般与 `del` 标签配合使用描述更新与修正 |
| s        | `s` 标签显示效果与 `del` 相似，但语义用来定义那些不正确、不准确或没有用的文本 |
| code     | 用于显示代码块内容，一般需要代码格式化插件完成               |
| progress | 表示完成任务的进度，当游览器不支持时显示内容                 |

### 强调文本

```js
1.storage 标签和 em 一样，用于强调文本，区别：强调程度不同
2.mark 用于突出显示文本内容，类似我们生活中使用的马克
```

### 引用标签

```javascript
1.cite 标签通常表示它所含的文本对某个参考文献的引用
2.blockquote 用来定义摘自另一个源的块引用
2.q 用于表示行内引用文本，在大部分浏览器中会加上引号
```

### 联系信息

```javascript
address:用于设置联系地址等信息，一般将address放在footer标签中
```

## 表单

### Form

一般情况下表单都要放在FORM内提交

```html
<form action="form.php" method="POST">
  <fieldset>
    <legend>测试</legend>
    <input type="text">
  </fieldset>
</form>
```

| 属性   | 说明                 |
| ------ | -------------------- |
| action | 后台地址             |
| method | 提交方式 GET 或 POST |

### Label

使用 `label` 用于描述表单标题，当点击标题后文本框会获得焦点，需要保证使用的 ID 在页面中是唯一的

```html
<form action="form.php" method="POST" novalidate>
    <label for="title">标题</label>
    <input type="text" name="title" id="title">
</form>
```

### Input

文本框用于输入单行文本使用

| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| type        | 表单类型默认为 `text`                                        |
| name        | 后台接收字段名                                               |
| required    | 必须输入                                                     |
| placeholder | 提示文本内容                                                 |
| value       | 默认值                                                       |
| maxlength   | 允许最大输入字符数                                           |
| size        | 表单显示长度，一般用不使用而用 `css` 控制                    |
| disabled    | 禁止使用，不可以提交到后台                                   |
| readonly    | 只读，可提交到后台                                           |
| capture     | 使用麦克风、视频或摄像头哪种方式获取手机上传文件，支持的值有 microphone, video, camera |

**调取摄像头**

当 input 类型为 file 时手机会让用户选择图片或者拍照，如果想直接调取摄像头使用以下代码

```js
<input type="file" capture="camera" accept="image/*" /
```

通过设置表单的 `type` 字段可以指定不同的输入内容

| 类型     | 说明                         |
| -------- | ---------------------------- |
| email    | 输入内容为邮箱               |
| url      | 输入内容为 URL 地址          |
| password | 输入内容为密码项             |
| tel      | 电话号，移动端会调出数字键盘 |
| search   | 搜索框                       |
| hidden   | 隐藏表单                     |
| submit   | 提交表单                     |

### Hidden

隐藏表单用于提交后台数据，但在前台内容不显示所以在其上做用样式定义也没有意义

```js
<input type="hidden" name="id" value="1">
```

### 提交表单

创建提交按钮可以将表单数据提交到后台，有多种方式可以提交数据如使用 AJAX，或 HTML 的表单按钮

1. 使用 input 构建提交按钮，如果设置了 name 值按钮数据也会提交到后台，如果有多个表单项可以通过些判断是哪个表单提交的

   ```html
   <input type="submit" name="submit" value="提交表单">
   ```

2. 使用 button 也可以提交，设置 type 属性为`submit` 或不设置都可以提交表单

   ```html
   <button type="submit">提交表单</button>
   ```

### 禁用表单

通过为表单设置 `disabled` 或 `readonly` 都可以禁止修改表单，但 `readonly`表单的数据可以提交到后台

```js
<input type="text" name="web" value="js" readonly>
```

### Pattern

表单可以通过设置 `pattern` 属性指定正则验证，也可以使用各种前端验证库如 [formvalidator (opens new window)](http://www.formvalidator.net/#default-validators_custom)或 [validator.js](https://github.com/validatorjs/validator.js)

| 属性      | 说明                 |
| --------- | -------------------- |
| pattern   | 正则表达式验证规则   |
| oninvalid | 输入错误时触发的事件 |

```html
<form action="">
	<input
           type="text"
           name="username" 
           pattern="[A-z]{5,20}"
           oninvalid="validate('请输入5~20位字母的用户名')"
     >
	<button>提交</button>
</form>
<script>
	function validate(message) {
		alert(message);
	}
</script>
```

### Textarea

文本域指可以输入多行文本的表单，当然更复杂的情况可以使用编辑器如`ueditor、ckeditor`等

| 选项 | 说明                              |
| ---- | --------------------------------- |
| cols | 列字符数（一般使用 css 控制更好） |
| rows | 行数（一般使用 css 控制更好）     |

```html
<textarea name="content" cols="30" rows="3" style="resize: none"></textarea>
```

### Select

| 选项     | 说明       |
| -------- | ---------- |
| multiple | 支持多选   |
| size     | 列表框高度 |
| optgroup | 选项组     |
| selected | 选中状态   |
| option   | 选项值     |

```html
<select name="lesson">
  <option value="">== 选择课程 ==</option>
  <optgroup label="后台">
    <option value="php">PHP</option>
    <option value="linux">LINUX</option>
    <option value="mysql">MYSQL</option>
  </optgroup>
  <optgroup label="前台">
    <option value="php">HTML</option>
    <option value="linux">JAVASCRIPT</option>
    <option value="mysql">CSS</option>
  </optgroup>
</select>
```

### Radio

| 选项    | 说明     |
| ------- | -------- |
| checked | 选中状态 |

### Checkbox

复选框指允许选择多个值的表单

### 文件上传

文件上传有多种方式，可以使用插件或 JS 拖放上传处理。HTML 本身也提供了默认上传的功能，只是上传效果并不是很美观

| 选项     | 说明                                              |
| -------- | ------------------------------------------------- |
| multiple | 支持多选                                          |
| accept   | 允许上传类型 `.png,.psd` 或 `image/png,image/gif` |

```javascript
<form action="" method="POST" enctype="multipart/form-data">
    <fieldset>
    <input type="file" name="icon" multiple="multiple" accept="image/png,image/gif"></fieldset>
</form>
```

### 日期与时间

| 属性 | 说明                                                        |
| ---- | ----------------------------------------------------------- |
| step | 间隔：date 缺省是 1 天，week 缺省是 1 周，month 缺省是 1 月 |
| min  | 最小时间                                                    |
| max  | 最大时间                                                    |

```html
<input type="date" step="5" min="2020-09-22" max="2025-01-15" name="datetime">
```

**周选择**

```html
<input type="week">
```

**月份选择**

```html
<input type="month">
```

**日期与时间**

```html
<input type="datetime-local" name="datetime">
```

### Datalist

input 表单的输入值选项列表

```html
<form action="" method="post">
  <input type="text" list="lesson">
  <datalist id="lesson">
    <option value="PHP">后台管理语言</option>
    <option value="CSS">美化网站页面</option>
    <option value="MYSQL">掌握数据库使用</option>
  </datalist>
</form>
```

### autocomplete

浏览器基于之前键入过的值，应该显示出在字段中填写的选项

### 列表

有序列表：ol

无序列表：ul

描述列表：dl

## 表格与多媒体

### 基本使用

| 属性    | 说明         |
| ------- | ------------ |
| caption | 表格标题     |
| thead   | 表头部分     |
| tbody   | 表格主体部分 |
| tfoot   | 表格尾部     |

```javascript
1.caotion：表格标题  <caption>表格标题</caption>
2.thead：表头部分
3.tbody：表格主体部分
4.tfoot：表格尾部
	colspan：水平合并
    rowspan：垂直合并
```

## 视频

Adobe 与苹果公司对 FLASH 都不支持或消极状态，这时 HTML 提供对视频格式的支持，除了使用 html 提供的标签来播放视频外，也有很多免费或付费的插件，如[video.js (opens new window)](https://videojs.com/)、[阿里云播放器 (opens new window)](https://help.aliyun.com/document_detail/57314.html)等等。

**属性说明**

| 属性     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| autoplay | 如果出现该属性，则视频在就绪后马上播放（需要指定类型如 `type="video/mp4"`) |
| preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 如果视频观看度低可以设置为 `preload="none"` 不加载视频数据减少带宽。 如果设置为 `preload=metadata`值将加载视频尺寸或关键针数据，目的也是减少带宽占用。 设置为`preload="auto"` 时表示将自动加载视频数据 |
| controls | 如果出现该属性，则向用户显示控件，比如播放按钮               |
| height   | 设置视频播放器的高度                                         |
| width    | 设置视频播放器的宽度                                         |
| loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放           |
| muted    | 规定视频的音频输出应该被静音                                 |
| poster   | 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像 |
| src      | 要播放的视频的 URL                                           |

```html
<video src="web.mp4" autoplay="autoplay" loop muted controls width="800" height="200">
  <source src="web.mp4" type="video/mp4">
  <source src="web.webm" type="video/webm">
</video>
```

## 声音

HTML 对声音格式文件也提供了很好的支持。

**属性说明**

| 属性     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| autoplay | 如果出现该属性，则视频在就绪后马上播放。                     |
| preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 如果视频观看度低可以设置为 `preload="none"` 不加载视频数据减少带宽。 如果设置为 `preload="metadata"`值将加载视频尺寸或关键针数据，目的也是减少带宽占用。 设置为`preload="auto"` 时表示将自动加载视频数据 |
| controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| muted    | 规定视频的音频输出应该被静音。                               |
| src      | 要播放的视频的 URL。                                         |

```html
<audio controls autoplay loop preload="auto">
	<source src="houdunren.ogg" type="audio/ogg">
	<source src="houdunren.mp3" type="audio/mp3">
</audio>
```
