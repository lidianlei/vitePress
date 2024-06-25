# nvm

## 安装配置

[nvm (opens new window)](https://github.com/nvm-sh/nvm)是 node 版本管理工具为了解决 node 各种版本存在不兼容现象，让你在同一台机器上安装和切换不同版本的 node 的工具

### Windows

下载安装 [nvm-windows](https://github.com/coreybutler/nvm-windows)

## 常用命令

获得帮助

```sh
nvm -h 
```

查看版本

```sh
nvm -v
```

查看/设置根路径

```sh
nvm root [path]
```

查看全部安装版本

```sh
nvm list
```

查看全部可安装版本

```sh
nvm list available
```

安装指定版本Node.js

```sh
nvm install <version>
```

卸载指定版本Node.js

```sh
nvm uninstall <version>
```

切换指定版本Node.js

```sh
nvm use <version>
```

查看当前使用的Node.js版本

```sh
nvm current
```

查看本地已安装的 node 版本，同时也会显示当前使用的 node 版本

```sh
nvm list
```

## 常见问题

如果之前使用 npm 安装过扩展包，现在想使用 NVM 进行管理。则首先需要从全局中删除 node_modules 目录

```sh
# 查看全局 node_modules 目录
npm root -g
```

```

```

