# Java运算符

## 运算符介绍

运算符时一种特殊的符号，用以表示数据的运算、赋值和比较等

1. 算术运算符
2. 赋值运算符
3. 关系运算符【比较运算符】
4. 逻辑运算符
5. 位运算符【需要二进制基础】
6. 三元运算符

## 算术运算符

### `算术运算符时对数值类型的变量进行运算的，在 Java 程序中使用的非常多`

| 运算符     | 运算                                                   | 范例                      | 结果                 |
| ---------- | ------------------------------------------------------ | ------------------------- | -------------------- |
| +          | 正号                                                   | +7                        | 7                    |
| -          | 负号                                                   | b=11;-b                   | -11                  |
| +          | 加                                                     | 9+9                       | 18                   |
| -          | 减                                                     | 10-8                      | 2                    |
| *          | 乘                                                     | 7*8                       | 56                   |
| /          | 除                                                     | 9/9                       | 1                    |
| %          | 取模（取余）                                           | 11%9                      | 2                    |
| ++<br />++ | 自增（前）：先运算后取值<br />自增（后）：先取值后运算 | a=2;b=++a;<br />a=2;b=a++ | a=3;b=3<br />a=3;b=2 |
| --<br />-- | 自减（前）：先运算后取值<br />自减（后）：先取值后运算 | a=2;b=--a;<br />a=2;b=a-- | a=1;b=1<br />a=1;b=2 |
| +          | 字符串相加                                             | ‘ldl’ + 'yby'             | "ldl yby"            |

```java
class ArithmeticOperator{
  public static void main(String[] args){
    System.out.println(10/4);//2
    System.out.println(10.0/4);;//2,5

    double d = 10/4;
    System.out.println(d);//2.0

    // % 取余  a%b = a-a/b*b
    //-10%3 => -10-(-10)/3*3 = -10 + 9=-1
    //10%-3 = 10-10/(-3)*(-3)=10-9=1
    //-10%-3 = (-10)-(-10)/(-3)*(-3) = -10 + 9 = -1


    //++的使用
    int i = 10;
    //i++；自增 等价于 i = i+1; i=11
    //++i；自增，等价于 i = i+1;i=12
    /*
      作为表达式使用
      前++：++i 先自增后赋值
      后++：i++先赋值后自增
    */
    int j = 8;
    //int k = ++j; //等价 j=j+1;k=j;
    int k = j++; // 等价 k=j;j=j+1;
    System.out.println("k=" + k + "j=" + j);//8 9
  }
}
```

### 细节说明

:::tip

1. 对于`除号/`，它的整数和小数`除`是有区别的：整数之间做除法时，只保留整数部分而舍弃小数部分。例如：int x = 10/3，结果是 3
2. 当对于一个数取余时，可以等价 `a%b = a-b/b*b`，这样我们可以看到取余的一个本质运算
3. 当 `自增` 当做一个独立语言使用时，不管是 `++i`；还是 i++；都是一样的，等价
4. 当 `自增` 当作一个和表达式使用时 j = ++ i；等价
5. 当 `自增` 当做一个表达式使用时 j = i++ 等价：

:::

```java
class ArithmeticOperatorExercise01{
  public static void main(String[] args){
    //int i = 1; i==>1
    //i = i++; 规则使用临时变量， temp = i; i = i+1;  i=temp;
    //System.out.println(i);//1
      
    //int i =1;
    //i=++i;// i = i+1;  temp = i; i =temp;
    //System.out.println(i);//2
    
    //测试输出
    int i1 = 10;
    int i2 = 20;
    int i = i1++;
    System.out.println(i);//10
    System.out.println(i2);//20
    
    i = --i2;
    System.out.println(i);//19
    System.out.println(i2);//19
  }
}
```

## 关系运算符

### 介绍

1. 关系运算符的结果都是 `boolean` 型，也就是要么是 `true`，要么是 `false`
2. 关系表达式，经常用在 `if`结构的条件中或循环结构的条件中

