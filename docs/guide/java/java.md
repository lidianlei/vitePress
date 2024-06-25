# Java介绍

## Java技术体系平台

1. Java SE（Java Standard Edition）**标准版**，支持面向桌面级应用（如 Windows 下的应用程序）的Java平台，提供完整的Java核心API，此版本以前称为**J2SE**
2. Java EE（Java Enterprise Edition）**企业版**，是为开发企业环境下的应用程序提供的一套解决方案，该技术体系中包含的技术如：**Servlet、Jsp等**，主要针对于 Web 应用程序开发，版本以前称为 **J2EE**
3. Java Me（Java Micro Edition）小型版，支持 Java 程序运行在移动端（手机，PDA）上的平台，对 Java API 有所精简，并加入了针对移动终端的支持，此版本以前称为**J2ME**

## Java重点特点

1. Java 语言是面向对象的 **(oop)**

2. Java 语言是健壮的，Java 的强类型机制、异常处理、垃圾的自动收集等是 Java 程序健壮性的重要保证

3. Java 语言是**跨平台性的**，即：一个编译好的 .class 文件可以在多个系统下运行，这种特性称为跨平台

   ![An image](../../public/java/01.png)

4. Java 语言是解释型的

   > 解释性语言：javascript，PHP，Java  编译性语言：c/c++
   >
   > 区别：解释性语言，编译后的代码，不能直接被机器执行，需要解析器来执行，编译性语言，编译后的代码，可以直接被机器执行，c/c++

## Java运行机制及运行过程

### 跨平台性

![An image](../../public/java/02.png)

### 核心机制-Java虚拟机

1. **JVM**是一个虚拟的计算机，具有指令集并使用不同的存储区域，负责执行指令，管理数据、内存、寄存器、包含在**JDK中**

2. 对于不同的平台，有不同的虚拟机

3. Java 虚拟机机制屏蔽了底层运行平台的差别，实现了**一次编译，到处运行**

   ![An image](../../public/java/03.png)

## JDK,JRE

### JDK基本介绍

1. **JDK**的全称（**Java Development Kit   Java** 开发工具包）

   JDK = JRE + java 的开发工具【java，javac，javadoc，javap 等】

2. **JDK**是提供给 Java 开发人员使用的，其中包含了 java 的开发工具，也包含了 **JRE**，所以安装了**JDK**,就不用再单独安装 **JRE**了

### JRE基本介绍

1. **JRE**（Java Runtime Environment   Java运行环境）

   JRE = JVM + Java 的核心类库【类】

2. 包括 Java 虚拟机（JVM Java Virtual Machine）和 Java 程序所需的核心类库等，如果想要运行一个开发好的 Java 程序，计算机中只需要安装 JRE 即可

### JDK、JRE和JVM 的包含关系

1. **JDK=JRE + 开发工具集**（例如 javac,java编译工具等）
2. **JRE=JVM + Java SE 标准类库**（java 核心类库）
3. 如果只想运行开发好的 .class 文件，只需要 JRE

## 下载安装 JDK

**官方网址：https://www.oracle.com/java/technologies/javase-downloads.html**

> 细节说明： 安装路径不要有中文或者特殊符号如空格等 当提示安装 JRE 时，可以选择不安装，也可以安装

## 配置环境变量 Path

```java
1.为什么配置环境变量？
    在 dos 命令行【快捷方式 win+r】中敲入 javac,出现错误提示（没有配置环境变量）
2.配置环境变量 path 的步骤
  1.我的电脑--属性--高级系统设置--环境变量
  2.增加 JAVA_HOME 环境变量，指向 jdk 的安装目录
  3.编辑 path 环境变量，增加 %JAVA_HOME%\bin
  4.打开 DOS 命令行，任意目录下敲入 javac/java ,如果出现 javac 的参数信息，配置成功  
```

## Java快速入门

```java
//1.public class Hello 表示 Hello 是一个类，是一个 public 公有的类
//2. Hello{} 表示一个类的开始和结束
//3.public static void main(String[] args) 表示一个主方法，即程序的入口
//4.main(){}表示方法的开始和结束
//5.System.out.println("Hello") 表示输出 “Hello”

public class Hello {
  //编写一个 main 方法
  public static void main(String[] args){
    System.out.println("Hello");
  }
}
```

**java执行流程分析**

