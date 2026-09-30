# Zero-Code Testing for Go with Keploy 🚀

> **Keploy DevRel Candidate Technical Assignment**  
> A beginner-friendly documentation tutorial built with **Next.js 14**, **MDX**, and **Tailwind CSS**.

---

## 📖 Overview

This is a single-page static documentation website documenting the experience of testing a Go microservice (`gin-mongo`) with [Keploy](https://github.com/keploy/keploy).

The tutorial explains what Keploy does, walks through the `gin-mongo` quickstart setup with Docker, examines the generated test artifacts (real YAML files from the samples-go repository), and documents genuine debugging challenges encountered along the way — including Docker DNS case-sensitivity, dynamic timestamp handling, and the v3.x CLI authentication requirement.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Content:** MDX (`.mdx`) with embedded React components
- **Styling:** Tailwind CSS with dark/light mode
- **Syntax Highlighting:** Prism.js with copy-to-clipboard
- **Interactive Components:**
  - `<ArchitectureDiagram />` — Toggle between Record & Replay modes
  - `<TroubleshootingCard />` — Expandable cards for real issues encountered
  - `<TestReportTable />` — Summary of actual generated test artifacts
  - `<Callout />` — Tip, warning, danger, and info alerts
  - `<CodeBlock />` — Syntax-highlighted code with copy button
  - `<TableOfContents />` — Scroll-spy sidebar navigation
  - `<ThemeToggle />` — Persistent dark/light mode

---

## 🚀 Running Locally

```bash
# Clone this repository
git clone https://github.com/KrishBajaj-DS/keploy-go-tutorial.git
cd keploy-go-tutorial

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm run start
```

---

## 📄 Deliverables

- **GitHub Repository:** [https://github.com/KrishBajaj-DS/keploy-go-tutorial](https://github.com/KrishBajaj-DS/keploy-go-tutorial)
- **Live Documentation:** [https://keploy-go-tutorial-psi.vercel.app](https://keploy-go-tutorial-psi.vercel.app)
