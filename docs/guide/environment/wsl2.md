# wsl2

## 安装配置

下面介绍 wsl2 的安装与配置和删除操作，建议你按照微软[wsl安装文档](https://learn.microsoft.com/zh-cn/windows/wsl/install)安装一下，下面是向军提炼的内容。

首先开启 windows 子系统功能，操作步骤如下

1. 打开“控制面板” > “程序” > “启用或关闭 Windows 功能”。
2. 找到“适用于 Linux 的 Windows 子系统”选项，勾选它。

然后查看支持的linux版本，在终端命令行执行以下命令

结果如下

```bash
PS C:\Users\23000> wsl --list --online
以下是可安装的有效分发的列表。
使默认分发用 “*” 表示。
使用 'wsl --install -d <Distro>' 安装。

  NAME                                   FRIENDLY NAME
* Ubuntu                                 Ubuntu
  Debian                                 Debian GNU/Linux
  kali-linux                             Kali Linux Rolling
  Ubuntu-18.04                           Ubuntu 18.04 LTS
  Ubuntu-20.04                           Ubuntu 20.04 LTS
  Ubuntu-22.04                           Ubuntu 22.04 LTS
  OracleLinux_7_9                        Oracle Linux 7.9
  OracleLinux_8_7                        Oracle Linux 8.7
  OracleLinux_9_1                        Oracle Linux 9.1
  openSUSE-Leap-15.5                     openSUSE Leap 15.5
  SUSE-Linux-Enterprise-Server-15-SP4    SUSE Linux Enterprise Server 15 SP4
  SUSE-Linux-Enterprise-15-SP5           SUSE Linux Enterprise 15 SP5
  openSUSE-Tumbleweed                    openSUSE Tumbleweed
```

然后执行命令进行安装

```css
wsl --install Ubuntu
```

安装后执行wsl 进入子系统，然后执行以下命令更新 ubuntu 系统

```sql
sudo apt-get update
sudo apt-get upgrade
```

## 删除 WSL

访问设置 > 应用 >安装的应用，然后删除 ubuntu 子系统。

## brew

建议在wsl中安装 brew 来管理安装软件，访问 [brew使用文档](https://www.houdunren.com/doc/article/21/202)，如安装node、zsh、nrm 等都可以使用brew来管理，方便快捷。

## vscode

vscode需要安装 [wsl]([Remote Development - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)) 插件用于使用wsl子系统。