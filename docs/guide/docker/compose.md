## 安装软件

Docker Compose 是 Docker 容器进行编排的工具，定义和运行多容器的应用，可以一条命令启动多个容器。

如果没有 docker-compose，那么每次启动的时候，你需要敲各个容器的启动参数，环境变量，容器命名，指定不同容器的链接参数等等一系列的操作，相当繁琐

**下载安装**

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

**添加执行权限**

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

**查看安装版本**

```bash
docker-compose --version
```

## 编排容器

下面我们还是以 wordpress 为例来使用 compose 编排镜像，创建文件 `docker-compose.yaml` 内容如下

```yaml
version: "3.3"
services:
  mysql:
    image: mysql:5.7.28
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=admin888
      - MYSQL_DATABASE=wordpress
  wordpress:
    image: wordpress:latest
    restart: always
    depends_on:
      - mysql
    environment:
      - WORDPRESS_DB_HOST=mysql:3306
      - WORDPRESS_DB_PASSWORD=admin888
      - WORDPRESS_DB_USER=root
      - WORDPRESS_DB_NAME=wordpress
    ports:
      - "8080:80"
    working_dir: /var/www/html
    volumes:
      - ./html:/var/www/html
```

属性说明

| 属性        | 说明                                                        |
| ----------- | ----------------------------------------------------------- |
| version     | 当前文件格式版本，不同版本配置属性不同                      |
| services    | 容器列表                                                    |
| image       | 容器使用的镜像                                              |
| environment | 容器环境变量                                                |
| restart     | DOCKER 进程重起时重起容器 no:不重起，always:保持重起        |
| depends_on  | 依赖的容器                                                  |
| ports       | 宿主机和容器之间的端口映射关系                              |
| working_dir | 工作目录即 wordpress 项目目录                               |
| volumes     | 容器和宿主机的卷映射关系，将.html 映射到容器的/var/www/html |

现在访问 `192.168.31.47:8080` 将会看到 wordpress 界面了



![image-20200111001650183](https://cdn-image.houdunren.com/doc/docker/image-20200111001650183.png)



## 网络

如果 `docker-compose.yaml` 存在于 **houdunren** 目录中，系统会自动创建 hodunren_default 网络，所有容器会加入这个网络，容器间也可以使用容器名进行连接通信。

所以上例中的 wordpress 容器中的 PHP 代码可以使用 mysql 来连接 mysql 容器

每次执行`docker-compose up` 后容器的 IP 地址会发生改变

## 常用命令

需要在 `docker-compose.yaml`同级执行，命令根据该文件进行操作。

查看容器

```bash
docker-compose ps
```

重起项目的服务

```bash
docker-compose restart
```

重起指定容器

```bash
docker-compose restart mysql
```

起动编排的容器

```bash
docker-compose up -d
```

关闭容器

```bash
docker-compose down
```

删除容器

```bash
docker-compose rm mysql
```