### 关系运算符

| 运算符     | 运算               | 范例                    | 结果  |
| ---------- | ------------------ | ----------------------- | ----- |
| ==         | 相等于             | 9==7                    | false |
| !=         | 不等于             | 8！=7                   | true  |
| <          | 小于               | 8<7                     | false |
| >          | 大于               | 8>7                     | true  |
| <=         | 小于等于           | 8<=7                    | false |
| >=         | 大于等于           | 8>=7                    | true  |
| instanceof | 检查是否是类的对象 | ‘ldl’ instanceof String | true  |

```java
class RelationalOperator{
  public static void main(String[] args){
    int a = 9;//
    int b = 8;
    System.out.println(a>b);//T
    System.out.println(a>=b);//T
    System.out.println(a<=b);//F
    System.out.println(a<b);//F
    System.out.println(a==b);//F
    System.out.println(a!=b);//T
    boolean flag = a>b;//T
    System.out.println(flag);//true
  }
}
```

### 细节说明

1. 关系运算符的结果都是 `boolean` 型，也就是要么是 `true`，要么是 `false`
2. 关系运算符组成的表达式，成为关系表达式  `a>b`
3. 比较运算符 `==`不能误写成 `=`

## 逻辑运算符

`用于连接多个条件，最终的结果也是一个 boolean 值`

1. 短路与 `&&`，短路或 `||`，取反 `!`
2. 逻辑与 `&`，逻辑或 `|`， `^`逻辑异或

| a     | b     | a&b   | a&&b  | a\|b  | a\|\|b | !a    | a^b   |
| ----- | ----- | ----- | ----- | ----- | ------ | ----- | ----- |
| true  | true  | true  | true  | true  | true   | false | false |
| true  | false | false | false | true  | true   | false | true  |
| false | true  | false | false | true  | true   | true  | true  |
| false | false | false | false | false | false  | true  | false |

### 逻辑运算规则

1. `a&b`：`&`叫逻辑与：规则：当 `a 和 b 同时为 true，则结果为 true，否则为 false`
2. `a&&b`：`&&` 叫短路与：规则：当 `a 和 b 同时为 true，则结果为 true，否则为 false`
3. `a|b`：`|` 叫逻辑或，规则：`当 a 和 b，有一个为 true，则结果为 true，否则为 false`
4. `a||b`：`||`叫短路或，规则：`当 a 和 b，有一个为 true，则结果为 true，否则为 false`
5. `!a`：`叫取反，或者非运算，当 a 为 true，则结果为 false，当 a 为 false 是，结果是 true`
6. `a^b`：`叫逻辑异或，当 a 和 b 不同时，则结果为 true，否则为 fasle`

### && 和 & 基本原则

| 名称        | 语法           | 特点                                            |
| ----------- | -------------- | ----------------------------------------------- |
| 短路与 `&&` | 条件1 && 条件2 | 两个条件都为 `true`,结果为 `true`否则为 `false` |
| 逻辑与 `&`  | 条件1 & 条件 2 | 两个条件都为 `true`,结果为 `true`.否则 `false`  |

```java
class LogicOperator{
  public static void main(String[] args){
    // && 短路与 和 &
    int age = 50;
    if (age>20 &&age<90){
      System.out.println("ko100");//ko100
    }

    //& 逻辑与使用
    if (age>20&age<90){
      System.out.println("ok200");//ok200
    }

    //区别
    int a = 4;
    int b = 9;
    //对于 && 短路与而言，如果第一个条件为 false，后面的条件不在判断
    //对应 & 逻辑与而言，如果第一个条件为 false，后面的条件仍然会判断
    if (a<1&++b<50){
      System.out.println("ok300");
    }
    System.out.println("a=" + a + "b=" + b);//4 10
  }
}
```

#### && 和 & 使用区别

