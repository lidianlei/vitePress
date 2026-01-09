# COMPOSER

Composer 是 PHP 的一个依赖管理工具。它允许你申明项目所依赖的代码库，它会在你的项目中为你安装他们。

## 安装更新

使用下面命令即安装，但也可以查看[官网](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)了解安装细节

### 安装

**MAC/LINUX**

使用 brew 安装是最简单的，支持 MAC 与 LINUX 操作系统

```undefined
brew install composer
```

也可以使用下面的官方安装方法

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('sha384', 'composer-setup.php') === 'c5b9b6d368201a9db6f74e2611495f369991b72d9c8cbd3ffbc63edff210eb73d46ffbfce88669ad33695ef77dc76976') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

php -r "unlink('composer-setup.php');"
```

> homestead 开发环境已经内置

**WINDOWS**

点击链接 `https://getcomposer.org/Composer-Setup.exe` 下载，直接安装就可以了。

### 更新

将 composer 更新到最新版本可以获取更多新特性

```undefined
composer selfupdate
```

### 国内镜像

使用 composer 安装软件时是从远程服务器下载的，但国内用户访问国外网站会过慢或不能访问。有些机构将国外的软件同步到了国内服务器。我们将 composer 下载的服务器指向到这个国内服务器，就可以实现快速下载软件了。

