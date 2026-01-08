# WORDPRESS

wordpress 是非常受欢迎的内容管理系统，下面我们以 wordpress 为例加深对 DOCKER 的理解。

## MYSQL

下载镜像并创建容器

```bash
docker run --name mysql5.7 --rm -e MYSQL_ROOT_PASSWORD=admin888 -e MYSQL_DATABASE=wordpress -d mysql:5.7.28
```

| 参数                            | 说明                 |
| ------------------------------- | -------------------- |
| --name                          | 新建容器的名称       |
| --rm                            | 容器关闭后自动删除   |
| -e MYSQL_ROOT_PASSWORD=admin888 | 数据库 root 帐号密码 |
| -e MYSQL_DATABASE=wordpress     | 创建数据库 wordpress |
| mysql:5.7.28                    | 使用的镜像           |

测试连接

```bash
docker exec -it mysql5.7 mysql -uroot -padmin888
```

| 参数                    | 说明                                     |
| ----------------------- | ---------------------------------------- |
| -it                     | 为容器分配终端来通信，这样就可以发送命令 |
| mysql5.7                | 连接的容器                               |
| mysql -uroot -padmin888 | 向容器发送的指令                         |

## WORDPRESS

使用官方镜像创建容器，镜像已经内置了 APACHE

```ruby
docker run -d --name wordpress --rm -p 8080:80 -e WORDPRESS_DB_USER=root -e WORDPRESS_DB_PASSWORD=admin888 -e WORDPRESS_DB_NAME=wordpress -v "$HOME/wordpress":/var/www/html --link mysql5.7:mysql wordpress
```

参数说明

| 参数                               | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| --name                             | 新建容器的名称                                               |
| --rm                               | 容器关闭后自动删除                                           |
| -p 8080:80                         | 主机端口转发到容器的 80 端口                                 |
| -e WORDPRESS_DB_USER=root          | 连接 MYSQL 帐号                                              |
| -e WORDPRESS_DB_PASSWORD=admin888  | 连接 MYSQL 密码                                              |
| -e WORDPRESS_DB_NAME=wordpress     | MYSQL 数据库用户                                             |
| -v "$HOME/wordpress":/var/www/html | 将本机 `$HOME/wordpress`目录链接到虚拟机的 `/var/www/html` 目录 |
| --link mysql5.7:mysql              | 连接到 mysql5.7 容器                                         |
| wordpress                          | 容器使用的镜像                                               |

### link

link 语法为 `<name or id>:alias` ，alias 是源容器在目标容器中的别名。即 mysql 容器在 wordpress 容器中的别名，下面我们来进行说明。

登录 wordpress 容器

```bash
docker exec -ti wordpress /bin/bash
```

查看 `/etc/hosts`文件可以看到，通过 link 设置的名称连接到 mysql 主机

```undefined
172.17.0.2  mysql 47350fbe49c5 mysql5.7
```

但在 wordpress 中 link 的别名默认是不能改的，因为 wordpress 配置文件 `/var/www/html/wp-config.php`使用的是「mysql」这个名子。

如果你的 link 使用了不同的名称，这里也要改才可以安装。

```sql
/** MySQL hostname */
define( 'DB_HOST', 'mysql');
```