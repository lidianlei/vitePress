# 基本操作

## 基础

**常见的数量及分类**

```js
1.Mysql 数据库（目前使用最广泛、流行度最好的开源免费数据库；Community + Enterprise）
2.Oracle 数据库（收费）
3.SQL Server 数据库 （收费）
4.Mongodb 数据库 （Community + Enterprise）
其中 MySql、Oracle、SQL Server 属于`传统型数据库（关系型数据库 或 SQL 数据库）`
这三者的设计理念相同，用发比较类似
```

**Mysql 的基本使用**

```js
1.查询数据：select
2.插入数据库：insert into 
3.更新数据：update 
4.删除数据：delete
where 条件、 and 和 or 运算符、order by 排序、count(*)函数
```

基本语句

```js
1.SELECT * FROM 表名称 //从指定的【表中】，查询出【所有的】数据， * 表示【所有列】
2.SELECT 列名称 FROM 表名称 // FROM 指定的【表中】 查询出指定 列名称的字段数据
//注意 SQL 语句中的 关键字 对 大小写不敏感， SELECT 等于 select from=FROM
```

**UPDATE**

```JS
1.UPDATE 语句用于修改表中的数据
// 用 UPDATE 指定要更新哪个表中的数据 ，用 SET 指定列 队形的新值，用 WHERE 指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
//把 users 表中 id 为 7 的用户密码更新为 pass123
UPDATE users SET password='pass123' WHERE id=7;
//把 users 表中 id 为 2 的用户密码和用户状态分别更新为 admin 和 1
UPDATE users SET password='admin',status=1 WHERE id=2;
```

**DELETE**

```js
1.DELETE 语句用于删除表中的值
//从指定的表中，根据 Where 条件， 删除对应的数据行
DELETE FROM 表名称 WHERE 列名称=值
//从 users 表中删除 id 为 4 的数据
DELETE FROM users WHERE id=4;
```

**WHERE**

```js
1.WHERE 语句用于`限定选择的标准`。在`SELECT、UPDATE、DELETE`语句中，`皆可使用`WHERE子句来限定选择的标准
//查询语句中的 WHERE 条件
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
//更新语句中的 WHERE 条件
UPDATE 表名称 SET 列=新值 WHERE 列 运算符 值
//删除语句中的 WHERE 条件
DELETE FROM 表名称 WHERE 列 运算符 值
```

运算符

| 操作符  | 描述         |
| ------- | ------------ |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

**注意：在某些版本中 SQL 中，操作符 <> 可以写为 !=**

```js
//看看通过 WHERE 子句来限定 SELECT 的查询条件
SELECT * FROM users WHERE status=1;
//查询 id 大于 2 的所有用户
SEKECT * FROM user WHERE id>2;
//查询 username 不等于 admin 的所有用户
SELECT * FROM users WHERE username <>'admin'
```

**SQL 的 AND 和 OR 运算符**

```js
1.AND 和 OR 可在`WHERE`子语句中把两个或多个条件结合起来
2.AND 表示 `必须同时满足多个条件`，相当于 Javascript 中的`&&`运算符，例如 if(a!=10&&a!=20);
3.OR 表示`只要满足任意一个条件即可`，相当于 Javascript 中的`||`运算符，例如 if(a!=10||a!=20);
```

AND运算符示例

```js
//使用 AND 来显示所有 `status`为0，并且 id 小于 3 的用户
SELECT * FROM users WHERE status=0 AND id<3;
```

OR 运算符示例

```js
//使用 OR 来显示所有 status 为1 或者 username 为 zs 的用户
SELECT * FROM users WHERE status=1 OR username='zs'
```

**ORDER BY升序排序**

```js
1.对 users 表中的数据，按照`status`字段进行升序排序
//注意：ORDER BY 默认进行升序排序，其中 ASC 关键字代表升序排序
SELECT * FROM users ORDER BY status;
SELECT * FROM users ORDER BY status ASC;//升序
SELECT * FROM users ORDER BY status DESC;//降序

2.ORDER BY 子句`多重排序`
//对 users 表中的数据，先按照`status`字段进行`降序排序`，再按照`username`的`字母顺序`，进行`升序排序`
//注意：DESC 代表降序排序
SELECT * FROM users ORDER BY status DESC,username ASC;
```

