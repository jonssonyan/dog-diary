# 舔狗日记

## 在线演示

https://dog.jonssonyan.com

![preview](docs/images/preview.png)

## 快速开始

1. 克隆项目

    ```bash
    git clone https://github.com/jonssonyan/dog-diary.git
    ```

2. 安装依赖

    ```bash
    cd dog-diary
    pnpm install
    ```

3. 初始化数据库

   从 [sql/init_mysql.sql](sql/init_mysql.sql) 中创建表

4. 配置环境变量

   你需要在根目录下创建 `.env` 文件，参考下方变量：

   ```env
   DATABASE_URL=mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE
   ```

5. 本地开发

   ```bash
   pnpm dev
   ```

## 其他

Telegram Channel: https://t.me/jonssonyan_channel

你可以在 YouTube 上订阅我的频道: https://www.youtube.com/@jonssonyan

如果这个项目对你有帮助，你可以请我喝杯咖啡:

<img src="https://github.com/jonssonyan/install-script/assets/46235235/cce90c48-27d3-492c-af3e-468b656bdd06" width="150" alt="微信赞赏码" title="微信赞赏码"/>

## 开源协议

[Apache-2.0](LICENSE)