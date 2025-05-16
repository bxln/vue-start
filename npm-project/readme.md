# npm

npm是nodejs中进行包管理的工具；
官网：https://nodejs.org/en

## 1.设置国内阿里云镜像源
```
npm config set registry https://registry.npmmirror.com  #设置国内阿里云镜像源
npm config get registry  #查看镜像源
```

## 2.npm命令
* npm init： 项目初始化；
  * npm init -y：默认一路yes，不用挨个输入信息
* npm install 包名：安装js包到项目中（仅当前项目有效）。指定 包名，或者 包名@版本号
  * npm install -g： 全局安装，所有都能用
  * 可以去 npm仓库 搜索第三方库
* npm update 包名：升级包到最新版本
* npm uninstall 包名：卸载包
* npm run：项目运行

## 3.node可直接运行js，例如
```
PS D:\ide\codeing\js\vue-start\demo-npm> node main
项目启动~~~
PS D:\ide\codeing\js\vue-start\demo-npm> node main.js
项目启动~~~
```

# 4.npm运行
```
{
  "name": "demo-npm",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node main.js",
    "build": "echo 正在打包~~~"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

则可执行 npm run test 、npm run dev 、npm run build





```
版权所有（C） Microsoft Corporation。保留所有权利。

安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows

PS D:\ide\codeing\js\vue-start> cd .\npm-project\
PS D:\ide\codeing\js\vue-start\npm-project> npm init -y
Wrote to D:\ide\codeing\js\vue-start\npm-project\package.json:

{
  "name": "npm-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}


PS D:\ide\codeing\js\vue-start\npm-project> 

```

