# Git

## 初始配置

配置文件为 `~/.gitconfig` ，执行任何 Git 配置命令后文件将自动创建

第一个要配置的是你个人的用户名称和电子邮件地址。这两条配置很重要，每次 Git 提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录

```js
git config --global user.email ""
git config --global user.name ""
```

## 基础入门

### 常用命令

1. 初始化新仓库 `git init`
2. 克隆代码 `git clone url`
3. 克隆指定分支 `git clone -b dev branchUrl`
4. 查看状态 `git status`
5. 提交单个文件 `git add index.ts`
6. 提交所有文件 `git add -A`
7. 使用通配符提交 `git add *.js`
8. 提交到仓库中 `git commit -m'提交信息'`
9. 提交已经跟踪过的文件，不需要执行add `git commit -a -m '提交信息'`
10. 删除版本库中文件但保存项目目录中文件 `git rm --cached index.ts`
11. 修改最后一次提交 `git commit --amend`
12. 暂存区文件恢复到工作区 `git checkout file`

###  基础流程

1. 首先初始化仓库

   ```js
   git init	
   ```

2. 添加新文件`01.txt`,这时新的文件并没有被版本管理，可以通过以下命令查看没有被管理的文件

   ```js
   git clean -n
   ```

3. 将所有文件提交到暂存区

   ```js
   git add .
   ```

   这时`git clean -n`命令查看的结果为空，即文件已经被版本库管理了

   ```js
   git clean -n
   ```

4. 不小心将工作区的`01.txt`文件删除，可以将暂存区的`01.txt`恢复回来

   ```js
   git checkout 01.txt
   ```

5. 创建一个新的提交，并使用`-m`选项说明完成的工作

   ```js
   git commit -m"描述"
   ```

6. 将代码提交到远程服务器

   ```js
   git push
   ```

##  暂存区

1. `git add .` 提交所有修改和新增的文件
2. `git add -u` 只提交修改文件不提交新文件
3. `git ls-files -s` 查看暂存区文件内容
4. `git cat-file -p 100644` 查看暂存区文件内容
5. `git reset` 撤销上次提交到暂存区动作

## 工作区

`git clean`命令是用来从工作目录中删除所有没有跟踪（tracked）过的文件

1. `git clean -n` 是一次`clean`的演习，告诉你哪些文件会被删除
2. `gir clean -f` 删除当前目录下没有tracked过的文件，不会删除`.gitignore`指定的文件
3. `git clean of` 删除当前目录下没有被tracked过的文件和文件夹
4. `git checkout .`将没有放入暂存区的所有文件恢复
5. `git checkout 01.txt`放弃指定文件的修改
6. `git checkout --01.txt`将文件从暂存区恢复（如果没有提交到暂存区，将恢复到最近版本）

## 日志查看

1. 查看日志 `git log`

2. 查看最近2次提交日志饼显示文件差异 `git log -p -2`

3. 显示已修改的文件清单 `git log --name-only`

4. 显示新增、修改、删除的文件清单 `git log --name-status`

5. 一行显示并只显示 SHA-1 的前几个字符， `git log --online`

6. 自定义的精简日志信息

   ```js
   git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
   ```

## 分支管理

分支用于为项目增加新功能或修复 Bug 时使用

### 分支流程

大部分情况下不会直接在 master 分支工作，我们应该保护这个分支是最终开发完成代码健康可交付运行的

所以功能和缺陷(bug)修复都会新建分支完成，除了这个概念外与基本流程使用是一样的

### 常用命令

1. 创建分支 `git branch dev`

2. 查看分支 `git branch`

3. 切换分支 `git checkout dev`

4. 创建并切换分支 `git checkout -b feature/bbs`

5. 将`main`更新为`master` `git branch -m main master`

6. 合并 dev 分支到 master

   ```
   git checkout master
   git merge dev
   ```

7. 删除分支 `git branch -d dev`

8. 删除没有合并的分支 `git branch -D dev`

9. 删除远程分支 `git push origin :dev`

10. 查看未合并的分支（切换到 master）`git branch --no-merged`

11. 查看已经合并的分支（切换到 master）`git branch --merage`

### 历史版本

下面演示基于历史版本创建分支

首先查看历史版本提交日志

```js
git log
```

切换到提交的 commit-id 历史版本

```js
git checkout commit-id
```

以历史版本 `commit-id` 创建新分支

```js
git checkout commit-id -b 新分支名称
```

## reset

使用`reset`恢复到历史提交节点，重置暂存区与工作目录的内容

### 可选参数

`reset`有三个选项可使用

1. **--hard**重置位置的同时，直接将**working Tree工作目录、index暂存区即repository**都重置成目标**Reset**节点内容
2. **--soft**重置位置的同时，保留**working Tree工作目录和index暂存区**的内容，只让**repository**中的内容和**reset**目标节点保持一致
3. **--mixed(默认)**重置位置的同时，只保留**Working Tree工作目录**的内容，但会将**index暂存区**和**Repository**中的内容更改为和reset目录节点一致

### 使用示例

