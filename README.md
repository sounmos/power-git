# team-auto-rebase-code
正在开发的你是不是被很多个项目、很多个分支困扰，每次都需要切换到每个分支上，开始 `rebase、push`等一系列操作 ，然后在这痛并快乐的过程中持续同步 `master` 的最新代码。

现在好了。`auto-rebase`可以一站式帮你解决这些问题。

#### 1. 如何开始？

首先我们需要全局安装我们的命令

```javascript
npm install team-auto-rebase-code -g
```

这样，在我们的电脑上会有这样两个命令

- `merge`
- `auto-merge`

两个命令功能相同，可以选择性的使用。

安装结束了，我们来看如何使用这个小工具。

#### 2. 如何使用

##### 2.1 使用之前，我们需要做这么几项配置

###### 1. 项目根目录设置（也就是我们的项目所在文件夹）

注意：是项目所在文件夹，不是项目文件夹

如：

```javascript
项目为 projct 
放置在 /Users/username/Desktop 下。那么 /Users/username/Desktop 就是我们的根目录
```

接下来我们通过下方命令来设置

```javascript
merge -setroot /Users/username/Desktop
```

`setroot`后面跟的是一个绝对路径。不要设置相对路径，这样会导致项目找不到，从而不能正确使用本工具。

建议：

建议大家将多个项目放置在同一目录下。否则会出现配置比较繁琐的情况。

###### 2. 接下来我们需要设置rebase代码的配置文件。

首先创建一个 `pull-config.json` 文件

接下来我们根据下面的格式来书写我们的配置

```json
[
  {
    "project": "test", 
    "branch": [
      "branch1",
      "branch2",
      "branch3",
      "branch4",
    ]
  }
]
```

说明：

- 整个配置文件是由一个数组包裹。

- `project` 和 `branch` 为固定命名。

- `project` 代表项目名称。可以根据根目录写相对位置。

  - 如：

    > test 项目 位于 /Users/username/Desktop/one/two/three 项目下
    >
    > 那么这里的 project就可以配置为 “/one/two/three/test”

好。相信到这里，大家已经将配置文件创建成功了。接下来我们使用下面的命令关联配置文件

```javascript
merge -config  /Users/username/Desktop/pull-config.json
```

注意：

`-config` 后跟的也是一个绝对路径。同 `-setroot`



#### 3. 开始同步

上面的两个配置完成后，我们就可以通过本工具进行代码同步。同步代码的命令就是 

```javascript
merge 
```

注意：

如果同步有错误或有冲突的话，会将日志文件提示在桌面上。日志文件会精准的记录同步时间、项目名称、分支名称、错误信息等内容。



#### 4. 其他命令

`-v -V -version`：用来获取版本信息

`-h -help`: 用来获取帮助信息  

`-self`: 功能和 `merge` 相同。也是一个别名形式  