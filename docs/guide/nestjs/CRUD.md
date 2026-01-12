# CRUD

下面是文章模型的CRUD操作

- 使用prisma进行查询
- 关联获取栏目数据cate

## 控制器

```ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  findAll(@Query() { page = 1, row = 10 }) {
    return this.articleService.findAll(+page, +row)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
```

## 服务

```ts
import { Injectable } from '@nestjs/common'
import _ from 'lodash'
import { PrismaService } from './../../libs/prisma/src/prisma.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prismaService.article.create({
      data: {
        ..._.omit(createArticleDto, ['categoryId']),
        category: { connect: { id: +createArticleDto.categoryId } },
      },
    })

    return article
  }

  async findAll(page: number, row: number) {
    const data = await this.prismaService.article.findMany({
      skip: (page - 1) * row,
      take: row,
      include: { category: true },
    })

    const total = await this.prismaService.article.count()
    return {
      meta: {
        total,
        pageNum: Math.ceil(total / row),
        currentPage: page,
      },
      data,
    }
  }

  findOne(id: number) {
    return this.prismaService.article.findUnique({ where: { id }, include: { category: true } })
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prismaService.article.update({
      where: { id },
      data: {
        ..._.omit(updateArticleDto, ['categoryId']),
        category: { connect: { id: +updateArticleDto.categoryId } },
      },
    })
    return article
  }

  remove(id: number) {
    return this.prismaService.article.delete({
      where: { id },
    })
  }
}
```
