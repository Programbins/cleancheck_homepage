````markdown
# CleanCheck Homepage 🌐

> **Repository:** [`Programbins/cleancheck_homepage`](https://github.com/Programbins/cleancheck_homepage)  
> **Purpose:** Showcase and promote the **CleanCheck** AI-based hand-washing assessment tool  
> **Live demo:** <!-- Add link once deployed -->  

CleanCheck helps users confirm that every part of their hands is thoroughly cleaned.  
The homepage you’re looking at is a lightweight **Vue 3 + Vite** single-page site built on Creative-Tim’s Vue Material Kit. It bundles:

| Section | What you’ll find |
|---------|------------------|
| **Real-Time Demo** | Two side-by-side GIFs (YOLO v8 surface coverage / MediaPipe movement tracking) |
| **UV Lab Results** | Step-by-step experimental photos + data table |
| **Poster & Talk** | Conference-style poster PDF and short presentation video |
| **Source Links** | One-click jump to the core AI repo [`chanwoopark11/CleanCheck`](https://github.com/chanwoopark11/CleanCheck) |

---

## ✨ Key Features
- **Fully responsive** – mobile-first layout, dark-mode aware color palette.  
- **Plug-and-play** – pure front-end; no server needed beyond static file hosting.  
- **Easy theming** – Vue Material Kit components + SCSS variables.  
- **Ready for CI/CD** – builds to plain HTML/CSS/JS for Netlify, Cloudflare Pages, Docker-Nginx, or Unraid.

---

## 🛠 Tech Stack

| Layer           | Choice                                 |
|-----------------|----------------------------------------|
| Front-end       | Vue 3 + Vite                           |
| UI Kit          | Creative-Tim Material Kit (v1.0.2)     |
| Animation       | Animate.css + simple CSS keyframes     |
| Dev Tooling     | ESLint + Prettier, Vitest (unit tests) |
| Deployment      | Static (Nginx, Caddy, or Cloudflare)   |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/Programbins/cleancheck_homepage.git
cd cleancheck_homepage

# 2. Install
# Works with npm, yarn, or pnpm; Node 18+ recommended
npm install

# 3. Develop
npm run dev
# → http://localhost:5173

# 4. Production build
npm run build       # outputs to /dist
npm run preview     # optional local preview
````

### Docker / Unraid (example)

```bash
docker build -t cleancheck_homepage .
docker run -d --name cleancheck_site -p 80:80 cleancheck_homepage
```

The provided `Dockerfile` uses an **alpine-nginx** base, so the image is < 50 MB.
For Unraid, create a new Docker container and point it at the same image; map port 80 (and 443 if you terminate TLS inside the container).

---

## 📂 Project Structure

```
├─ public/               # Static assets (favicon, robots.txt, poster.pdf, video.mp4)
├─ src/
│  ├─ assets/img/        # demo GIFs, UV photos
│  ├─ components/        # Vue Material Kit custom wrappers
│  ├─ layouts/           # Navbar + footer
│  └─ views/             # Home, Demo, Results, About
├─ vite.config.js
└─ Dockerfile
```

---

## 🤝 Contributing

1. Fork this repo and create a feature branch.
2. Follow the ESLint/Prettier rules (`npm run lint`).
3. Submit a pull request with a clear description/screenshots.

Bug reports and feature requests are welcome in the **Issues** tab.
Feel free to open a discussion if you’re integrating CleanCheck with your own project!

---

## 📜 License

The homepage code is distributed under the **MIT License** (see [`LICENSE`](LICENSE)).
CleanCheck’s core AI models follow the license terms in [`chanwoopark11/CleanCheck`](https://github.com/chanwoopark11/CleanCheck).

---

## 🙏 Acknowledgements

* **Creative-Tim** – Vue Material Kit template
* **Ultralytics YOLOv8** & **Google MediaPipe** – core vision models
* All contributors and testers who helped polish the CleanCheck experience.

---

> *Have ideas or spotted an issue?*
> Open an Issue, start a Discussion, or ping us on the CleanCheck Discord!

```

Feel free to tweak section titles, add deployment URLs, or drop in extra screenshots as the project evolves.
```