**SQL 的 COUNT(*)函数**

```js
1.COUNT(*) 函数用于返回`查询结果的总数据条数`
SELECT COUNT(*) FROM 表名称;
2.SQL 的 COUNT(*) 函数
//使用 AS 为列设置别名
如果希望给查询出来的列名称设置别名，可使用 AS 关键字
SELECT COUNT(*) AS total FROM user WHERE status=1;
```

## 链接服务器

### 参数说明

在命令行链接**mysql**的参数

| 选项 | 说明          | 默认             |
| ---- | ------------- | ---------------- |
| -u   | 账号          | 当前系统同名账号 |
| -p   | 密码          |                  |
| -p   | 链接端口      | 3306             |
| -h   | 主机地址      | 127.0.0.1        |
| -e   | 执行`sql`指令 |                  |

### 链接操作

**连接服务器**

```js
mysql -uroot -p -p3306 -h 127.0.0.1
//链接本地数据库是可以使用默认值
mysql -uroot -p
```

使用`-e`执行`SQL`语句

```js
mysql -uroot -proot -e'show database';
```

**退出连接**

命令行下执行 exit 可通出当前连接

```js
exit
```

### 执行与取消

每条 SQL 指令以`;`结束，按回车后执行该条语句

```js
show database;
```

**放弃语句**

在 SQL 后使用`\c`表示取消本条 SQL，后面不需要写`;`

```js
show database \c
```

## 数据库管理

### 常用指令

**数据库列表**

使用以下命令可以得到当前数据库所有数据库

```js
show databases;
```

**创建新库**

创建数据库`nodejs`并设置字符集为`utf8`

```js
CREATE DATABASE nodejs CHARSET utf8;
```

**查看数据库**

```js
show create database nodejs;
```

**删除数据库**

```js
drop database nodejs
```

为了防止删除不存在的数据库报错

```js
drop database if exists nodejs;
```

**选择数据库**

数据库主要是对表操作，选择数据库后可以省掉每次指定数据库的麻烦

```js
use nodejs
```

### 导入语句

有时需要把外部的 SQL 文件导入到服务器中，图像化的数据库管理软件都支持导入。

**创建文件**

创建`test.sql`文件

```js
create database text chatset utf8;
SHOW DATABASES;
```

**外部导入**

```js
mysql -uroot -p < test.sql
```

**连接后导入**

```js
mysql -uroot -p
>source text.sql
```

## 数据表管理

可以把数据库理解为文件夹，数据表理解为文件，数据表是真正存储数据的地方

### 基本操作

**创建表数据**

```js
create table class (
	id int primary keu AUTO_INCREMENT,
    cname varchar(30) NOT NULL,
    description varchar(100) default NULL)
charset utf8;
```

以上语句创建表`class`字段说明如下

- 字段 id 为主键自增
- 字段 cname 为字符串类型 varchar 并不允许为 null
- 字段 description 为可为 null 字符串
- 字符集为 utf8，如果不设置将继承数据库字符集

### 复制数据

根据已经存在的表结构创建新表

```js
create table nodejs like class;
```

复制其他表的数据

```js
insert into nodejs select * from class;
```

只复制批定字段

```js
insert into nodejs (cname) select cname from class;
```

复制表时同时复制数据

```js
crate table node select * from class;
```

只复制指定字段，并为不同名字段起别名

```js
create table node (id int primary key AUTO_INCREMENT,name varchar(30)) select id,cname as name from class;
```

删除表数据

```js
DROP TEMPORARY TABLE IF EXISTS node;
```

### 临时表

临时表适用于储存临时数据表，会在数据库连接中断时自动删除

- 可以与普通表同名，优先级高于普通表
- 链接终端时自动删除

