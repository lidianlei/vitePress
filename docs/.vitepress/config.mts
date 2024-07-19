import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Y.",
  base:"/vitePress/",
  description: "个人学习整理资料文档",
  head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  },
  themeConfig: {
    outline:{
      level:[2,3]
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {
            /* ... */
          },
          /**
           * @type {import('minisearch').SearchOptions}
           * @default
           * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
           */
          searchOptions: {
            /* ... */
          }
        }
      }
    },
    logo: '/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Web',
        items: [
          {text: 'HTML', link: '/guide/html/HTML'},
          {text: 'CSS', link: '/guide/css/select'},
          {text: 'js', link: '/guide/js/base'},
          {text: 'TypeScript', link: '/guide/ts/config'},
        ]
      },
      {
        text: '软件工具',
        items: [
          {
            text: 'yarn',
            link: '/guide/tool/yarn',
          },
          {
            text: 'npm',
            link: '/guide/tool/npm',
          },
          {
            text: 'nvm',
            link: '/guide/tool/nvm',
          },
          {
            text: 'pnpm',
            link: '/guide/tool/pnpm',
          }
        ],
      },
      { text: 'Git', link: '/guide/git/git' },
      { text: 'NodeJs', link: '/guide/node/config' },
      { text: 'MySql', link: '/guide/mysql/baseSql' },
      { text: 'Java', link: '/guide/java/java' },
    ],
    
    sidebar: {
      '/guide/html/': [
        {
          text: 'Web',
          items: [
            {text: 'HTML', link: '/guide/html/HTML'},
          ]
        }
      ],
      '/guide/css/': [
        {
          text: 'CSS',
          items: [
            {text: 'select', link: '/guide/css/select'},
            {text: '元素权重', link: '/guide/css/元素权重'},
            {text: '文本控制', link: '/guide/css/文本控制'},
            {text: '盒子模型', link: '/guide/css/盒子模型'},
            {text: '背景处理', link: '/guide/css/背景处理'},
            {text: '表格样式', link: '/guide/css/表格样式'},
            {text: 'float', link: '/guide/css/float'},
            {text: '定位布局', link: '/guide/css/定位布局'},
            {text: '弹性布局', link: '/guide/css/弹性布局'},
            {text: '栅格系统', link: '/guide/css/栅格系统'},
            {text: '变形动画', link: '/guide/css/变形动画'},
            {text: '过度延迟', link: '/guide/css/过度延迟'},
            {text: '帧动画', link: '/guide/css/帧动画'},
            {text: '媒体查询', link: '/guide/css/媒体查询'},
            {text: '响应尺寸', link: '/guide/css/响应尺寸'},
          ]
        }
      ],
      '/guide/js/': [
        {
          text: 'JS',
          items: [
            {text: 'base', link: '/guide/js/base'},
            {text: '运算符与控制流程', link: '/guide/js/运算符与控制流程'},
            {text: '基本类型', link: '/guide/js/基本类型'},
            {text: '数组类型', link: '/guide/js/数组类型'},
            {text: 'symbol', link: '/guide/js/Symbol'},
            {text: 'Set', link: '/guide/js/Set'},
            {text: 'Map', link: '/guide/js/Map'},
            {text: '函数进阶', link: '/guide/js/函数进阶'},
            {text: '作用域与闭包', link: '/guide/js/作用域与闭包'},
            {text: '对象', link: '/guide/js/对象'},
            {text: '原型与继承', link: '/guide/js/原型与继承'},
            {text: '类', link: '/guide/js/类'},
            {text: '模块设计', link: '/guide/js/模块设计'},
            {text: '正则表达式', link: '/guide/js/正则表达式'},
            {text: 'Promise', link: '/guide/js/Promise'},
            {text: '任务管理', link: '/guide/js/任务管理'},
            {text: 'Promise核心', link: '/guide/js/Promise核心'},
            {text: 'DOM', link: '/guide/js/DOM'},
            {text: '空间坐标', link: '/guide/js/空间坐标'},
            {text: '事件', link: '/guide/js/事件'},
            {text: 'Ajax', link: '/guide/js/Ajax'},
            {text: 'canvas', link: '/guide/js/canvas'},
          ]
        }
      ],
      '/guide/ts/': [
        {
          text: 'TypeScript',
          items: [
            {text: '环境配置', link: '/guide/ts/config'},
            {text: '基础类型', link: '/guide/ts/基础类型'},
            {text: '配置与调试', link: '/guide/ts/配置与调试'},
            {text: '断言', link: '/guide/ts/断言'},
            {text: '类与接口', link: '/guide/ts/类与接口'},
            {text: '泛型', link: '/guide/ts/泛型'},
            {text: '装饰器', link: '/guide/ts/装饰器'},
            {text: '模块管理', link: '/guide/ts/模块管理'},
            {text: 'webpack', link: '/guide/ts/webpack'},
            {text: '类型工具', link: '/guide/ts/类型工具'},
          ]
        }
      ],
      '/guide/tool/': [
        {
          text: '软件工具',
          items: [
            {text: 'yarn', link: '/guide/tool/yarn'},
            {text: 'npm', link: '/guide/tool/npm'},
            {text: 'nvm', link: '/guide/tool/nvm'},
            {text: 'pnpm', link: '/guide/tool/pnpm'},
          ]
        }
      ],
      '/guide/git/': [
        {
          items: [
            {text: 'Git', link: '/guide/git/git'},
          ]
        }
      ],
      '/guide/node/': [
        {
          items: [
            {text: '安装配置', link: '/guide/node/config'},
            {text: '模块管理', link: '/guide/node/模块管理'},
            {text: '事件循环', link: '/guide/node/事件循环'},
            {text: 'Path模块', link: '/guide/node/Path模块'},
            {text: 'Event模块', link: '/guide/node/Event模块'},
            {text: 'Buffer', link: '/guide/node/Buffer'},
            {text: 'Stream与Pipe', link: '/guide/node/Stream与Pipe'},
            {text: 'FS模块', link: '/guide/node/FS模块'},
            {text: 'HTTP', link: '/guide/node/HTTP'},
            {text: 'pm2', link: '/guide/node/pm2'},
            {text: '扩展包开发', link: '/guide/node/扩展包开发'},
            {text: '常用扩展包', link: '/guide/node/常用扩展包'},
          ]
        }
      ],
      '/guide/mysql/': [
        {
          items: [
            {text: '基本操作', link: '/guide/mysql/baseSql'},
            {text: '表维护', link: '/guide/mysql/表维护'},
            {text: '数据类型', link: '/guide/mysql/数据类型'},
          ]
        }
      ],
      '/guide/java/': [
        {
          items: [
            {text: 'Java介绍', link: '/guide/java/java'},
            {text: 'Java变量', link: '/guide/java/java变量'},
            {text: 'Java运算符', link: '/guide/java/java运算符'},
            {text: '程序控制结构', link: '/guide/java/程序控制结构'},
            {text: '数组', link: '/guide/java/数组'},
            {text: '面向对象（基）', link: '/guide/java/面向对象（基）'},
          ]
        }
      ],
      
    }
    
  }
})
