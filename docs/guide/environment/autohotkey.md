# autohotkey

这个软件是用于定义windows快捷键的，大叔每天都在使用，非常好用。

## 普通机械键盘

下面是我定义的快捷键，你可以参考一下

```js
; 说明 ^为ctrl   !为alt   +为shift    #为win

; ctrl+tab 映射为 alt+tab
^Tab::Send #{Tab}

;ctl+1发送到任务栏的第一个图标
^1::Send #^{1}
^2::Send #^{2}
^3::Send #3
^4::Send #4
^d::Send #^5
^+2::Send #^{6}
^+3::Send #7
^+4::Send #8
^q::Send !{F4}
^Backspace::Send {Delete}

;ctrl+alt+左方向键 定义为 shift+tab 用于向左移动文本
^!Left::Send, +{Tab}
;ctrl+alt+右方向键 定义为 tab 用于向右移动文本
^!Right::Send, {Tab}

; 软件全屏
^!Enter::Send {F11}

; 改文件名
!Enter::Send {F2}

; 上下键控制
!n::Send {Down}
!p::Send {Up}

; 跳转到行首或行尾
^Left::Send {Home}
^Right::Send {End}

; 选择到行首或行尾
^+Left::Send +{Home}
^+Right::Send +{End}

; 将右侧Shift和alt键映射为媒体播放/暂停
RShift::Send {Media_Play_Pause}
RAlt::Send {Media_Play_Pause}

; end 媒体键（禁用）
; End::Send {Media_Play_Pause}

; 刷新
; ^r::Send {F5}

; ctrl+` 切换文件夹显示方式
toggleFileShowType := 0
^+~::  ; ctrl+` 热键
    if (toggleFileShowType = 0) {
        Send, ^!2  ; 发送 Ctrl+Alt+2
        toggleFileShowType := 1  ; 切换状态
    } else {
        Send, ^!6  ; 发送 Ctrl+Alt+6
        toggleFileShowType := 0  ; 重置状态
    }
return
```

## 笔记本键盘

由于笔记本键盘和普通机械键盘的布局不一样，所以需要将win、alt、ctrl进行一下定义，下面是专为笔记本定义的特殊配置

```js
; 笔记本改基础键 
LAlt::LCtrl
LWin::LAlt
LCtrl::LWin

;=====================================================================

; 说明 ^为ctrl   !为alt   +为shift    #为win

; ctrl+tab 映射为 alt+tab
^Tab::Send #{Tab}

;ctl+1发送到任务栏的第一个图标
^1::Send #^{1}
^2::Send #^{2}
^3::Send #3
^4::Send #4
^d::Send #^5
^+2::Send #^{6}
^+3::Send #7
^+4::Send #8
^q::Send !{F4}
^Backspace::Send {Delete}

;ctrl+alt+左方向键 定义为 shift+tab 用于向左移动文本
^!Left::Send, +{Tab}
;ctrl+alt+右方向键 定义为 tab 用于向右移动文本
^!Right::Send, {Tab}

; 软件全屏
^!Enter::Send {F11}

; 改文件名
!Enter::Send {F2}

; 上下键控制
!n::Send {Down}
!p::Send {Up}

; 跳转到行首或行尾
^Left::Send {Home}
^Right::Send {End}

; 选择到行首或行尾
^+Left::Send +{Home}
^+Right::Send +{End}

; 将右侧Shift和alt键映射为媒体播放/暂停
RShift::Send {Media_Play_Pause}
RAlt::Send {Media_Play_Pause}

; end 媒体键（禁用）
; End::Send {Media_Play_Pause}

; 刷新
; ^r::Send {F5}

; ctrl+` 切换文件夹显示方式
toggleFileShowType := 0
^+~::  ; ctrl+` 热键
    if (toggleFileShowType = 0) {
        Send, ^!2  ; 发送 Ctrl+Alt+2
        toggleFileShowType := 1  ; 切换状态
    } else {
        Send, ^!6  ; 发送 Ctrl+Alt+6
        toggleFileShowType := 0  ; 重置状态
    }
return
```