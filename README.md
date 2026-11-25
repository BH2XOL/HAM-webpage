# BH2XOL 业余无线电个人主页

一个纯静态、零构建依赖的业余无线电（HAM）个人导航主页，采用 **Material Design 3 (MD3)** 色调层级与交互设计。

## 特性

- **Material Design 3 视觉**：浅色 / 深色双主题色调表面层级（Surface Container）、`28px` 大圆角主卡片、`primary-container` 图标容器与 MD3 状态层交互
- **平滑主题切换**：支持 `localStorage` 持久化、系统配色跟随以及 `View Transition` 圆形扩散动画
- **电台状态勋章**：集成 `status.bh2xol.com` 实时电台状态徽章
- **精致 SVG 图标**：全套统一线宽矢量图标，轻量清晰
- **一键复制邮箱**：内置剪贴板复制与状态反馈

## 目录结构

```text
.
├── index.html          # 页面主结构
├── css/
│   ├── tokens.css      # 浅/深色新拟物化设计令牌
│   ├── base.css        # 全局重置、布局与动画
│   └── components.css  # 卡片、按钮、头像、勋章与页脚样式
├── js/
│   ├── theme.js        # 主题切换逻辑
│   └── clipboard.js    # 邮箱复制交互
├── assets/
│   ├── Avatar.png      # 头像与站点图标
│   └── beian.png       # 公安备案图标
└── .well-known/
    └── assetlinks.json
```

## 本地预览

无需安装任何依赖，直接通过任意静态服务器启动即可：

```bash
python3 -m http.server 8080
```

随后在浏览器访问 `http://localhost:8080`。

## 协议

本项目基于 [MIT License](LICENSE) 开源。
