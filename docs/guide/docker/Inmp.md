## 章节介绍

本章我们通过配置 LNMP 环境，学习镜像配置与容器编排，最终在环境中可以良好运行 LARAVEL 框架，同时使用代理转发构建单一服务器构建多个 DOCKER 网站。

本章节内容已经创建独立项目，请访问 [GITHUB](https://github.com/houdunwang/docker) 或 [GITEE](https://gitee.com/houdunren/docker) 查看

## 安装配置

下面来配置 Docker 运行环境

### 安装 Docker

首先访问 [Docker Hub](https://hub.docker.com/) 下载安装 Docker

### 宿主机

完成本章前要注意以下几点

1. 关闭服务器防火墙

   ```css
   systemctl stop firewalld.service
   ```

2. 关闭宿主机 NGINX | APACHE 服务，因为有可能设置和宿主相同端口，造成运行时不确定在改宿主还是容器

## 国内镜像

配置 Docker 国内镜像可以提高下载镜像的速度

### 国内镜像

下面是可以使用的 docker 国内镜像

```bash
Docker中国区官方镜像
https://registry.docker-cn.com

网易
http://hub-mirror.c.163.com

ustc
https://docker.mirrors.ustc.edu.cn

中国科技大学
https://docker.mirrors.ustc.edu.cn
```

### Mac

访问 docker 软件 `设置 > Docker Engine` 进行配置



### Linux

Linux 需要修改`/etc/docker/daemon.json` docker 配置文件，并添加以下内容

```json
{
    "registry-mirrors": ["http://hub-mirror.c.163.com",     "https://docker.mirrors.ustc.edu.cn"]
}
```

## 目录结构

下面是实验的文件结构，便于有个全局认识

```lua
.
├── www                                     应用目录
│   ├── index.php
│   └── phpinfo.php
├── docker-compose.yaml
├── mysql                                   MYSQL容器
│   ├── Dockerfile              镜像配置
│   ├── data                            数据结构
│   └── log                             运行日志
├── nginx
│   ├── Dockerfile
│   ├── config
│   │   └── default.conf    NGINX配置
│   └── log                             运行日志
│       ├── access.log
│       └── error.log
└── php
    ├── Dockerfile
    └── config
        └── php.ini             PHP配置文件
```

## DOCKFILE

Dockerfile 是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建个性化的新镜像。

### PHP

先可以查看一下官方镜像都安装了哪些扩展，下面命令会下载镜像并进入到新生成的容器中

```bash
docker run -ti --rm php /bin/bash
```

在容器中执行命令可以查看到已经内置的模块，这里没有的模块就需要后面安装了

```undefined
php -m
```

#### 配置文件

下面是 PHP 的 dockfile 配置文件内容

```bash
#使用的基础镜像
FROM php:7.4-fpm
#作者
LABEL houdunren.com@xiangjun 2300071698@qq.com
#时区
ENV TZ Asia/Shanghai
#换国内源
RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt-get clean
RUN apt-get update
#基本更新
RUN apt-get update && apt-get install -y \
    vim \
    curl \
    net-tools \
    iputils-ping \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev
#安装GD扩展
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql
#安装REDIS/XDEBUG
RUN apt-get install -y libmemcached-dev zlib1g-dev
RUN pecl install redis-5.1.1
RUN pecl install memcached
RUN docker-php-ext-enable redis memcached
#使用镜像中的生产环境PHP.INI配置文件
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
#添加自定义配置文件
COPY ./config/php.ini $PHP_INI_DIR/conf.d/php.ini
# #容器工作目录
# WORKDIR /html
```

**说明**

1. RUN 指令是在镜像构建时执行，一般用于安装软件包
2. 安装软件包最好加上版本号，默认使用最新版本，这可能会造成以后再编译时和新版本不兼容
3. 如果编译速度慢，可以把上面注释的修改镜像国内源打开

#### 编译镜像

下面是对单个镜像的编译，其实使用 `docker-compose` 可以在编译镜像时同时编译，但下面还是了解一下编译命令的使用。

在 Dockerfile 文件所在目录执行编译镜像操作，-t 用于设置镜像名称

```bash
docker build -t houdunren/php .
```

也可以为镜像设置版本号，默认的版本是 `latest`

```bash
docker build -t houdunren/nginx:1.0.2 .
```

查看镜像编译是否成功

```undefined
docker images
```

### NGINX

下面是 NGINX 的 `nginx/Dockerfile` 配置

```sql
#使用的基础镜像
FROM nginx:1.21
#作者
LABEL houdunren.com@xiangjun 2300071698@qq.com

#基本更新
RUN apt-get update && apt-get install -y \
    vim \
    curl \
    net-tools \
    iputils-ping
```

下面设置虚拟主机配置文件 `nginx/config/default.conf`，设置了两个域名 `hdcms.test` 与 `houdunren.test`

```bash
server {
    listen      80;
    server_name hdcms.test;
    root /www/hdcms;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index  index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php$is_args$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
       fastcgi_pass   php:9000;
       fastcgi_index  index.php;
       fastcgi_param  SCRIPT_FILENAME  $realpath_root$fastcgi_script_name;
       include        fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

server {
    listen      80;
    server_name houdunren.test;
    root /www/houdunren;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index  index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php$is_args$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
       fastcgi_pass   php:9000;
       fastcgi_index  index.php;
       fastcgi_param  SCRIPT_FILENAME  $realpath_root$fastcgi_script_name;
       include        fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### MYSQL

mysql 的 `mysql/Dockerfile` 配置不需要过多配置

```sql
#使用的基础镜像
FROM mysql:8.0
#作者
LABEL houdunren.com@xiangjun 2300071698@qq.com
#基本更新
RUN apt-get update && apt-get install -y \
    vim \
    curl \
    net-tools \
    iputils-ping
```

## COMPOSE

使用 dock-compose 可以统一编排容器，减少容器单独启动的麻烦，同时也可以将配置一次定义，方便在不同服务器中利用。

### 配置文件

**.env** 配置文件用于定义配置变量，在 `docker-compose.yaml` 文件中使用，简化修改大文件的麻烦。

```bash
version: '3.31'
services:
    nginx:
        #DOCKFILE文件所在目录
        build: ./nginx
        #设置生成的镜像名
        image: ${CONTAINER_NAME_PRE}/nginx
        #容器名称
        container_name: '${CONTAINER_NAME_PRE}-nginx'
        #DOCKER进程重起时重起容器
        restart: always
        #端口映射
        ports:
            - '${NGINX_PORT}:80'
        #容器依赖
        depends_on:
            - php
        #目录映射
        volumes:
            - ./nginx/config:/etc/nginx/conf.d
            - ./nginx/log:/var/log/nginx
            - ./www:/www
    php:
        build: ./php
        image: ${CONTAINER_NAME_PRE}/php
        container_name: '${CONTAINER_NAME_PRE}-php'
        restart: always
        volumes:
            - ./www:/www
        depends_on:
            - mysql
    redis:
        build: ./redis
        image: ${CONTAINER_NAME_PRE}/redis
        container_name: '${CONTAINER_NAME_PRE}-redis'
        restart: always
        volumes:
            - ./redis/data:/data
            - ./redis/config/redis.conf:/usr/local/etc/redis/redis.conf
    mysql:
        build: ./mysql
        image: ${CONTAINER_NAME_PRE}/mysql
        container_name: '${CONTAINER_NAME_PRE}-mysql'
        restart: always
        environment:
            - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
            - MYSQL_DATABASE=${MYSQL_DATABASE}
            - MYSQL_USER=${MYSQL_USER}
            - MYSQL_PASSWORD=${MYSQL_PASSWORD}
            - MYSQL_ONETIME_PASSWORD=${MYSQL_ONETIME_PASSWORD}
        ports:
            - '${MYSQL_PORT}:3306'
        volumes:
            - ./mysql/data:/var/lib/mysql
            - ./mysql/log:/var/log/mysql
```

下面是 `docker-compose.ymal` 配置文件用来编排容器，放在项目的根目录（请看上面目录结构）

```bash
version: "3.3"
services:
  nginx:
    #DOCKFILE文件所在目录
    build: ./nginx
    #设置生成的镜像名
    image: houdunren/nginx
    #容器名称
    container_name: houdunren-nginx
    #DOCKER进程重起时重起容器
    restart: always
    #端口映射
    ports:
      - "${PORT}:80"
    #容器依赖
    depends_on:
      - php
    #目录映射
    volumes:
      - ./nginx/config:/etc/nginx/conf.d
      - ./nginx/log:/var/log/nginx
      - ./www:/www
  php:
    build: ./php
    image: houdunren/php
    container_name: houdunren-php
    restart: always
    volumes:
      - ./www:/www
  mysql:
    build: ./mysql
    image: houdunren/mysql
    container_name: houdunren-mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=admin888
      - MYSQL_DATABASE=${MYSQL_DATABASE}
      - MYSQL_USER=${MYSQL_USER}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
      - MYSQL_ONETIME_PASSWORD=${MYSQL_ONETIME_PASSWORD}
    volumes:
      - ./mysql/data:/var/lib/mysql
      - ./mysql/log:/var/log/mysql
```

**注意事项**

因为 NGINX 与 PHP 需要通过容器名来通信，所以如果修改了容器名称需要修改 `nginx/config/default` 文件，将配置文件中的 `houdunren-php` 修改为新的 PHP 容器名称。

```ruby
location ~ \.php$ {
  ...
  fastcgi_pass   houdunren-php:9000;
  ...
}
```

### 项目配置

系统包括 NGINX、PHP 等软件的项目配置文件，修改这些配置文件不需要重新编译，只需要在`docker-compose.yaml`文件所在目录下重起容器就可以了。

```undefined
docker-compose restart
```

### 执行构建

使用以下命令启动构建

```undefined
docker-compose up -d
```

如果修改过 `docker-compose.yaml`配置文件，再次执行命令即可重新构建容器

```undefined
docker-compose up -d
```

## 容器访问

经过编排的过镜像已经在一个网络中，互相可以使用容器名来访问，这是后面做代理转发的前提。

下面是在`houdunren-php` 容器中来连接 `houdunren-nginx` 容器的试验

1. 查看容器列表

   ```css
   docker ps -a
   ```

2. 进入 houdunren-php 容器

   ```bash
   docker exec -ti houdunren-php /bin/bash
   ```

3. 来 PING 容器 houdunren-nginx

   ```undefined
   ping houdunren-nginx
   ```

## 域名解析

本地进行测试时需要修改 `hosts` 添加域名解析

```undefined
127.0.0.1 houdunren.test
127.0.0.1 hdcms.test
```

## LARAVEL

下面来安装 LARAVEL 项目，你可以安装任何其它 PHP 项目来使用，具体可以查看[后盾人](https://www.houdunren.com/)在线文档或视频学习 LARAVEL 的安装使用。

```bash
cd www
rm *
laravel new .
```

因为 LARAVEL 要解析到**public**目录，修改 NGINX 配置文件 `nginx/config/default.conf` 目录相关内容

```swift
location / {
    ...
  listen      80;
  server_name hdcms.test;
  root /www/hdcms/public;
  ...
}
...
location ~ \.php$ {
  ...
  fastcgi_param  SCRIPT_FILENAME  /www/hdcms/public$fastcgi_script_name;
  ...
}
```

修改配置后需要生起容器服务

```undefined
docker-compose restart
```

现在访问就可以看到 LARAVEL 欢迎页面了

## 数据库连接

下面我们使用 MYSQL 管理 GUI 工具 DBeaver 连接容器数据库，默认 MYSQL 端口是 33060 可以在.env 文件中修改。

如果修改了.env 中的配置需要重新编译容器

```undefined
docker-compose up -d
```

使用 DBeaver 访问
