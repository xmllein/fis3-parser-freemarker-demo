// 常规配置  参考 http://fis.baidu.com/fis3/docs/api/config-props.html
const PROJECT_NAME = '/freemarker-pc';
const DOMAIN_CDN = '//s1.xmllein.cn';
fis.set('namespace', 'fis3-parser-freemarker');
fis.set('project.files', ['src/**']); // 源码path
fis.set('project.ignore', ['node_modules/**', 'dist/**', 'README.md', 'test/**', '.git/**', 'fis-conf.js']);
fis.set('charset', 'utf-8');
fis.set('project.charset', 'utf-8');

//======== 测试配置 ============//
// 测试包路径 （仅执行编译，不压缩）
const TEST_OUTPUT_PATH = './test';

//======== 测试配置 ============//
// 开发包路径 （仅执行编译，不压缩）
const DEV_OUTPUT_PATH = './dev';

//======== 线上包配置 ============//
// 正式打包路径（包含编译、压缩代码 、图片压缩、csssprite）
const FORMAL_OUTPUT_PATH = './dist';

function add0(m) {
  return m < 10 ? '0' + m : m
}

//时间戳转化成时间格式
function timeFormat(timestamp) {
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  let time = new Date(timestamp);
  let year = time.getFullYear(), month = time.getMonth() + 1, date = time.getDate(),
    hours = time.getHours(), minutes = time.getMinutes(), seconds = time.getSeconds();
  return year + add0(month) + add0(date) + add0(hours) + add0(minutes) + add0(seconds);
}

// fis-spriter-csssprites-group
fis.match('::packager', {
  spriter: fis.plugin('csssprites-group')
});
//spriter-csssprites-group 配置
fis.config.set('settings.spriter.csssprites-group', {
  scale: 1, //图片缩放比例
  rem: 50,  //1rem像素值
  unit: 'px',  // 默认单位
  margin: 11,//图之间的边距
  layout: 'matrix', //使用矩阵排列方式，默认为线性`linear`
  to: PROJECT_NAME + '/static/images/sprite' //合并图片存到/img/
});

//fis3-parser-node-sass-latest
fis.match('*.{sass,scss}', {
  parser: fis.plugin('node-sass-latest', {}),
  postprocessor: fis.plugin('autoprefixer-latest', {
    browsers: ['last 2 versions'],
    "flexboxfixer": true,
    "gradientfixer": true
  }),
  rExt: '.css'
});

//fis3-parser-less-latest
fis.match('*.less', {
  parser: fis.plugin('less-latest', {}),
  postprocessor: fis.plugin('autoprefixer-latest', {
    browsers: ['last 2 versions'],
    "flexboxfixer": true,
    "gradientfixer": true
  }),
  rExt: '.css'
});

// 设置占位符,监听编译时需要设置固定的query才能捕获到进行替换
let query = '?v=' + timeFormat(Date.now());

// 应用占位符 可以参考使用 fis3-postpackager-query
fis.match('*', {
  query: query
});

//使用 css next   可以配置 fis3-parser-css-next


//=============开发模式=============//
fis.media('dev').match(/^\/src\/(.*)$/i, {
  useHash: false,
  useSprite: true, //true 开启图片 Sprite， 如果不想预览设置false
  optimizer: false,
  release: "$1",
  useCache: false
}).match('**.{ftl,html}', {
  useCache: false,
  // fis3-parser-fis-freemarker
  parser: fis.plugin('fis-freemarker', {
    source: '/src',
    includeFolder: 'common'
  }),
  rExt: '.html'
}).match('{src/mock/src/**.json, COMMON.json}', {

  release: false

}).match('**', {
  deploy: fis.plugin('local-deliver', {
    to: DEV_OUTPUT_PATH
  })
});


//=============打包模式=============//
fis.media('build').match('::packager', { // fis3-postpackager-cloader
  postpackager: fis.plugin('loader', {
    allInOne: {
      js: function (file) {
        return PROJECT_NAME + "/static/js/" + file.filename + "_aio.js";
      },
      css: function (file) {
        return PROJECT_NAME + "/static/css/" + file.filename + "_aio.css";
      }
    }
  })
}).match(/^\/src\/(.*)$/i, {
  cache: false,
  useHash: true,
  useSprite: true,
  optimizer: true,
  domain: DOMAIN_CDN,
  release: PROJECT_NAME + '/$1'

}).match(/^\/src\/templates\/(.*)$/i, {
  useHash: false,
  release: 'templates/$1'

}).match('lib/**.js', {
  // 库文件不加hash
  useHash: true

}).match('::image', {
  // fis3-optimizer-imagemin
  optimizer: fis.plugin('imagemin', {}),

}).match('*.{css,scss,sass,less}', {
  //fis3-optimizer-cleancss
  optimizer: fis.plugin('cleancss', {}),
  domain: DOMAIN_CDN,

}).match('*.js', {
  // fis3-optimizer-uglifyjs
  optimizer: fis.plugin('uglifyjs', {}),
  domain: DOMAIN_CDN,
}).match('{bs-config.js, package.json, fis-conf.js, server.log, run.py, readme.md,commonHtml/**,src/mock/**}', { // 打包不发布文件
  release: false

}).match('**', {
  deploy: [
    fis.plugin('skip-packed', {
      // 配置项 过滤掉已被打包的文件
    }), fis.plugin('local-deliver', {
      to: FORMAL_OUTPUT_PATH
    })
  ]
});
