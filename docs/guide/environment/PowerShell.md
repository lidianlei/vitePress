# PowerShell

下面是我在windows 系统中定义的powershell，首先执行命令打开配置文件

```bash
code $PROFILE
```

然后设置配置项内容

```js
function ssh-copy-id([string]$userAtMachine, $args) {
    $publicKey = "$ENV:USERPROFILE\.ssh\id_rsa.pub"
    if (!(Test-Path "$publicKey")) {
        Write-Error "ERROR: 公钥文件不存在 '$publicKey'"
    } else {
        Get-Content "$publicKey" | ssh $args $userAtMachine "umask 077; test -d .ssh || mkdir .ssh; cat >> .ssh/authorized_keys"
    }
}
function prompt { "后盾人编程-晚八点直播:$(Get-Location | Split-Path -Leaf)> " }
# php命令
function pa() { php artisan $args }
# frpc命令
function frpc { Invoke-Expression "C:\Users\23000\code\frp\frp_0.61.2_windows_amd64\frpc.exe -c C:\Users\23000\code\frp\frp_0.61.2_windows_amd64\frpc.toml" }
# git快捷键 
function gs { Invoke-Expression "git status" }
Remove-Item Alias:gc -Force -ErrorAction SilentlyContinue
function gc {
    param([string]$Message)
    if (Test-Path .git) {
        git commit -m "$Message"
    } else {
        Write-Host "当前目录不是Git仓库" -ForegroundColor Red
    }
}
function gl { Invoke-Expression "git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit" }
function gb { Invoke-Expression "git branch" }
function ga { Invoke-Expression "git add -A" }
function go { Invoke-Expression "git checkout" }
Remove-Item Alias:gp -Force -ErrorAction SilentlyContinue
function gp {
    try {
        git push origin HEAD
        git push gitee HEAD
    }
    catch {
        Write-Host "操作失败: $_" -ForegroundColor Red
    }
}
# 打开目录 
function open {
    Start-Process $args[0] -ArgumentList $args[1..($args.Count-1)]
}
# cursor打开文件或目录 
function c {
    param(
        [Parameter(Mandatory=$true)]
        [string]$FilePath
    )
    # 修改为你的Cursor实际安装路径
    $cursorPath = "C:\Users\23000\AppData\Local\Programs\cursor\Cursor.exe"
    
    if (Test-Path $cursorPath) {
        & $cursorPath $FilePath
    } else {
        Write-Host "错误：未找到Cursor程序路径，请检查安装路径" -ForegroundColor Red
    }
}

# npm命令
function pi { Invoke-Expression "pnpm install" }
function pd { Invoke-Expression "pnpm run dev" }
function pb { Invoke-Expression "pnpm run build" }
```

