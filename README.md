# 贷款服务网站

这是一个基于Next.js构建的贷款服务静态网站，带有内容管理功能。

## 特点

- 响应式设计，适配各种设备屏幕
- 简洁现代的UI设计
- 包含主页和管理页面
- 内容可通过管理面板动态编辑

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

然后在浏览器中访问: http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 运行生产版本

```bash
npm start
```

## 管理面板

管理面板用于编辑网站内容，访问地址：http://localhost:3000/admin/login

默认登录凭证:
- 用户名: admin
- 密码: admin123

**注意:** 在实际部署时，请修改`pages/admin/login.js`文件中的默认凭证。

## 目录结构

- `/components` - React组件
- `/pages` - 页面文件
- `/public` - 静态资源文件
- `/styles` - CSS样式文件

## 自定义内容

所有网站内容可以通过管理面板进行编辑，包括:

1. 主页横幅信息
2. 服务特点
3. 客户评价
4. 联系信息

## 技术栈

- Next.js
- React
- Bootstrap
- React Bootstrap "# websitedemo2" 