```js
create TEMPORARY TABLE class_name SELECT * FROM class;
SELECT * FROM class_name;
```

删除临时表

```js
DROP TEMPORARY TABLE IF EXISTS class_name;
```

## 查询数据

### 测试表

为了进行查询示例操作我们创建一下表

```js
CREATE TABLE stu (id int PRIMARY KEY AUTO_INCREMENT,sname char(30),class_id int default null,age smallint default null)

INSERT INTO stu(sname,class_id,age) VALUES('小明',1,20),('张三',2,32),('李四',3,null),('小刘',null,46);
```

### 字段处理

查询所有字估数据

```js
select * from class;
```

查询指定字段数据并排序字符

```js
select description,cname from class;
```

### 条件筛选

根据条件查询

```js
select * from class where cname = 'node';
```

查询包含关键词的数据

```js
select * from class where description like '%p%';
```

合并列返回新列查询结果

```js
SELECT CONCAT(id,name) as 'class_info' FROM 表名称;
```

指定多条件查询

```js
SELECT * FROM CLASS WHERE id>1 and cname = 'vue';
```

查找一班或行张的同学

```js
SELECT * FROM stu where class_id=1 or sname like '张%';
```

介绍中不包含 php 的班级

```js
SELECT * FROM class WHERE description NOT LIKE '%php%';
```

查询学生所在班级编号，并去掉重复值

```js
SELECT DISTINCE class_id from stu;
```

查询不在 30~35岁间的学生

```js
SELECT * FROM stu WHERE age NOT BETWEEN 30 AND 35;
```

查找2、3班的所有同学

```js
SELECT * FROM stu WHERE class_id IN(2,3)
```

查找除了1、3班的同学

```js
select * from stu where class_id NOT IN(1,3)
```

### NULL

查询没有分配班级的学生姓名

```js
select sname from stu where class_id is null;
```

查询已经分配班级的学生信息

```js
select * from stu where class_id is not null;
```

查询结果中对没分配班级的学生显示未分配

```js
select sname,if(class_id is null,'未分配'，class_id) from stu;
//也可以使用 IFNULL 函数简化操作
select sname,ifnull(class_id,'未分配') from stu;
```

### 排序结果

按学生年龄从大到小排序

```js
select * from stu order by age desc;
```

班级从大到小排序，相同班级的同学年龄从小到大排序

```js
select * from stu order by class_id DESC,age ASC;
```

随机获取一名同学

```js
select * from stu order by RAND() limit 1;
```

最后报名的同学

```js
select * from stu order by desc limit 1;
```

第二和第三报名的同学

```js
// limit 是从零开始的
SELECT * FROM stu ORDER BY id ASC limit 1,2;
```

查找 2 班 年龄最小的同学

```js
SELECT * FROM stu WHERE class_id=2 and age is not null order by age asc limit 1;
//以上代码不正确，因为可能有同年龄的同学，所以可以使用子查询操作
select * from stu where age = (
	select age from stu where class_id=2 and age is not null order by age asc limit 1
)
```

## 其他操作

### 更新数据

将班级为2 的学生改为班级 3

```js
UPDATE stu SET class_id=3 WHERE class_id =2;
```

**2 班年龄小于20 岁的同学年龄设置为null**

```js
UPDATE stu SET age = null where age =20 and class_id=2;
```

**将年龄小于20的同学年龄加10岁**

```js
UPDATE stu SET age=age+10 WHERE age<20;
```

### 删除记录

**删除所有年龄小于20 的同学**

```js
DELETE FROM stu WHERE age<20;
```

**删除所有年龄小在30并没有班级的同学**

```js
DELETE FROM stu WHERE class_id IS NULL AND age <30;
```

### 添加数据

**添加一条记录**

```js
INSERT INTO stu SET sname = 'node,age=20,class_id=1'
```

**添加多条记录**

```js
INSERT INTO stu (sname,class_id,age) VALUES("张三",2,22),("李四",1,23)
```

