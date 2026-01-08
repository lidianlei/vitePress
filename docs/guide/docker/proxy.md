## 代理转发

## 安装项目

多个站点可以使用向上面配置 LARAVEL 然后在单一容器中配置虚拟主机，下面我们介绍配置多个容器实现多站点运行。

分别 CLONE 项目 houdunren 与 hdcms

```bash
mkdir test
cd test
git clone https://gitee.com/houdunren/docker.git houdunren
git clone https://gitee.com/houdunren/docker.git hdcms
```

## 容器配置

为每个项目设置配置项，如果端口或容器名相同会造成冲突无法启动

### 修改配置

**houdunren/.env**

```bash
#容器名前缀
CONTAINER_NAME_PRE=hdcms

#宿主机映射到容器的端口
PORT=8081

#宿主机映射到MYSQL容器的端口
MYSQL_PORT=33061
```

**hdcms/.env**

```bash
#容器名前缀
CONTAINER_NAME_PRE=hdcms

#宿主机映射到容器的端口
PORT=8082

#宿主机映射到MYSQL容器的端口j
MYSQL_PORT=33062
```

### 执行编译

在两个项目中分别执行命令完成编译

```bash
docker-compose up -d
```

现在可以看到容器列表

```bash
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}"
```



## 安装配置

在宿主环境中安装 NGINX 服务器软件，NGINX 在不同系统中的配置文件存放目录不同

### MAC

**软件安装**

下面安装 NGINX 服务器软件

```bash
brew install nginx
```

调试中难免有错误发生，通过错误日志可以很好排查

```bash
cat /usr/local/var/log/nginx/error.log
```

修改配置文件后需要重起 NGINX，下面介绍基本的管理命令

```bash
#开启
brew services start nginx
#停止
brew services stop nginx
#重起
brew services restart nginx
```

**文件说明**

1. `/usr/local/etc/nginx/nginx.conf` 为主配置文件
2. `/usr/local/etc/servers` 目录存放自定义配置文件，这样就不需要改主配置文件了

### CENTOS

**软件安装**

下面安装 NGINX 服务器软件

```bash
yum update && yum install nginx -y
```

调试中难免有错误发生，通过错误日志可以很好排查

```bash
cat /usr/local/var/log/nginx/error.log
```

修改配置文件后需要重起 NGINX，下面介绍基本的管理命令

```bash
#开启
systemctl start nginx
#停止
systemctl stop nginx
#重起
systemctl restart nginx
```

**文件说明**

1. `/etc/nginx/nginx.conf` 为主配置文件
2. `/etc/nginx/conf.d` 目录存放自定义配置文件，这样就不需要改主配置文件了

### HOSTS

如果在本地测试时，修改 `/etc/hosts`文件中添加两个域名，线上使用将域名解析过来就可以 了

```bash
127.0.0.1   hdcms.test
127.0.0.1   houdunren.test
```

## 配置代理

修改主配置文件 `nginx.conf`将 NGINX 默认 8080 端口改变 80

```bash
...
server {
    ...
  listen       80;
  server_name  localhost;
  ...
}
```

在 NGINX 配置目录（centos 为`/etc/nginx/conf.d`）创建 **hdcms.conf** ， **houdunren.conf** 两个配置文件

**houdunren.conf**

```bash
server {
    listen       80;
    server_name houdunren.test;
    access_log  /var/log/nginx/houdunren.log;
    error_log /var/log/nginx/houdunren.error.log;
    location / {
            proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8081;
    }
}
```

**hdcms.conf**

```bash
server {
    listen       80;
    server_name hdcms.test;
    access_log  /var/log/nginx/hdcms.log;
    error_log /var/log/nginx/hdcms.error.log;
    location / {
            proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8082;
    }
}
```

现在使用不同域名访问就可以被代理到不同的容器中了