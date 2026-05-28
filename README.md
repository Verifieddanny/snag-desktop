<div align="center">

# 🎬 Snag Desktop

**Grab media from anywhere. Paste a link. Get your video.**

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org)
[![Wails](https://img.shields.io/badge/Wails-v2-red?style=for-the-badge)](https://wails.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-macOS-blue?style=for-the-badge)]()

A native desktop app to download videos and audio from **any platform** — without watermarks, at the highest quality.

Looking for the CLI version? → [snag-cli](https://github.com/Verifieddanny/snag)

</div>

---

## ✨ Features

- 🖥️ **Native desktop app** — built with Wails (Go + React), runs natively on macOS
- 🌍 **Works everywhere** — YouTube, TikTok, Instagram, X (Twitter), Facebook, Reddit, and [1000+ more sites](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)
- 🚫 **No watermarks** — downloads clean TikTok videos without the watermark
- 🎥 **Best quality** — grabs the highest resolution video + audio and merges them
- 🎵 **Audio extraction** — download just the audio as MP3
- 📺 **Quality selection** — choose between Best, 1080p, 720p, 480p, or 360p
- 🔍 **Auto platform detection** — detects the platform from the URL automatically
- ⚡ **Fast** — streams directly from source, no middleman servers

---

## 📸 Preview

<div align="center">
<img src="https://github.com/Verifieddanny/snag-desktop/assets/preview.png" alt="Snag Desktop Preview" width="600"/>
</div>

---

## 🚀 Installation

### Download (macOS Apple Silicon)

1. Go to [Releases](https://github.com/Verifieddanny/snag-desktop/releases/latest)
2. Download `snag-desktop-macos-arm64.zip`
3. Unzip and drag `snag-desktop.app` to your Applications folder
4. Right-click → Open (first time only, to bypass Gatekeeper)

### Prerequisites

You need `yt-dlp` and `ffmpeg` installed:

```bash
brew install yt-dlp ffmpeg
```

### Build from source

```bash
git clone https://github.com/Verifieddanny/snag-desktop.git
cd snag-desktop
wails build
```

The built app will be in `build/bin/snag-desktop.app`.

---

## 📖 Usage

1. **Open Snag** from your Applications folder
2. **Paste any URL** — platform is detected automatically
3. **Choose type** — Video or Audio Only
4. **Select quality** — Best, 1080p, 720p, 480p, or 360p
5. **Click Download** — file saves to `~/Downloads/Snag/`

---

## 🌍 Supported Platforms

| Platform | Video | Audio | No Watermark |
|----------|-------|-------|--------------|
| YouTube | ✅ | ✅ | ✅ |
| TikTok | ✅ | ✅ | ✅ |
| Instagram | ✅ | ✅ | ✅ |
| X (Twitter) | ✅ | ✅ | ✅ |
| Facebook | ✅ | ✅ | ✅ |
| Reddit | ✅ | ✅ | ✅ |
| [1000+ more](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md) | ✅ | ✅ | varies |

---

## 🏗️ Tech Stack

- **Backend** — Go
- **Frontend** — React + TypeScript
- **Framework** — [Wails v2](https://wails.io)
- **Engine** — yt-dlp + ffmpeg
- **Styling** — Custom CSS

---

## 🗺️ Roadmap

- [x] macOS Apple Silicon build
- [x] Auto platform detection
- [x] Quality selection (Best/1080p/720p/480p/360p)
- [x] Audio extraction
- [x] No-watermark TikTok downloads
- [x] Dependency check on startup
- [x] Friendly error messages
- [ ] macOS Intel build
- [ ] Windows build
- [ ] Linux build
- [ ] Playlist support
- [ ] Download history
- [ ] Drag and drop URL

---

## 🤝 Contributing

```bash
git clone https://github.com/Verifieddanny/snag-desktop.git
cd snag-desktop
wails dev
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by [Danny](https://github.com/Verifieddanny)** 🚀

⭐ Star this repo if Snag saves you time

**[CLI Version](https://github.com/Verifieddanny/snag)** · **[Desktop Version](https://github.com/Verifieddanny/snag-desktop)**

</div>