1. `&&`短路与：如果第一个条件为 `false`，则第二个条件不会判断，最终结果为 `false`,效率高
2. `&`逻辑与：不管第一个条件是否为 `false`，第二个条件都要判断，效率低
3. 开发中，基本使用短路与 `&&`，效率高

### || 和 | 基本规则

| 名称        | 语法             | 特点                                                    |
| ----------- | ---------------- | ------------------------------------------------------- |
| 短路或 \|\| | 条件1 \|\| 条件2 | 两个条件中只要有一个成立，结果为 `true`，否则为 `false` |
| \| 逻辑或   | 条件1 \| 天骄2   | 只要有一个条件成立，结果为 `true`，否则为 `false`       |

```java
class LogicOperator{

  public static void main(String[] args){
    // || 短路或  和  | 逻辑或
    // || 规则：两个条件只要有一个成立，结果为 true , 否则为 false
    // | 规则：两个条件只要有一个成立，结果为 true , 否则为 false
    int age = 50;
    if (age>20||age<30){
      System.out.println("ok100");
    }

    // & 逻辑与使用
    if (age>20|age<30){
      System.out.println("ok200");
    }
    //1.||短路或：如果第一个条件为true。，则第二个条件不会判断，最终结果为 true,效率高
    //2.| 逻辑或：不管第一个条件是否为 true,第二个条件都要判断，效率低
    int a = 4;
    int b = 9;
    if (a>1||++b>4){
      System.out.println("ok300");
    }
    System.out.println("a=" + a + "b=" + b);//4 10
  }
}
```

### ||  和 | 使用区别

1. `||短路或`：如果第一个条件为 `true`，则第二个条件不会判断，最终结果为 `true`，效率高
2. `| 逻辑或`：不管第一个条件是否为 `true`，第二个条件都要判断，效率低
3.  开发中，基本使用 `||` 

## ! 取反基本规则

| 名称         | 语法   | 特点                                        |
| ------------ | ------ | ------------------------------------------- |
| ！非（取反） | ！条件 | 如果条件本身成立，结果为 false ,否则为 true |

```java
class InverseOperator{
  public static void main(String[] args){
    // ! 操作是取反 T--> F,F-->T
    System.out.println(60>20);;//T
    System.out.println(!(60>20));;//F
    // a^b 叫逻辑异或，当 a 和 b 不同是，则结果为 true ,否则为 false
    boolean b = (10>1)^(3>5);
    System.out.println("b=" + b);;//T
  }
}
```

:::tip

1. ​	`a^b`：叫逻辑异或，当` a 和 b `不同时，则结果为 `true`，否则为 `false`
2. `^`逻辑异或，System.out.println((4<1)^(6>3));//true

:::

## 赋值运算符

### 介绍

`赋值运算符就是将某个运算后的值，赋给指定的变量`

### 赋值运算符的分类

1. 基本赋值运算符： `=  int a = 10;`

2. 复合赋值运算符

   ```java
   += ，-= ，*= ，/= ，%= 等，
   a+=b; [等价于 a = a + b ]
   a-=b; [等价于 a = a - b ]
   ```

### 赋值运算符特点

:::tip

1. 运算顺序`从右向左     int num = a+b+c`

2. 赋值运算符的 `左边`只能是 `变量`，可以是`变量、表达式、常量值`

   int num = 20; int num1 = 78*34-10；int num3 = a;

3. 复合运算符等价于：a+=3；等价于 a = a+3；

4. 复合赋值运算符会进行`类型转换`

   byte b = 2；b+=3；b++

:::

```java
class AssignOperator{
  public static void main(String[] args){
    int n1 = 10;
    n1+=4;//n1 = n1+4;
    System.out.println(n1);//14
    n1/=3;//n1 = n1/4
    System.out.println(n1);//4

    //复合赋值运算符会进行类型转换
    byte b = 3;
    b+=2;//等价 b = (byte)(b+2);
    b++;//b=(byte)(b+1);
    System.out.println(b);//6
  }
}
```

