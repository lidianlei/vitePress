# docker

## 基础知识

### 优势分析

应用应该脱离底层硬件的限制，在任何时间与地点可以获取 ，Docker 就是基于此思想 ，可以快速分发与部署。

有了 docker 可以轻松将网站在不同操作系统，不同云服务器中迁移。只要把容器打包，就可以轻松部署。不需要像过去一样，重复安装 mysql/php/apache....。

与虚拟机比较

- 使用内核虚拟化技术速度更快
- 系统资源占用少，一台主机上可以同时运行数千个 Docker 容器。
- 起动速度秒级，而虚拟机分钟级
- 硬盘占用更少，虚拟机是完整系统占用往往达到 G 级

> 官网文档: https://docs.docker.com/install/overview/

### 名词解释

**镜像**

镜像类似于虚拟机中的镜像，镜像是只读的，可以方便的从网上下载镜像，类似面向对象编程中的类。[仓库](https://hub.docker.com/search?q=&type=image) 中已经存在非常多的镜像，我们可以直接下载使用，后期向军大叔也会教大家自己开发镜像。

镜像是以 `组织/镜像` 的结构保存在 [仓库](https://hub.docker.com/search?q=&type=image) 中

```js
docker pull lorisleiva/laravel-docker
```

但官方组织中的镜像可以省略组织名，如 `hello-world` 是官方镜像可以简写

```js
docker pull hello-world
```

**容器**

容器是从镜像创建的运行对象，也是我们最终应用的场所。可以启动/删除/停止，容器间都是相互独立的，类似面向对象编程中的对象。

**仓库**

类型于管理镜像的 GITHUB，可以将镜像提交到仓库，供其他用户或其他平台轻松使用。

## CENTOS

下面介绍在 `CENTOS`中安装 DOCKER 环境，也可以查看[官方文档](https://docs.docker.com/install/linux/docker-ce/centos/)进行安装。

1. 建议选择次版本，最新版本可能出现软件不兼容问题
2. 以下命令如果使用 root 执行，就不需要使用 sudo 了

### 初始环境

1. 卸载旧版本

   ```bash
   sudo yum remove docker \
                    docker-client \
                    docker-client-latest \
                    docker-common \
                    docker-latest \
                    docker-latest-logrotate \
                    docker-logrotate \
                    docker-engine
   ```

2. 安装工具包

   ```bash
   sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
   ```

3. 添加软件仓库

   ```bash
   sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo
   
   sudo yum-config-manager --enable docker-ce-nightly
   sudo yum-config-manager --enable docker-ce-test
   sudo yum-config-manager --disable docker-ce-nightly
   ```

### 安装软件

1. 默认源里的`containerd.io`版本太低，需要安装最新版本

   ```bash
   sudo yum -y install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
   ```

2. 安装最新版本 DOCKER

   ```bash
   sudo dnf install -y docker-ce docker-ce-cli containerd.io
   ```

3. 查看是否安装成功

   ```undefined
   docker -v
   ```

4. 启动 DOCKER

   ```bash
   sudo systemctl start docker
   ```

5. 将 docker 加入系统启动服务，使其开机自动运行

   ```bash
   sudo systemctl enable docker
   ```

6. 通过运行`hello-world` 映像来验证安装，会下载镜像并在容器中运行

   ```bash
   sudo docker run hello-world
   ```

## UBUNTU

### 环境配置

1. 删除旧版本

   ```csharp
   sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 更新`apt`包索引:

   ```sql
   sudo apt-get update
   ```

3. 安装包以允许`apt`通过 HTTPS 使用存储库:

   ```bash
   sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      software-properties-common
   ```

4. 添加 Docker 的官方 GPG 密钥:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```

   `9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88`通过搜索指纹的最后 8 个字符，验证您现在拥有带指纹的密钥 。

   ```bash
   sudo apt-key fingerprint 0EBFCD88
   
   pub   rsa4096 2017-02-22 [SCEA]
        9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
   uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
   sub   rsa4096 2017-02-22 [S]
   ```

5. 添加软件源

   ```bash
   sudo add-apt-repository \
     "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) \
     stable"
   ```

6. 更新`apt`包索引。

   ```sql
   sudo apt-get update
   ```

**某些系统更新失败**

当执行 `apt-get update` 失败时，使用命令 `sudo software-properties-gtk` 在软件的 `Other Software`标签中将 `https://download.docker.com/linux/ubuntu` 源的`distribution` 值设置为 `bionic`,也可以直接修改 `/etc/apt/source.lists` 文件。

### 安装方法

1. 安装*最新版本*的 Docker CE 和 containerd，或者转到下一步安装特定版本:

   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

2. 通过运行`hello-world` 映像验证是否正确安装了 Docker CE 。

   ```bash
   sudo docker run hello-world
   ```

### 进程维护

1. 停止、启动、重启 docker

   ```bash
   sudo systemctl start | stop | restart docker.service
   ```

2. 查看 docker 版本

   ```bash
   sudo docker version
   ```

3. 加入开机自启

   ```bash
   sudo systemctl enable docker
   ```

4. 开机启动检测

   ```bash
   sudo systemctl list-unit-files | grep docker
   ```

### 维护升级

**升级**

要升级 Docker CE，请先运行`sudo apt-get update`

**卸载**

```bash
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker docker.io
sudo rm -rf /var/lib/docker
sudo apt autoremove
```

## MAC

### 安装软件

**Docker Desktop for Mac**

下载地址: https://hub.docker.com/?overlay=onboarding

**Docker Toolbox**

点击下图链接，在弹出的窗口中点击下载即可。



![image-20190607194238228](https://cdn-image.houdunren.com/doc/docker/image-20190607194238228.png)



Docker Toolbox 包括以下 Docker 工具:

- Docker CLI 客户端，用于运行 Docker Engine 以创建映像和容器
- Docker Machine，因此您可以从 Windows 终端运行 Docker Engine 命令
- Docker Compose 用于运行`docker-compose`命令
- Kitematic，Docker GUI
- 为 Docker 命令行环境预配置的 Docker QuickStart shell
- Oracle VM VirtualBox

## 帐号权限

每次运行 docker 都要使用 `sudo`，下面介绍使用当前登录帐号执行 docker 的方法 。

**设置帐号**

1. 创建`docker`组。

   ```bash
   sudo groupadd docker
   ```

2. 将当前用户添加到该`docker`组。

   ```bash
   sudo usermod -aG docker $USER
   ```

3. 注销帐号并重新登录

4. 验证您是否可以运行`docker`命令`sudo`。

   ```undefined
   docker images
   ```

## 镜像加速

提升国内用户访问 Docker Hub 拉取镜像的速度及稳定性。

### LINUX

1. 修改配置文件

   ```bash
   sudo vim /etc/docker/daemon.json
   ```

2. 添加国内镜像

   ```json
   {
    "registry-mirrors": [
      "https://hub-mirror.c.163.com",
      "https://mirror.ccs.tencentyun.com",
      "https://docker.mirrors.ustc.edu.cn"
    ]
   }
   ```

3. 更新镜像缓存

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

### MAC

右键点击桌面顶栏的 docker 图标，选择 `Preferences` ，在 Daemon 标签（Docker 17.03 之前版本为 Advanced 标签）下的 Registry mirrors 列表中加入下面的镜像地址:

```bash
http://f1361db2.m.daocloud.io
或
http://hub-mirror.c.163.com
```

点击 Apply & Restart 按钮使设置生效。

Docker Toolbox 等配置方法请参考[帮助文档](http://guide.daocloud.io/dcs/daocloud-9153151.html#docker-toolbox)。

### WINDOWS

Docker For Windows

在桌面右下角状态栏中右键 docker 图标，修改在 Docker Daemon 标签页中的 json ，把下面的地址:

```bash
http://f1361db2.m.daocloud.io
```

加到" `registry-mirrors`"的数组里。点击 Apply 。

## 镜像管理

镜像是以 `组织/镜像` 的结构保存在 [仓库](https://hub.docker.com/search?q=&type=image) 中

### 搜索镜像

```sql
docker search ubuntu
```

### 安装镜像

使用 `pull` 可以从[仓库](https://hub.docker.com/search?q=&type=image)下载镜像

```bash
docker pull lorisleiva/laravel-docker
```

但官方组织中的镜像可以省略组织名，如 `hello-world` 是官方镜像可以简写

```undefined
docker pull hello-world
```

使用 `run` 命令用来通过镜像生成容器，如果镜像不存在会从仓库下载，也就是具有 `pull` 功能

```undefined
docker run hello-world
```

### 查看镜像

```undefined
docker images
```

### 删除镜像

可以使用 name 或 tag 删除镜像，要保证没有容器使用该镜像。

```undefined
docker rmi -f ubuntu:latest
```

批量删除镜像

```css
docker rmi -f `docker images -q`
```

强制删除镜像，即便有容器引用该镜像

```undefined
docker rmi -f ubuntu
```

删除所有无用镜像

```css
docker image prune -a
```

## 容器管理

### 启动停止

以守护进程启动容器

```bash
docker run -tid ubuntu /bin/bash
# -i 表示允许我们对容器进行操作 -t 表示在新容器内指定一个为终端 -d 表示容器在后台执行
```

通过`-name` 设置容器名 hd

```bash
docker run -tid --name hd ubuntu /bin/bash
```

容器停止运行后自动删除

```bash
docker run -tid --rm --name hd ubuntu /bin/bash
```

停止容器

```css
docker stop 3c5e00452777
```

批量停止所有容器

```css
docker stop `docker ps -q`
```

kill 立刻停止容器，类似于直接关机

```bash
docker kill 3c5e00452777
```

启动停止的容器

```sql
docker start 3c5e00452777
```

### 查看容器

查看运行的容器

```undefined
docker ps
```

查看所有容器，包括停止的容器

```css
docker ps -a
```

查看容器进程

```css
docker top ubuntu
```

查看容器端口映射

```undefined
docker port xx
```

查看容器元信息(如 IP)

```undefined
docker inspect xx
```

容器异常时通过查看日志分析

```undefined
docker logs xx
```

过滤显示信息

```swift
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}"
```



![image-20200112143423090](https://cdn-image.houdunren.com/doc/docker/image-20200112143423090.png)



### 删除容器

删除容器，如果在使用将无法删除

```bash
docker rm hdcms
```

强制删除指定容器

```bash
docker rm -f hdcms
```

批量删除容器

```bash
docker rm  -f  `docker ps -aq`
```

清理所有停止运行的容器

```bash
docker container prune
# or
docker rm $(docker ps -aq)
```

清理所有无用数据卷

```undefined
docker volume prune
```

### 登录容器

```bash
docker exec -it 3c5e00452777 /bin/bash
```

### 常用命令

在宿主环境执行容器命令，下面是在 `houdunren-php` 容器中执行命令 `php -v`

```bash
docker exec -it houdunren-php /bin/bash -c 'php -v'
```

查看窗器内存等使用状况

```undefined
docker stats houdunren-php houdunren-nginx
```

运行结果如下

```css
CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT     MEM %     NET I/O       BLOCK I/O     PIDS
de32eaf31b74   houdunren-php     0.02%     7.434MiB / 1.941GiB   0.37%     1.01kB / 0B   1.68MB / 0B   3
122903daba2d   houdunren-nginx   0.00%     6.102MiB / 1.941GiB   0.31%     1.01kB / 0B   2.15MB / 0B   5
```

## 数据卷

数据卷是存在于一个或多个容器中的特定文件或文件夹，这个文件或文件夹以独立于 docker 文件系统的形式存在于宿主机中。数据卷的最大特定是:**其生存周期独立于容器的生存周期**

比如在多个容器共享数据时，多个容器会挂载一个数据卷，又或者使用 docker-compose 编排容器时自动定义的数据卷。

但随着 docker 的运行可能会出现很多无用的数据卷，造成磁盘空间占用过大，甚至达到 100%

**删除无用数据卷**

```undefined
docker volume prune
```

## 防火墙

在学习阶段可以先关闭防火墙，保证端口不受访问限制，以下是 LINUX 管理防火墙的基本指令

```bash
sudo systemctl stop firewalld.service
```

练习时也可以永久关闭防火墙

```bash
sudo systemctl disable firewalld.service
```

查看防火墙状态

```bash
sudo systemctl status firewalld.service
```

关闭 setlinux

1. 修改配置文件

   ```bash
   sudo vim /etc/selinux/config
   ```

2. 修改 `SELINUX` 值为 disabled，永久有效但需要重起系统

   ```bash
   SELINUX=disabled
   ```

3. 可以执行以下命令，立刻生效（建议和上面命令一起使用）

   ```bash
   setenforce 0
   ```