使用国内镜像可以让我们下载软件包速度更快，下面是使用[阿里云镜像](https://developer.aliyun.com/composer)的配置方法。

**全局配置**

```bash
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消镜像

```css
composer config -g --unset repos.packagist
```

**项目配置**

仅修改当前工程配置，仅当前工程可使用该镜像地址:

```bash
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

取消配置:

```lua
composer config --unset repos.packagist
```

## 版本说明

使用 composer 开发软件包，掌握版本号在 composer 的使用非常重要。

### 范围版本

使用 > ，>=，<，<=，!= 指定版本范围，用逗号分隔为逻辑与，用 `|` 分隔为逻辑或。

| 示例         | 说明                           |
| ------------ | ------------------------------ |
| 1.2.*        | 大于 1.2 版本且小于 1.3        |
| 1.2.5        | 等于 1.2.5 版本                |
| >=1.2        | 大于等于 1.2 版本的软件        |
| >=1.2,<=2.5  | 大于等于 1.2 并且小于 2.5 版本 |
| >2.0 \| =1.5 | 大于 2.0 或等于 1.5            |
| 1.0-3.0      | 大于等于 1.0 并且小于等于 3.0  |

### 大版本号

使用 `^` 限制大版本号的升级，一般来讲跨大版本号可能会有向下兼容性的问题

| 示例   | 说明                |
| ------ | ------------------- |
| ^1.5.1 | >=1.5.1 并且 <2.0.0 |
| ^0.2   | >=0.3.0 并且 <0.4.0 |

### 次版本号

使用 `~` 波浪号是对次版本号的限制

| 示例   | 说明                                       |
| ------ | ------------------------------------------ |
| ~1.2   | >=1.2 并且 <2.0.0，即不超过 2.0 的所有版本 |
| ~1.2.3 | >=1.2.3 并且 <1.3.0                        |

### 通配符

使用通配符指模糊匹配

| 示例  | 说明                        |
| ----- | --------------------------- |
| 1.0.* | 大于等于 1.0，小于 1.1 版本 |

### 稳定版本

在根包 composer.json 文件中定义的`minimum-stability`属性，决定了我们安装软件包的最低稳定版本，默认为`stable`即 Release 最终稳定版。如果想安装软件包为`dev`、`alpha`、`beta`、`RC` 版本的需要特殊指定。

下面对版本进行说明

| 版本                  | 说明                                |
| --------------------- | ----------------------------------- |
| dev                   | 正在开发版本，如 TAG 为 2.0.0-dev   |
| alpha                 | 内部测试版本，如 TAG 为 2.0.0-alpha |
| beta                  | 公开测试版本，如 TAG 为 2.0.0-beta  |
| RC(Release Candidate) | 最终测试版本，如 TAG 为 2.0.0-RC    |
| stable                | 最终稳定版本，标准 TAG 为 2.0.1     |

如果您的 composer.json 中没有明确定义[稳定版本](http://houdunren.gitee.io/note/composer/composer.html#minimum-stability)，则 Composer 将在内部默认为`-dev`或`-stable`。如果希望明确考虑仅稳定发行版，可以添加后缀`-stable`。

| 示例         | 说明                        |
| ------------ | --------------------------- |
| 1.2.3        | =1.2.3.0-stable             |
| >1.2         | >1.2.0.0-stable             |
| >=1.2        | >=1.2.0.0-dev               |
| >=1.2-stable | >=1.2.0.0-stable            |
| <1.3         | <1.3.0.0-dev                |
| <=1.3        | <=1.3.0.0-stable            |
| 1 - 2        | >=1.0.0.0-dev < 3.0.0.0-dev |
| ~1.3         | >=1.3.0.0-dev <2.0.0.0-dev  |
| 1.4.*        | >=1.4.0.0-dev <1.5.0.0-dev  |

## 扩展包管理

PHP 扩展软件包应用商店网址 [https://packagist.org](https://packagist.org/) ，开发中通过在应用商店中搜索需要的软件包进行安装就可以了。

使用软件前先行访问软件包的 `Github` 的 `Readme.md` 文件或提供的网站查看使用说明。下面列出常用的 composer 命令使用

### 安装软件

根据 composer.lock 或 composer.json 文件下载软件包到 vendor 目录中

```undefined
composer install
```

安装 `require-dev` 字段中列出的包

```css
composer install --dev
```

跳过 `require-dev` 字段中列出的包

```css
composer install --no-dev
```

安装项目

```bash
composer create-project houdunwang/hdcms hdcms
```

安装软件包

```bash
composer require houdunwang/wechat
```

安装指定版本的软件包

```javascript
composer require "houdunwang/wechat:^3.1"
```

安装 MASTER 分支的代码

```bash
composer require houdunwang/wechat:dev-master
```

### 查看信息

查看所有安装的软件包

```sql
composer show
```

查看安装的指定软件包的详细信息

```bash
composer show houdunwang/wechat
```

### 更新软件

更新所有扩展包

```sql
composer update
```

更新指令的软件包

```bash
composer update houdunwang/wechat
```

### 删除软件

删除软件包

```bash
composer remove houdunwang/wechat
```

搜索软件包

```bash
composer search houdunwang/wechat
```

### composer.lock

在安装依赖后，Composer 将把安装时确切的版本号列表写入 `composer.lock` 文件。

提交代码时需要将 composer.lock 文件一并提交，下载代码时将使用 composer.lock 锁定的版本安装，而不使用 composer.json 中的版本，这会使用项目更稳定。

如果不存在 composer.lock 将使用 composer.json 下载软件包，并创建 composer.lock 文件。

使用 composer update 命令时会使用 composer.json 的版本号更新软件包，并更新 composer.lock 文件

## 扩展包开发

开发一个本地包的标准流程是 `开发>git->packagist>使用` 但是我们在进行本地开发时，尤其是为某些产品开发组件时，比如 laravel 框架等。这样的操作方式非常不方便，我们希望直接在本地开发，并可以正常使用 `composer` 功能。

### GITHUB

首先在 GITHUB 中创建项目

CLONE 项目到本地

```bash
git clone git@github.com:houdunwang/houdunren.git
```

### 创建项目

进入上面 CLONE 的项目 houdunren 目录中，远行 `composer init` 创建 composer.json 配置文件。

```ruby
#项目名称一般以 github仓库名/包名 格式命名
Package name (<vendor>/<name>) [houdunren/houdunren]:

#项目介绍
Description []: 后盾人开源多平台管理系统

#作者以 作者<邮箱> 格式设置
Author [后盾人 <2300071698@qq.com>, n to skip]:后盾人 <2300071698@qq.com>

#安装软件包的最低稳定版本，默认为stable
Minimum Stability []:stable

#项目类型
Package Type (e.g. library, project, metapackage, composer-plugin) []:project
License []:MIT
```

### 自动加载

下面来定义软件的自动加载机制

**类自动加载**

在 composer.json 文件中声明 `autoload` 选项

```swift
{
    ...
    "autoload": {
    "psr-4": {
      "houdunwang\\houdunren\\": "src"
    }
  },
    ...
}
```

添加类文件`src/base/User.php`内容如下

```php
<?php

namespace houdunwang\houdunren\base;

class User
{
    static function show()
    {
        return "后盾人";
    }
}
```

手动修改了 composer.json 文件后需要重新生成缓存文件

```lua
composer dump-autoload
```

**文件加载**

修改 composer.json 文件的 autoload 选项，在 files 选项中添加自动加载的文件

```swift
{
    ...
    "autoload": {
    "files": [
      "src/helper.php"
    ],
    "psr-4": {
      "houdunwang\\houdunren\\": "src"
    }
  }
    ...
}
```

添加文件 `src/helper.php` 内容如下

```php
<?php
function app()
{
    return 'load service';
}
```

然后更新自动加载缓存文件

```lua
composer dump-autoload
```

### 项目入口

现在添加项目入口文件 public/index.php

```php
<?php

use houdunwang\houdunren\base\User;

#引入自动加载处理
require '../vendor/autoload.php';

echo User::show();
echo app();
```

### 配置服务器

服务器环境使用 homestead 来说明，其它环境与之类似。

修改 Homestead.yaml 文件添加目录同步与域名绑定，本项目代码放在 `~/code/houdunren`目录中

```yaml
folders:
    ...
    - map: ~/code
    to: /home/vagrant/code
  ...
sites:
    ...
    - map: houdunren.test
    to: /home/vagrant/code/houdunren/public
  ...
```

使用 switchHosts 软件配置域名解析

现在通过浏览器访问就可以看到输出内容了

```bash
http://houdunren.test
```

## 软件商店

下面在 [https://packagist.org](https://packagist.org/) 分享我们上面开发的软件包

### 帐号设置

首先在网站使用 GITHUB 帐号登录与 GITHUB 进行连接授权

也可以在 GITHUB 中查看绑定情况，访问`Applications > Authorized OAuth Apps` 页面，搜索 packagist 看到以下链接并点击

### 发布软件

下面我们来将软件发布到 [https://packagist.org](https://packagist.org/) ，如果下图进行项目提交

提交时出现以下错误

```csharp
We had problems parsing your composer.json file, the parser reports: The
```

表示版本库中不存在 composer.json 文件，我们使用 GIT 提交代码到版本库。

但 vendor 目录不用提交，所以创建 `.gitignore` 文件添加以下内容

```python-repl
...
/vendor
...
```

然后提交代码

```sql
git add .
git commit -m '初始构建'
git push
```

然后回到 [https://packagist.org](https://packagist.org/) 再次执行提交，如果看到以下界面表示成功

### 安装软件

软件已经发布到 packagist.org 了，我们来测试下安装

### 基本使用

下面创建目录来安装我们开发的软件包

```bash
mkdir hd
composer require houdunwang/houdunren
```

我们会发现有错误产生，这是告诉我们

```kotlin
Could not find a matching version of package houdunwang/houdunren. Check the package spe   │
  lling, your version constraint and that the package is available in a stability which ma   │
  tches your minimum-stability (stable).
```

这是因为 composer.json 中指定的`minimum-stability` 值为`stable`，即最低要求为稳定版本。

可以修改 `"minimum-stability": "dev"` 来降低最低安装要求，就可以安装了

```bash
composer require houdunwang/houdunren
```

当然也可以指令 `dev-master` 来安装 master 分支代码

```bash
composer require houdunwang/houdunren:dev-master
```

### 生成版本

如果项目已经开发完成需要发布稳定版本，进入项目目录执行以下 GIT 指令

```perl
#为稳定版本打标签 1.0
git tag v1.0

#推送标签到GITHUB
git push --tags
```

现在我们会在 GITHUB 看到 tag



也会在 [https://packagist.org](https://packagist.org/) 看到版本已经自动同步了

## 本地扩展

我们想创建一个扩展的同时，为本地已经存在项目使用。一般流程如下

1. 修改扩展包后提交生成新版本
2. 在本地项目上执行 composer update 进行更新

我们希望省掉上面的步骤，直接修改扩展包就可以为本地项目使用，目的已经介绍完了，我们来开始操作。

### 配置文件

比如我们的文件目录在 `~/code/houdunwang/arr`

```css
.
├── composer.json
├── src
│   └── Hd.php
└── tests
```

生成的 composer.json 配置文件，内容如下:

```swift
{
  "name": "houdunwang/arr",
  "description": "array extend module",
  "license": "MIT",
  "authors": [
    {
      "name": "houdunren",
      "email": "2300071698@qq.com"
    }
  ],
  "autoload": {
    "psr-4": {
      "Houdunwang\\arr\\": "src/"
    }
  }
}
```

> 根据自己的需要自行修改文件内容，比如 `require` 其他的扩展

### 安装到项目

在 `hdphp` 或 `laravel` 其实是任何 composer 项目的根目录下执行:

```css
composer config repositories.arr path ~/code/houdunwang/arr
```

这样就将包 `arr` 软链接到 `~/code/houdunwang/arr` 。修改 `~/code/houdunwang/arr` 目录下的文件，将影响到 `vendor/houdunwang/arr`。

这里观察 `laravel` 等 composer 项目根目录下的 `composer.json` 会多一段内容:

```bash
...
"repositories": {
    "arr": {
        "type": "path",
        "url": "/Users/xj/code/houdunwang/arr"
    }
}
...
```

> 表示使用我们本地的 composer 包，而非 packagist 下载的包

安装本地包与远程包没有什么区别。

```bash
composer require houdunwang/arr:dev-master
```

至些我们已经完成了，直接在 houdunwang/arr 目录中开发就可以了，而非 `vendor/houdunwang/module` 目录。

## 常用命令

查看已经安装扩展包信息与版本

```css
composer show -i
```

查看 composer 使用的镜像

```css
composer config -l -g
```

## 常见问题

- 执行`composer dump-autoload` 等命令时卡住不动

  将 Laravel-Modules 插件生成的模块中的 node_modules 目录删除