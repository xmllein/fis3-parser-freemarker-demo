### fis3-parser-freemarker-demo

### 环境搭建
- node环境 `8.14.0`
- 使用依赖包:
  - `npm i -g fis3` 全局安装最新版fis3
  - `npm i -g shx` shell执行包
  - `npm i -g fis3-parser-fis-freemarker` freemarker 解析器
  - `npm(cnpm) i -g fis3-server-browsersync` fis3 browsersync 服务器
  - `npm(cnpm) i -g fis3-optimizer-imagemin` 用于jpg,png,gif,webp,svg 压缩
  - `npm i -g fis-spriter-csssprites-group` 雪碧图插件
  - `npm i -g fis3-postprocessor-autoprefixer-latest`  css 预处理插件
  - `npm(cnpm) i -g fis3-parser-node-sass-latest`  sass 预处理
  - `npm i -g fis3-parser-less-latest`  less 预处理
  - `npm i -g fis3-optimizer-cleancss` 优化压缩css
  - `npm i -g fis3-optimizer-uglifyjs` js 压缩
  - `npm i -g fis3-postpackager-cloader` 把零散的文件（css,js）合并
  - `npm i -g fis3-deploy-skip-packed` 过滤掉已经被打包的资源

- npm 任务
  - `npm start` 删除已有`./dev`目录，生成新`./dev` 开发目录
  - `npm run server` 开启开发`browsersync`服务器
  - `npm run clear` 手动删除`./dev` 目录
  - `npm run dist` 手动删除`./dist` 目录
  - `npm run stop` 关闭开发`browsersync`服务器
  - `npm run build` 打包文件，生成`./dist` 目录
  - mac 遇到权限问题`sudo chmod -R 777 /Users/$(whoami)/.fis3-tmp`
  
- mock 支持 
 - 支持 `rewrite`，`redirect`，`proxy`
  
- run.py 执行发布脚本
  - 运行`python run.py www` 自动生成代码 提交至 发布代码仓库
  - 参考发布仓库[fis3-parser-freemarker-demo-release](https://github.com/xmllein/fis3-parser-freemarker-demo-release)

### changelog
#### 2018-02-22
- fis3-parser-freemarker-demo 第一版v1.0




  
  
  

  