## 三元运算符

### 基本语法

`条件表达式 ？ 表达式1 : 表达式2`

1. 如果条件表达式为 `true`，运算后的结果是表达式 `1`；
2. 如果条件表达式为 `false`，运算后的结果是表达式 `2`;

```java
class TernaryOperator{
  public static void main(String[] args){
    int a = 10;
    int b = 99;
    //解读
    //1. a>b 为 fasle
    //2. 返回 b--，先返回 b 的值，然后在 b-1
    //3. 返回的结果是 99
    int result = a>b?a++:b--;
    System.out.println(result);//99
    System.out.println(a);//10
    System.out.println(b);//98
  }
}
```

### 使用细节

1. `表达式1和表达式2`要为可以赋给接收变量的类型（或可以自动转换）

2. `三元运算符可以转成 if-else`语句

   ```java
   int res = a>b?a++ : --b;
   if(a>b) res = a++;
   else res = --b
   ```

```java
class TernaryOperatorDetail{
  public static void main(String[] args){
    //表达式 1 和 表达式 2要为可以赋给接受变量的类型
    // 或可以自动转换 / 或者强制转换
    int a = 3;
    int b = 8;
    int c = a>b?(int) 1.1:(int)3.4;//可以
    double d = a>b?a:b+3;//可以的，满足 int --> double
  }
}
```

```java

class TernaryOperatorExercise{
  public static void main(String[] args){
    //实现三个数的最大值
    int n1 = 553;
    int n2 = 33;
    int n3 = 123;

    //1.先得到 n1 和 n2 中嘴的数，保存到 max1
    //2. 然后再 求出 max1 和 n3 中的最大数，保存到 max2

    int max1 = n1>n2?n1:n2;
    int max2 = max1>n3?max1 : n3;
    System.out.println(max2);//553


    //使用一条语句实现，推荐使用上面方法
    int max = (n1>n2?n1:n2)>n3?(n1>n2?n1:n2):n3;
    System.out.println(max);//553


    int abcclass = 10;
    int n = 40;
    int N = 50;
    System.out.println(n);//40
    System.out.println(N);//50

    //? abc 和 aBc 是两个不同变量
    int abc = 100;
    int aBc = 200;

    //int a b = 300;
    //int a-b = 10;
    int goto1 = 10;
  }
}
```

### 运算符优先级

:::tip

1. 运算符有不同的`优先级`，所谓`优先级`就是表达式运算中的运算顺序，上一行运算符总优先于下一行
2. 只有`单目运算符`、`赋值运算符`是`从右向做运算的`

:::

|          | .    （）    {}    ；    ，      |
| -------- | -------------------------------- |
| R ---> L | ++    --    ~    !(data type)    |
| L ---> R | *    /    %                      |
| L ---> R | +    -                           |
| L ---> R | <<    >>    >>>    位移          |
| L ---> R | <    >    <=    >=    instanceof |
| L ---> R | ==    !=                         |
| L ---> R | &                                |
| L ---> R | ^                                |
| L ---> R | \|                               |
| L ---> R | &&                               |
| L ---> R | \|\|                             |
| L ---> R | ?    :                           |
| R ---> L | =    *=    /=    %=              |
|          | +=    -=    <<=    >>=           |
|          | >>>=    &=    ^=    !=           |

### 标识符的命名规格和规范

:::tip

1. `Java`对各种变量、方法和类等命名时使用的字符序列称为标识符
2. 凡是自己可以起名字的地方都叫标识符  int num1 = 90;

标识符的命名规则

1. 由 26 个英文字母大小学，0-9，或 $ 组成
2. 数字不可以开头，
3. 不可以使用关键字和保留字，但能包含关键字和保留字
4. Java 中太严格区分大小写，长度无限制，int totalNum = 10; int n = 90; 
5. 标识符不能包含空格，int a b = 90;

