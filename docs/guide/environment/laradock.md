## laradock

laradock 包括预打包的 Docker 镜像，所有这些都经过预先配置，可提供出色的 PHP 开发环境。

Laradock 在 Laravel 社区中是众所周知的，因为该项目始于专注于在 Docker 上运行 Laravel 项目。后来由于 PHP 社区的大量采用，它开始支持其他 PHP 项目，如 Symfony，CodeIgniter，WordPress，Drupal ......

## 软件下载

### laradock

在您的计算机上的任何位置克隆此存储库

```shell
git clone https://github.com/Laradock/laradock.git
```

下载项目

```lua
composer create-project --prefer-dist laravel/laravel hdcms
...
```

### 项目安装

安装 Laravel 安装程序

```javascript
composer global require laravel/installer
```

创建软链接

```bash
sudo ln -s $HOME/.config/composer/vendor/bin/laravel /usr/bin/laravel
# 或在 .zshrc 中添加
alias laravel=/Users/hd/.composer/vendor/bin/laravel
```

创建项目

```sql
laravel new houdunren
# 如果不能使用 new 方式创建也可以使用以下方式
composer create-project --prefer-dist laravel/laravel houdunren
```

### 目录结构

最终目录结构如下

```diff
+ laradock
+ hdcms
+ houdunren
```

## 软件配置

重命名`env-example`为`.env`，.env 是 laradock 的配置文件。

```shell
cp env-example .env
```

## 容器构建

当修改了配置项后需要对镜像重新编译

重新编译 Mysql

```undefined
docker-compose build mysql
```

重新编译所有镜像并禁用缓存

```undefined
docker-compose build
```

## PHP

### 更改版本

**php 版本**

修改.env 配置文件版本为 7.3

```ini
PHP_VERSION=7.3
```

最后重建镜像

```bash
docker-compose build php-fpm
```

**PHP-CLI 版本**

修改.env 配置文件`PHP_VERSION`为 7.3。

```ini
PHP_VERSION=7.3
```

最后重建图像，执行 php-cli 是在 workspace 镜像的容器中所以需要重新构建 workspace

```bash
docker-compose build workspace
```

## Nginx

项目要与 laradock 同级，系统会自动将目录同步到服务窗口，下面是向军大叔的目录结构:

```diff
- laradock
- hdcms
- houdunren
```

### 站点配置

站点配置需要在 `laradock/nginx/sites` 目录中复制文件。

```bash
cp laravel.conf.example hdcms.conf
```

内容如下

```python-repl
...
server_name hdcms.test;
root /var/www/hdcms/public;
...
```

再复制创建 houdunren.conf，内容如下

```python-repl
...
server_name houdunren.test;
root /var/www/hdcms/public;
...
```

如果已经启动过容器需要执行以下命令

```undefined
docker-compose build nginx
docker-compose restart nginx
```

### 域名解析

设置宿主电脑 `/etc/hosts` 文件内容

```undefined
127.0.0.1       hdcms.test
127.0.0.1       houdunren.test
```

## Mysql

### 更改版本

默认情况下使用 MySQL 8.0 运行。您可能更喜欢使用其他版本，如:5.5,5.6,5.7,8.0 或最新版本。有关更多信息，请参阅https://store.docker.com/images/mysql。

1. 修改.env laradock 配置文件 `MYSQL_VERSION=5.7.26`
2. 重新编译 `docker-compose build mysql`
3. 如果已经运行则重新启动 `docker-compose restart mysql`

### 访问

在 laravel 项目中设置主机

```ini
DB_HOST=mysql
```

可以使用 sequel Pro 等客户端进行连接，默认连接帐号如下:

```makefile
host: 127.0.0.1
user:   root
password:   root
```

### PhpMyAdmin

`phpmyadmin`使用该`docker-compose up`命令运行 phpMyAdmin

```bash
# use with mysql
docker-compose up -d mysql phpmyadmin
```

打开浏览器并访问端口**8080**上的 localhost : `http://localhost:8080`，登录信息如下

```bash
host: mysql
user:   root
password:   root
```

## Redis

打开 Laravel 的`.env`文件并将其设置`REDIS_HOST`为`redis`

```bash
REDIS_HOST=redis
```

启用 Redis 缓存和/或会话管理。还从`.env`文件集`CACHE_DRIVER`，并`SESSION_DRIVER`于`redis`而不是默认的`file`。

```bash
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

最后确保通过 Composer 安装了`predis/predis`软件包:

```bash
composer require predis/predis
```

您可以使用以下代码从 Laravel 手动测试它:

```bash
\Cache::store('redis')->put('app', 'hdcms', 10);
```

## workspace

worspace 容器主要用来管理项目的。例如:执行一些 cli 的命令、php artisan、composer、php --version。

```bash
docker-compose exec --user=laradock workspace bash

php artisan migrate
```

## 运行项目

运行你的容器:

```bash
docker-compose up -d nginx mysql phpmyadmin redis workspace
```

> 下载镜像过程非常慢，要耐心等待。查看 houdunren.com 相关 docker 文档配置加速器可提升下载速度。

打开浏览器并访问 localhost : `http://hdcms.test`.

```bash
That's it! enjoy :)
```

## 容器管理

查看此项目容器(在项目的 laradocker 目录执行)

```bash
docker-compose ps
```

停止运行的所有容器

```bash
docker-compose stop
```

删除所有服务窗口

```bash
docker-compose down
```