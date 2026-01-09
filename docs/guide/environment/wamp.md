# WAMP

wamp 是 windows 系统中老牌的也是优秀的集成化开发环境。

## 安装

1. 安装前先安装 vc 扩展:vcredist_arm.exe ,64 位系统安装 vcredist_x64.exe，32 位操作系统安装 vcredist_x86.exe
2. 安装 wamp 应用程序

## 目录

我将 `XAMPP` 安装在 `C:\wamp`

1. 站点目录 `C:\wamp\www`
2. PHP 模块目录 `C:\wamp\bin\php\php7.2.4`
3. 虚拟主机配置文件 `C:\wamp\apache\conf\extra\httpd-vhosts.conf`

## 环境变量

将 `php.exe` 设置到系统环境变量中，Mac/Linux 可以将 php 指令设置个软链接。

1. 右键点击 `我的电脑>属性`
2. 点击 `高级系统设置>环境变量`，在 `系统变量` 处选择 `Path` 选项，添加 php 命令所在目录 `C:\wamp\bin\php\php7.2.4`

## 修改 Mysql 密码

有时我们使用一些 PHP 的产品要求 Mysql 必须有密码，下面我们就来设置 Mysql 的密码。

mysql 5.7 密码字段由 `password` 改为　 authentication_string

```sql
UPDATE mysql.user SET authentication_string=password('admin888') WHERE user='root';
flush privileges;
```

## 虚拟主机

wamp 可以非常简单的添加虚拟主机，并会自动修改 `C:\Windows\System32\drivers\etc\hosts` 文件，是 windows 系统中配置虚拟主要方便的。

使用 wamp 面板重新起动 Apache，现在访问 hdcms.hd/ 就会访问到 `C:\wamp\www\blog\public` 目录（请先在 public 目录创建个 index.php 文件为站点默认文件）

## HeidiSQL

HeidiSQL 是一款用于简单化迷你的 MySQL 服务器和数据库管理的图形化界面适用于 windows 操作系统。

登录官网下载 `https://www.heidisql.com/download.php`

**配置 mysql 命令**

## sequelpro

sequelpro 是专为 Mac 用户准备的免费 Mysql 管理软件。

下载 https://sequelpro.com/download

> 各软件都是图形界面，功能使用都直观简单，所以就进行介绍了。

## Laravel

如果你是在版本低于 5.7.7 的 MySQL release 上创建索引，那就需要你手动配置迁移生成的默认字符串长度。

在 AppServiceProvider.php 文件里的 boot 方法里设置

```php
public function boot()
{
    \Schema::defaultStringLength(191);
}
```