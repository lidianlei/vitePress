# mock.js

## 安装配置

[mock.js](http://mockjs.com/) 用于生成各种测试数据，同时支持中文数据，使用方式较为简单。mock.js 提供了丰富的[使用示例](http://mockjs.com/examples.html)。

安装软件

```bash
pnpm add mockjs
```

## json-server

json-server 与 mock.js 结合创建测试数据，可以节省我们录入的时间。 json-server 需要安装稳定版本

```bash
pnpm add -g json-server@0.17.4    
```

### 数据配置

首先创建 db.cjs 内容如下

```javascript
const Mock = require('mockjs')
//Mock.Random 是一个工具类，用于生成各种随机数据
const Random = Mock.Random
module.exports = () => {
    //定义json-server需要的数据结构
    let data = { news: [] }
    //添加20条包含中文的内容
    for (let i = 1; i <= 20; i++) {
        data.news.push({
            id: i,
            title: Random.cword(10, 20),
            content: Random.cparagraph(10),
        })
    }
    return data
}
```

### 启动服务

然后执行 json-server 命令，并指定数据源为`db.cjs` 文件

```bash
json-server --watch --port 3002 --host 127.0.0.1 db.cjs
```

> --port 和 --host 可以不写

服务启动后访问 `http://127.0.0.1:3002/news` 将可以查看到数据，内容如下

```json
[
  {
    "id": 1,
    "title": "多实集文新步众与就关较区才信术无",
    "content": "步究证断时参龙领属强林导太便拉。太问应做收织法利十到原走县设。那而复了西热会层成识院增代求。道活子政九象十维历与会较热革地。压将入酸水主花性难天相战可们青传。运电化世难以共即第音小是的说可身。存界专题先积劳级必列还究性。件想次规好江半度己为设称劳照划便。议白形从两这历重里程术术众风。数变重马米收出只受织型么压者安声作。"
  },
  {
    "id": 2,
    "title": "边例主较称问六上果维快商引比月么近",
    "content": "节八场或非力切一型京保农快十三等道。科太技取参近样已入成发写名。清制并验族无维属成党数其为劳流器与东。不制持至带务极商形一时参意族。物华少革始样路县其而各件还究由物运。代须线真能格部质新万世越连常。观声市维们量速活团学须并口示面布总。比空前带反只难指问属及共给号如。明直位天活理华价今及更加。导算别温整金复造起属感路商她层提般。"
  }
  ....
]
```

> 其他使用方式与 json-server 一至，请在后盾人文档库查看 json-server 文档