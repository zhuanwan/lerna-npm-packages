# npm 包

## 项目配置

### 创建项目
```js
git clone git@github.com:zhuanwan/lerna-npm-packages.git
cd lerna-npm-packages

npm install lerna -g
lerna init
```

### 使用yarn
```js
yarn config set workspaces-experimental true
yarn
```
修改 lerna.json
```js
npmClient: "yarn"
```

* 查看项目中的workspace依赖树 yarn workspaces info
* 添加开发环境依赖到某个子项目  yarn workspace [workspace name] add [pkg] --dev
* 添加生产环境依赖到某个子项目  yarn workspace [workspace name] add [pkg]


### 工作模式
修改 lerna.json
```js
version: "independent"
```

### 创建package
```js 
cd .\packages\
yarn create vite calender-react --template react-ts
```

### 安装packages里面的包
``` js
cd ..
lerna bootstrap
```

### 测试运行打包
根据vite文档写好插件
```
cd .\packages\calender-react
yarn dev
yarn build
```
### package 加入lerna
```js
lerna create calender-react
```
calender-react package.json去掉   "private": true,

```js
lerna list
```

### 发布npm 