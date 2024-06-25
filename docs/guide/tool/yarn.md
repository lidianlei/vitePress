# Yarn

Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快

访问 [yarnpkg.com (opens new window)](https://yarnpkg.com/getting-started)下载安装Yarn

## 安装配置

### 软件安装

全局安装

```sh
npm install -g yarn
```

更新yarn到最新版本

```sh
yarn set version latest
```

苹果用户可以使用brew进行安装

```sh
brew install yarn
```

查看版本

```sh
yarn -v
yarn --version
```

更新yarn

```sh
yarn set version latest
yarn set version from sources
```

### 国内镜像

修改国内镜像后可以加快软件包安装速度

查看当前使用的镜像

```sh
yarn config get registry
```

设置为淘宝镜像

```sh
yarn config set registry https://registry.npm.taobao.org/
```

### yrm

yrm是管理镜像的工具，可以列出可以使用的镜像，非常方便。

安装yrm

```sh
npm install -g yrm
```

安装yrm

```sh
npm install -g yrm
```

列出可以使用的镜像

```sh
yrm ls
```

使用淘宝镜像

```sh
yrm use taobao
```

测试镜像速度

```sh
yrm test taobao
```

## 常用命令

访问命令列表

```sh
yarn help
```

初始化新项目

```sh
yarn init
```

根据package.json来安装项目依赖的软件包

```sh
yarn
# 或
yarn install
```

### 安装软件

**全局安装**

```sh
yarn global add [package]
```

**生产环境**

- 在package.json文件dependencies属性下增加记录
- yarn 时会自动安装该软件包
- 使用 yarn install --production或者NODE_ENV变量值为production时，安装该软件包

```sh
yarn add [package]
```

**开发环境**

- 在package.json文件devDependencies属性下增加记录
- npm install 时会自动安装该软件包
- 使用npm install --production或者NODE_ENV变量值为production时，不会安装该软件包

```sh
yarn add [package]@[version] –dev
#或
yarn -D add [package]
```

安装package.json中的软件

```sh
yarn 
# 或
yarn install
```

### 查看软件

### 查看软件

列出当前项目的依赖

```sh
yarn list
```

查看本地已安装的包信息

```sh
yarn list | grep tailwind
```

列出项目的依赖，并限制显示的依赖深度

```sh
npm list --depth=0
```

查看远程软件包信息

```sh
yarn info tailwindcss
```

查看软件包的README

```sh
yarn info tailwindcss readme
```

### 更新软件

更新所有软件包

```sh
yarn upgrade
```

更新指定软件包

```sh
yarn upgrade [package]@[version]
```

更新`yarn`自身

```sh
yarn set version latest
```

直接更新到最新版本，忽略package.json中的版本规则 （慎用）

```sh
yarn upgrade --latest
```

### 卸载软件

删除全局软件

```sh
yarn remove  -g [package]
```

删除项目中软件包

```sh
yarn remove  [package]
```

### 缓存控制

列出已缓存的每个包

```sh
yarn cache list 
```

全局缓存位置

```sh
yarn cache dir
```

清除缓存

```sh
yarn cache clean
```