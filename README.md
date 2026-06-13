# c176 · Mixing Portfolio

> 录音艺术科班混音师个人作品集 / Personal Mixing Portfolio
> 流行 · 摇滚 · 爵士 · 古典 / Pop · Rock · Jazz · Classical

---

## 🚀 部署到 GitHub Pages(3 步搞定)

### 步骤 1:在 GitHub 创建仓库

打开 https://github.com/new ,填写:

| 字段 | 值 |
|---|---|
| **Repository name** | `c176.github.io` *(把 c176 换成你的 GitHub 用户名)* |
| **Description** | Mixing Engineer Portfolio |
| **Public / Private** | **Public** |
| **Add README** | 不勾选(我们自己有) |

点击 **Create repository**。

### 步骤 2:把代码推送上去

在项目根目录打开终端(Git Bash / PowerShell 都行),执行:

```bash
# 初始化并提交
cd mixing-portfolio
git init
git add .
git commit -m "feat: c176 mixing portfolio v1"

# 关联到你的 GitHub 仓库
git remote add origin https://github.com/c176/c176.github.io.git
git branch -M main
git push -u origin main
```

> 第一次 push 会弹窗要求登录 GitHub,按提示用浏览器授权即可。

### 步骤 3:启用 GitHub Pages

1. 进入仓库页面 → **Settings** → 左侧 **Pages**
2. **Source** 选 `Deploy from a branch`
3. **Branch** 选 `main` / `(root)`
4. 点击 **Save**

等待 1–2 分钟,你的网站就上线了 🎉

> 访问地址:`https://c176.github.io`

---

## 📁 目录结构

```
mixing-portfolio/
├── index.html          # 主页(5 大板块)
├── styles.css          # 暗黑霓虹主题
├── script.js           # 交互(频谱动画、Before/After、表单)
├── README.md           # 本文件
└── assets/             # 把你的素材放这里
    ├── pop-01.mp3
    ├── pop-01-before.mp3
    ├── rock-01.mp3
    ├── rock-01-before.mp3
    ├── jazz-01.mp3
    ├── jazz-01-before.mp3
    ├── classic-01.mp3
    ├── classic-01-before.mp3
    └── wechat-qr.png   # 你的微信二维码
```

---

## ✏️ 上传你的作品(替换占位内容)

### 1. 替换音频文件
把你的作品文件改名为对应格式,放进 `assets/` 目录:
- `pop-01.mp3` / `pop-01-before.mp3` — 流行作品(混音后 / 混音前)
- `rock-01.mp3` / `rock-01-before.mp3` — 摇滚作品
- `jazz-01.mp3` / `jazz-01-before.mp3` — 爵士作品
- `classic-01.mp3` / `classic-01-before.mp3` — 古典作品

> 📌 想加更多作品?复制 `index.html` 里 `<article class="track">…</article>` 整段即可。

### 2. 替换微信二维码
把微信二维码图片保存为 `assets/wechat-qr.png` 即可自动显示。

### 3. 改个人信息
打开 `index.html`,搜这些占位文本并替换:
- `hi@c176.studio` — 你的邮箱
- `深海蓝 (Demo)` / `Run the Night` 等 — 改成你的作品名
- `c176` 出现在多处 — 改成你的艺名(注意同步改 `index.html` 顶部 `<title>`)

### 4. 改报价
`index.html` 里的 `<article class="srv">` 卡片,数字部分直接改即可。

---

## 🎨 设计说明

- **配色**:`#06070a` 暗底 + 青(`#28e0c4`)/ 粉(`#ff2d8a`)/ 橙霓虹点缀
- **字体**:Inter(英文)+ Noto Sans SC(中文)+ JetBrains Mono(代码/数字)
- **动效**:
  - Hero 顶部 Canvas 实时频谱动画
  - 作品卡悬停发光
  - 数字递增统计
  - Before/After 一键对比播放
- **响应式**:已适配桌面 / 平板 / 手机

---

## 🛠 技术栈

- 纯 HTML + CSS + 原生 JS,**零依赖**
- 不需要 Node / npm / 任何构建工具
- 首次加载后字体走 Google Fonts CDN(国内访问可能稍慢,可后续替换为本地字体)

---

## 📋 后续可扩展(选做)

- [ ] 接入 [Formspree](https://formspree.io) 让询价表单真的能发邮件
- [ ] 接入 [Wavesurfer.js](https://wavesurfer.xyz) 给作品加可视化波形
- [ ] 接入 [Google Analytics](https://analytics.google.com) 看访问数据
- [ ] 加 i18n 中英切换
- [ ] 加 PWA 离线访问

需要我做哪一项,直接说就行 ✌️

---

*Created by c176 · 2026*
