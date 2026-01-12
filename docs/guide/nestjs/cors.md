# cors

跨源资源共享（`CORS`）是一种允许从另一个域请求资源的机制，前后端分离时不处理Cors将无权访问后端api。

- 后台定义了cors后，前端vue/react等不需对cors处理
- NestJs 使用了Express的 [expressjs/cors](https://github.com/expressjs/cors) 包来处理，你可以查看[expressjs/cors](https://github.com/expressjs/cors#configuration-options) 了解更多细节

同样修改`main.ts` 添加以下代码

```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  ...
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
```