:::

### 判断下面变量是否正确

```java
hap    //ok
hsp12  //ok
1hsp   //错误，数字不能开头
h-s    //错误，不能有 - 
x h    //错误， 有空格
h$4    //ok
class  //错误 关键字
int    //错误 关键字
double //错误 关键字
public //错误 关键字
static //错误 关键字
goto   //错误 关键字
stu_name //ok    
```

### 标识符命名规范

:::tip

1. 包名：多单词组成时所有字母都小写，`aaa，bbb，ccc`//比如 com.hsp.crm
2. 类名，接口名：多单词组成时，所有单词的首字母大写：XxxYyyZzz 【大驼峰】，比如：TankShotGame
3. 变量名、方法名：多单词组成时，第一个单词首字母小写，第二个单词开始每个单词首字母大写：xxxYyyZzz 【小驼峰，简称 驼峰法】：tankShotGame
4. 常量名：所有字母都大写，多单词时每个单词用下划线连接：XXX_YYY_ZZZ；比如：定义一个所得税率：TAX_RATE

:::

## 关键字

关键字的定义和特点

定义：被 `Java`语言赋予了特殊含义，用做 `专门的用途的字符串`（单词）

特点：关键字中所有字母都为小写

`用于定义数据类型的关键字`

| class   | interface | enum  | byte   | short |
| ------- | --------- | ----- | ------ | ----- |
| int     | long      | float | double | char  |
| boolean | void      |       |        |       |

`用于定义数据类型值的关键字`

| true | false | null |
| ---- | ----- | ---- |

`用于定义流程控制的关键字`

| if     | else | switch | case  | default  |
| ------ | ---- | ------ | ----- | -------- |
| while  | do   | for    | break | continue |
| return |      |        |       |          |

`用于定义访问权限修饰符的关键字`

| private | ptotected | public |
| ------- | --------- | ------ |

`用于定义类，函数，变量修饰符的关键字`

| abstract | final | static | synchronized |
| -------- | ----- | ------ | ------------ |

`用于定义类与类之间的关键字`

| extends | implements |
| ------- | ---------- |

`用于定义建立实例及引用实例，判断实例的关键字`

| new  | this | super | instanceof |
| ---- | ---- | ----- | ---------- |

`用于异常处理的关键字`

| try  | catch | finally | throw | throws |
| ---- | ----- | ------- | ----- | ------ |

·用于包的关键字·

| package | import |
| ------- | ------ |

`其他修饰符关键字`

| native | strictfp | transient | voatile | assert |
| ------ | -------- | --------- | ------- | ------ |

## 保留字

`Java保留字`：现有`Java`版本`尚未使用`，但`以后版本可能会作为关键字使用`。自己命名标识符时要避免使用这些保留字`byValue、case、future、generic、inner、operator、outer、rest、var、goto、const`

## 键盘输入语句

`在编程中，需要接收用户输入的数据，就可以使用键盘输入语句来获取，Input.java，需要一个 扫描器（对象），就是Scanner`

1. 导入该类的所在包，java.util
2. 创建该类对象（声明变量）
3. 调用里面的功能

```java

import java.util.Scanner;//表示把 java.util 下的Scanner 类导入
class Input{
  public static void main(String[] args){
    //用户的输入
    //Scanner 类，表示 简单文本扫描器，再 java.util 包
    //1.引入 导入 Scanner 类所在的包
    //2. myScanner 就是 Scanner 类的对象
    Scanner myScanner = new Scanner(System.in);
    //3.接收用户输入，使用 相关的方法
    System.out.println("请输入名字");

    //当程序执行到 next 方法时，会等待用户输入
    String name = myScanner.next();//接收用户输入字符串
    System.out.println("请输入年龄");
    int age = myScanner.nextInt();//结束用户输入的 int
    System.out.println("请输入薪水");
    double sal = myScanner.nextDouble();//接收用户输入 double
    System.out.println("个人信息如下");

    System.out.println("名字=" + name + "年龄=" + age + "薪水=" + sal);
  }
}
```

