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

### 登录npm 
```js
npm config set registry https://registry.npmjs.org/
npm whoami // 是否登录
npm login // 输入用户名密码邮箱，还有邮箱验证码
```

### git tag
```js
git tag --list 列出所有的标签
git ls-remote --tags origin 查看所有的远程标签及commit ID

git tag -d <your_tag_name> 删除一个标签
git push --delete origin <your_tag_name> 删除远程仓库的标签
```
### lerna publish
发布前先提交git, 包为private不会发布，如果发布未成功但是tag又打上了，可以先删除git tag
```js
lerna publish --access public // npm 包发布默认是私有发布，改成public
```