1. `git reset` 将 add 到暂存区的内容会退
2. `git reset --hard num` 恢复到指定提交版本（先通过`git log`查看版本号），重置`stage`区和工作目录里的内容
3. `git reset --hard HEAD^^^` 恢复到前三个版本
4. `git reset --soft` 保留工作区的内容，只回退`commit`的动作，保留**working tree工作目录**的内容，**index暂存区与working tree**工作目录的内容一致，只是仓**repository**中的内容的改变
5. `git reset HEAD -- .` 撤销暂存区的文件
6. `git reset --hard` 清空工作区和暂存区的改动
7. `git reset HEAD index.js` 放弃已经 `add` 暂存区的`idnex.js`文件

## 其他知识

### 定义别名

通过创建命令别名可以减少命令输入量，有几种方式进行设置

**配置文件定义**

修改配置文件 ~/.gitconfig 并添加以下命令别名配置段

```js
[alias]
	a = add .
	c = commit
	s = status
	l = log
	b = branch
```

现在可以使用 `git a` 实现 `git add .` 一样的效果了

**系统配置定义**

window 用户可以修改`~/.bashrc` 或 `~/.bash_profile`文件。

mac/linux 修改 `~/.zshrc` 文件中定义常用的别名指令，需要首先安装 zsh 命令行扩展

```js
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gb="git branch"
alias ga="git add -A"
alias go="git checkout"
alias gp="git push;git push github"
```

### .gitignore

.gitignore 用于定义忽略提交的文件

- 所有空行或者以注释符号 `＃` 开头的行都会被 Git 忽略。
- 匹配模式最后跟反斜杠（`/`）说明要忽略的是目录。
- 可以使用标准的 glob 模式匹配。

```js
.idea
/vendor
.env
/node_modules
/public/storage
*.txt
```

### 冲突解决

不同分修改同一个文件或不同开发者修改同一个分支文件都可能造成冲突，造成无法提交代码。

1. 使用编辑器修改冲突的文件
2. 添加暂存 `git add .` 表示已经解决冲突
3. git commit 提交完成

### Stashing

当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作。问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。

"暂存" 可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用

1. 储藏工作 `git stash`
2. 查看储藏列表 `git stash list`
3. 应用最近的储藏 `git stash apply`
4. 应用更早的储藏 `git stash apply stash@{2}`
5. 删除储藏`git stash drop stash@{0}`
6. 应用并删除储藏 `git stash pop`

### Tag

Git 也可以对某一时间点上的版本打上标签 ，用于发布软件版本如 v1.0

1. 添加标签 `git tag v1.0`
2. 列出标签 `git tag`
3. 推送标签 `git push --tags`
4. 删除标签 `git tag -d v1.0.1`
5. 删除远程标签 `git push origin :v1.0.1`

### 打包发布

对 mster 分支代码生成压缩包供使用者下载使用，`--prefix` 指定目录名

```js
git archive master --prefix='git/' --format=zip > hdcms.zip
```

## 远程仓库

### SSH

使用 ssh 连接 Github 发送指令更加安全可靠，也可以免掉每次输入密码的困扰。

在命令行中输入以下代码（windows 用户使用 Git Bash）

```js
ssh-keygen -t rsa
```

一直按回车键直到结束。系统会在`~/.ssh` 目录中生成 `id_rsa`和`id_rsa.pub`，即密钥`id_rsa`和公钥`id_rsa.pub`

### 关联远程

1. 创建本地库并完成初始提交

   ```js
   echo "# hd-xj" >> README.md
   git init
   git add README.md
   git commit -m "first commit"
   ```

2. 添加远程仓库

   ```js
   git remote add origin url
   ```

3. 查看远程库

   ```js
    git remote -v
   ```

4. 推送数据到远程仓库

   ```js
   git push -u origin master
   ```

5. 删除远程仓库关联

   ```js
   git remote rm origin
   ```

*通过 clone 克隆的仓库，本地与远程已经自动关联*

### pull

拉取远程主机某个分支的更新，再与本地的指定分支合并。

1. 拉取 origin 主机的 ask 分支与本地的 master 分支合并 `git pull origin ask:ask`
2. 拉取 origin 主机的 ask 分支与当前分支合并 `git pull origin ask`
3. 如果远程分支与当前本地分支同名直接执行 `git pull`

### push

`git push`命令用于将本地分支的更新，推送到远程主机。它的格式与`git pull`命令相似

1. 将当前分支推送到`origin`主机的对应分支(如果当前分支只有一个追踪分支 ，可省略主机名)

   ```js
   git push origin
   ```

2. 使用`-u`选项指定一个默认主机 ,这样以后就可以不加任何参数使用`git push`

   ```js
   $ git push -u origin master
   ```

3. 删除远程`ask`分支 `git push origin --delete ask`

4. 本地 ask 分支关联远程分支并推送 `git push --set-upstream origin ask`

### 多库提交

```js
# 增加一个远程库
git remote add github 

# 提交到远程库
git push github
```

也可以在`~/.zshrc` 文件中定义别名，下面是定义的别名。这时使用 gp 将同时提供到 github 与 gitee

```js
alias gp="git push & git push github"
```

## 打包压缩

GIT 中可以使用 `git archive` 进行打包操作

将项目的 master 分支打包为 hdcms.zip

```js
git archive --format zip --output hdcms.zip master
```