## 进制

### 进制介绍

对于整数，四种表示方式

:::tip

1. 二进制：0，1   满2进1，以 0b 或 0B 开头
2. 十进制：0-9     满 10 进 1
3. 八进制：0-7     满 8 进 1，以数字 0 开头表示
4. 十六进制：0-9 及 A(10)-F(15)，满 16 进 1 ，以 `0x 或 0X`开头表示，此处的 A-F 不区分大小写

:::

```java

class BinaryTest{
  public static void main(String[] args){
    //n1 二进制
    int n1 = 0b1010;
    //n2 十进制
    int n2 = 1010;

    //n3 八进制
    int n3 = 01010;

    //n4 十六进制
    int n4 = 0X10101;
    System.out.println("n1=" + n1);//10
    System.out.println("n2=" + n2);//1010
    System.out.println("n3=" + n3);//520
    System.out.println("n4=" + n4);//65793
    System.out.println(0x23A);//570
  }
}
```

| 十进制 | 十六进制 | 八进制 | 二进制 |
| ------ | -------- | ------ | ------ |
| 0      | 0        | 0      | 0      |
| 1      | 1        | 1      | 1      |
| 2      | 2        | 2      | 10     |
| 3      | 3        | 3      | 11     |
| 4      | 4        | 4      | 100    |
| 5      | 5        | 5      | 101    |
| 6      | 6        | 6      | 110    |
| 7      | 7        | 7      | 111    |
| 8      | 8        | 10     | 1000   |
| 9      | 9        | 11     | 1001   |
| 10     | A        | 12     | 1010   |
| 11     | B        | 13     | 1011   |
| 12     | C        | 14     | 1100   |
| 13     | D        | 15     | 1101   |
| 14     | E        | 16     | 1110   |
| 15     | F        | 17     | 1111   |
| 16     | 10       | 20     | 10000  |
| 17     | 11       | 21     | 10001  |

### 进制转换

#### 进制转换的介绍

`第一组`

1. 二进制转十进制
2. 八进制转十进制
3. 十六进制转十进制

`第二组`

1. 十进制转二进制
2. 十进制转八进制
3. 十进制转十六进制

`第三组`

1. 二进制转八进制
2. 二进制转实例进制

`第四组`

1. 八进制转二进制
2. 十六进制转二进制

#### 二进制转十进制

```java
规则：从最低位（右边）开始，将每个位上的数提取出来，乘以2的（位数-1）次方，然后求和
//将 0b1011 转成十进制的数
0b1011 = 1*2的(1-1)次方 + 1*2的(2-1)次方 + 0*2的(3-1)次方 + 1*2的(4-1)次方法 = 1+2+0+8 = 11；    
```

#### 八进制转换成十进制

```java
规则：从最低为（右边）开始，将每个位上的数提取出来，乘以 8 的（位数-1）次方，然后求和
将 0234 转成十进制的数
0234 = 4*8^0 + 3*8^1 + 2*8^2 = 4 + 24 + 128 = 156;    
```

#### 十六进制转换成十进制

```java
规则：从最低位（右边）开始，将每个位上的数提取出来，乘以 16 的（位数-1）次方，然后求和，
将 0x23A 转成十进制的数   
0x23A = 10*16^0 + 3*16^2 + 2*16^2 = 10 + 48 + 512 = 570;   
```

#### 十进制转成二进制

```java
规则：将概述不断除以 2 ，直到商为 0 为止，然后将每步得到的余数倒过来，就是对应的二进制
将 34 转成 二进制
34 = 0B00100010    
```

#### 十进制转换成八进制

```java
规则：将该数不断除以 8 ，知道商为 0 为止，然后将每部得到的余数倒过来，就是对应的八进制
将 131 转成八进制
131 = 0203；    
```