```java
.java文件（源文件）-->（javac/编译）-->.class 文件 -->（java/运行）-->结果
```

## Java开发注意事项和细节说明

1. **Java 源文件以 .java 为扩展名**。源文件的基本组成部分是类（class）,如本类中的 Hello类

2. **Java 应用程序的执行入口时 main()方法**，它有固定的书写格式

   public static void main(String[] args){...}

3. **Java 语言严格区分大小写**

4. **Java方法由一条条语句构成，每个语句以 ";"结束**

5. **大括号都是成对出现的，缺一不可**

6. **一个源文件中最多只能有一个 public 类**，其它类的个数不限

7. **如果源文件包含一个 public 类，则文件名必须按照该类名命名！**

8. **一个源文件中最多只能有一个 public 类，其它类的个数不限，也可以将 main 方法写在非 public 类中，然后指定运行非 public 类，这样入口方法就是非 public 的 main 方法**

## Java转义字符

```java
1. \t : 一个制表位，实现对齐的功能
2. \n : 换行符
3. \\ : 一个 \
4. \" : 一个 “
5. \' : 一个 '
6. \r : 一个回车 System.out.println('hello \r JAVA')
```

## 注释

用于注解说明解释程序的文字就是注释，注释提高了代码的阅读性（可读性）；注释是一个程序员必须要具有的良好编程习惯。将自己的思想通过注释先整理出来，再用代码去体现

### Java 中的注释类型

```java
1.单行注释
    基本格式
    格式：//注释文字
2.多行注释
    基本格式
    格式：/** 注释文字 **/
```

- 被注释的文字，不会被 JVM (java虚拟机)解释执行
- 多行注释里面不允许有多行注释嵌套

### 文档注释

注释内容可以被 **JDK**提供的工具 **javadoc**所解析，生成一套以网页文件形式体现的该程序的说明文档，一般写在类

```java
1.基本格式
2.如何生成对应的文档注释
3.应用实例    
    
//javadoc 标签
    javadoc -d 文件夹名 -xx -yy Demo3.java
```

**javadoc标签**

| 标签          | 描述                                                  |
| ------------- | ----------------------------------------------------- |
| @author       | 标识一个类作者                                        |
| @deprecated   | 指名一个过期的类或成员                                |
| {@docRoot}    | 指明当前文档根目录的路径                              |
| @exception    | 标志一个类抛出的异常                                  |
| {@inheritDoc} | 从直接父类继承的注释*                                 |
| {@link}       | 插入一个到另一个主题的链接                            |
| {@linkplain}  | 插入一个到另一个主题的链接，但是该链接显示纯文本字体  |
| @param        | 说明一个方法的参数                                    |
| @return       | 说明返回值类型                                        |
| @see          | 指定一个到另一个主题的链接                            |
| @serial       | 说明一个序列化属性                                    |
| @serialData   | 说明通过writeObject() 和 writeExternal() 方法写的数据 |
| @serialField  | 说明一个 ObjectStreamField 组件                       |
| @since        | 标记当引入一个特定的变化时                            |
| @throws       | 和 @exception 标签一样                                |
| {@value}      | 显示常量的值，该常量必须是 static 属性                |
| @version      | 指定类的版本                                          |

## Java代码规范

1. 类、方法的注释，要以 javadoc 的方式来写
2. 非 Java Doc的注释，往往是给代码的维护者看的，着重告诉读者为什么这样写，如何修改，注意什么问题等
3. 使用 tab 操作，实现缩进，默认整体向右边移动，用 shift + tab 格式化代码
4. 运算符和 = 两边习惯性各加一个空格，
5. 源文件使用 utf-8 编码
6. 行宽度不要超过 80 字符
7. 代码编写**次行风格**和**行尾风格**

## DOS命令

### 常用的 dos 命令

```js
1.查看当前目录是有什么内容 dir
	dir dir:d:\abc2\test200
2.切换到其他盘下：盘符号：cd ：changge directory
	cd/D  c:
3.切换到当前盘的其他目录下（使用相对路径和绝对路径演示） ..\表示上一级目录
	cd  d:abc2\test200  cd..\..\abc2\test200
4.切换到上一级
	cd ..
5.切换到根目录：cd \
6.查看指定的目录下所有子集目录 tree
7.清屏 cls
8.退出 DOS exit
```

