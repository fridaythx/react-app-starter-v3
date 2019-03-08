### 使用
运行 `npm install`  或 `yarn installs`（推荐安装yarn，比npm更快，缓存）

开发环境：

`npm run dev`

第一次运行如果报错，命令行输入 `rs` 然后回车，或运行`npm run dev` 之前执行下 `npm run compile:server:dev`

生产环境：

`npm run build && npm start`



### 开发工具及插件

vscode，建议安装eslint插件进行代码格式化



### 配置说明

服务器配置文件 /config/index.js

默认开发环境访问端口3000，生产环境访问端口8080



### 代码样例

新的代码样例会push到github的库中，此库作为模版库。
github地址：https://github.com/Alieas-PC/react-app-starter.git

### 目录
- build  构建所需要的配置文件
- client 客户端代码
    - component 公用组件
    - module 页面模块
    - routes client路由
    - util 工具类
- config 后台的配置文件
- html html模板
- server 服务端代码
    - middleware koa中间件
    - router server路由
    - util 工具类

### 如何开发一个新页面
#### 页面
1. 在 client/module 目录下创建一个子目录，目录名称为模块名称。
2. 在该模块目录下创建 Container.js 文件，这个 Container.js 就是我们的页面。具体参见 welcome 模块
3. 在 client/routes/index.js 中为新的 Container.js 增加路由，写法参见其他路由配置
4. 启动应用在 http://localhost:3000/你配置的路由地址 看效果

#### 异步请求
此框架中我们使用 [redux](https://redux.js.org) 管理 react 组件中的状态，使用 [redux-saga](https://redux-saga.js.org) 控制异步流程。
1. 在模块目录下创建 action.js，reducer.js，saga.js 文件
2. 将模块的 reducer.js 配置到 client 目录下的 reducer.js，saga.js 配置到 client 下的saga.js（使用fork函数）
3. 代码参考 welcome 模块下的请求代码