#### 十进制转换成十六进制

```java
规则：将该数不断除以 16 ，直到商为 0 为止，然后将每步得到的余数倒过来，就是对应的十六进制
将 237 转成十六进制
237 = 0xED    
```

#### 二进制转换成八进制

```java
规则：从低位开始，将二进制数每三位一组，转成对应的八进制数即可
将 0b11010101 转成八进制
0b11(3)010(2)101(5) => 0325        
```

#### 二进制转成十六进制

```java
规则：从低位开始，将二进制数每四位一组，转成对应的十六进制数即可
将 ob11010101
ob1101(D)0101(5) = oxD5
```

#### 八进制转成二进制

```java
规则：将八进制数每 1 位，转成对应的一个 3 位的二进制数即可
将 0237 转成二进制
02(010)3(011)7(111) = ob10011111    
```

#### 十六进制转成二进制

```java
规则：将十六进制数每 1 位，转成对应的 4 位的一个二进制数即可
将 0x23B 转成二进制
0x2(0010)3(0011)B(1011) =>0b001000111011    
```

### 位运算

```java
class BinaryTest {
  public static void main(String[] args) {
    int a = 1 >> 2; // 1 向右位移2位
    int b = -1 >> 2;//算术右移
    int c = 1 << 2;//算术左移
    int d = -1 << 2;//
    int e = 3 >>> 2;//无符号右移
    //a,b,c,d,e 结果是多少
    System.out.println("a=" + a);//0
    System.out.println("b=" + b);//-1
    System.out.println("c=" + c);//4
    System.out.println("d=" + d);//-4
    System.out.println("e=" + e);//0
  }
}
```

### 二进制运算说明

1. 二进制是`逢2`进位的进位制，`0，1 是基本算符`
2. 现代的电子计算机技术全部采用的是 二进制，因为它只使用`0，1 `两个数字符号，非常简单方便，易于用电子方式实现，计算机内部处理的信息，都是采用二进制数来表示，二进制（Binary）数用 0 和 1 两个数字及其组合来表示任何数,进位规则是 `逢2进1`，数字 1在不同的位上代表不同的值，按从 `右至左` 的次序，这个值以而被递增

### 原码、反码、补码

:::tip

1. 二进制的最高位是符号位：`0 表示正数`，`1 表示负数`
2. 整数的原码，反码，补码都一样
3. 负数的反码 = 它的原码符号位不变，其它位取反（0->1,1->0）
4. 负数的补码 = 它的反码 + 1，负数的反码 = 负数的补码 - 1；
5. 0反码，补码都是0
6. java 没有无符号数，换言之，在java中的数都是有符号的
7. 在计算机运算的时候，都是以 `补码的方式来运算`的
8. 当看运算结果的时候，要看他的原码

:::

### 位运算符

#### java中有 7 个位运算（&、|、^、~、>>、<<、>>>）

分别是`按位与&、按位或|、按位异或^、按位取反~`

| 按位与 &   | 两位全位1，结果位1，否则位0              |
| ---------- | ---------------------------------------- |
| 按位或 \|  | 两位有一个位 1，结果位 1 ，否则位 0      |
| 按位异或 ^ | 两位一个为0，一个位 1，结果位 1 否则为 0 |
| 按位取反 ~ | 0-->1    1-->0                           |

#### >>、<< 和 >>>

1. 算术右移 >>：位低溢出，符号位不变，并用符号位补溢出的高位
2. 算术左移 <<：符号位不变，低位补 0
3.  `>>>` 逻辑右移也叫无符号右移，运算规则是：低位溢出，高位补 0
4. 特别说明：没有 <<< 符号

```java
int a = 1>>2;//1 => 000000001 => 00000000  本质 1/    2/2 = 0；
int c = 1<<2;//1 => 000000001 => 00000100  本质 1 * 2 * 2 = 4；
```

