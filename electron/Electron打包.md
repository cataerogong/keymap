## 打包为Electron项目

#### 1.安装环境

##### windows：

1.1、node：[官网下载](https://nodejs.org/en/)

默认安装。

1.2、确认node和npm成功安装

在控制台输入`node -v`和`npm -v`，返回版本号。

1.3、修改PowerShell管理执行策略

Windows默认设置下禁止脚本执行，所以需要修改令其放行。

在任务栏的搜索栏内搜索“powershell”，以管理员身份运行它。

查看当前执行策略，输入`Get-ExecutionPolicy`。默认返回值为“Restricted”。

修改执行策略：

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

1.4、安装依赖

```shell
npm install
```



#### 2.打包项目

双击`build.bat`

注：如果首次构建失败，可以尝试用管理员权限运行。



#### 3.其他命令

```shell
# 以发布状态运行
npm start

# 以开发状态运行
npm run dev

# 以当前状态打包
npm run build
```

