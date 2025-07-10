# 舔狗日记

舔狗日记是一个记录、展示和点赞“舔狗语录”的在线应用。用户可以随机获取语录、为喜欢的语录点赞，并查看语录排行榜。适合娱乐、分享和自我调侃。

## 在线演示

https://dog.jonssonyan.com

![preview](docs/images/preview.png)

## 技术栈

- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL
- Docker
- Axios, Zod, Winston 等

## 项目结构

```
├── src
│   ├── app                # Next.js 应用目录，包含页面和API
│   │   ├── api            # 后端API接口
│   │   ├── ranking        # 排行榜页面
│   │   ├── layout.tsx     # 全局布局
│   │   └── page.tsx       # 首页
│   ├── components         # 前端组件
│   ├── configs            # 配置项（如心情、天气等）
│   ├── lib                # 工具库（如prisma实例、日志）
│   ├── services           # 业务服务层
│   ├── types              # 类型定义
│   └── utils              # 工具函数
├── prisma                 # Prisma schema
├── sql                    # 数据库初始化脚本
├── docs/images            # 项目图片
└── ...
```

## 主要功能

- 随机获取舔狗语录
- 语录点赞与排行榜
- 响应式界面，移动端友好

## 快速开始

1. 克隆项目

    ```bash
    git clone https://github.com/jonssonyan/dog-diary.git
    cd dog-diary
    ```

2. 安装依赖

    ```bash
    pnpm install
    ```

3. 初始化数据库

   从 [sql/init_mysql.sql](sql/init_mysql.sql) 创建表

4. 配置环境变量

   在根目录下创建 `.env` 文件，参考如下：

   ```env
   DATABASE_URL=mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE
   ```

5. 本地开发

   ```bash
   pnpm dev
   ```

## 联系方式

- X: https://x.com/jonssonyan
- YouTube: https://www.youtube.com/@jonssonyan

## 赞助

如果这个项目对你有帮助，可以请我喝杯咖啡

微信赞赏码:

<img src="https://github.com/jonssonyan/install-script/assets/46235235/cce90c48-27d3-492c-af3e-468b656bdd06" width="150" alt="微信赞赏码" title="微信赞赏码"/>

## 开源协议

[Apache-2.0](LICENSE)