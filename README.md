# Zero-Code Testing for Go with Keploy 🚀

> **Keploy DevRel Candidate Technical Assignment**  
> A beginner-friendly, deeply technical documentation tutorial built with **Next.js 14**, **MDX**, and **Tailwind CSS**.

---

## 📖 Overview

This repository contains a full static documentation website and hands-on guide documenting the experience of testing a Go microservice (`gin-mongo`) with [Keploy](https://github.com/keploy/keploy).

Rather than standard unit tests with heavy interface mocking (`gomock`), this guide demonstrates how Keploy operates at the Linux/Docker network wire layer using eBPF and socket proxying to record live API traffic and MongoDB `OpMsg` calls, replaying them with zero database dependencies in CI/CD.

---

## 🛠️ Tech Stack & Features

- **Framework:** Next.js 14 (App Router)
- **Content:** MDX (`.mdx`) with React component integration
- **Styling:** Tailwind CSS with custom glassmorphism & typography
- **Theme:** Smooth Dark / Light Mode with persistence
- **Syntax Highlighting:** Prism.js with one-click copy buttons
- **Interactive Components:**
  - `<ArchitectureDiagram />`: Interactive toggle between Record & Replay wire flow
  - `<TroubleshootingCard />`: Deep dive into real-world bugs (Docker DNS case-sensitivity, dynamic timestamp noise, CLI OAuth)
  - `<TestReportTable />`: Execution evidence & verification metrics
  - `<Callout />`: Custom alerts for tips, warnings, and gotchas
  - `<TableOfContents />`: Active scroll spy sidebar

---

## 🚀 Running the Documentation Website Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/keploy-go-docs.git
cd keploy-go-docs

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify the production build:
```bash
npm run build
npm run start
```

---

## 🧪 Reproducing the Keploy Quickstart Locally

### 1. Set Up Docker Network & MongoDB
```bash
docker network create keploy-network

# Note: Provide both casing aliases to prevent Go MongoDB driver DNS resolution failure
docker run -d --name mongodb \
  --network keploy-network \
  --network-alias mongodb \
  --network-alias mongoDb \
  -p 27017:27017 \
  mongo:6.0
```

### 2. Build the Application Image
```bash
git clone https://github.com/keploy/samples-go.git
cd samples-go/gin-mongo
docker build -t gin-app:1.0 .
```

### 3. Record Real Network Interactions
```bash
keploy record -c "docker run -p 8080:8080 --name MongoApp --rm --network keploy-network gin-app:1.0" \
  --container-name MongoApp --build-delay 15
```

Send requests:
```bash
curl -X POST http://localhost:8080/url -H "Content-Type: application/json" -d '{"url":"https://keploy.io/devrel"}'
curl -i http://localhost:8080/<generated-short-code>
curl -i "http://localhost:8080/verify-email?email=devrel@keploy.io"
```

### 4. Replay Tests (Without MongoDB Running)
```bash
# Stop the database to prove mock isolation
docker stop mongodb

keploy test -c "docker run -p 8080:8080 --name MongoApp --rm --network keploy-network gin-app:1.0" \
  --container-name MongoApp --delay 10
```

---

## 🔍 Key Engineering Gotchas Solved

1. **Docker DNS vs MongoDB Go Driver Hostname Case Normalization:**
   The Go driver RFC-normalizes `mongoDb:27017` to `mongodb`, causing Docker's internal DNS resolver to fail unless both network aliases are attached.
2. **Dynamic Response Non-Determinism (`body.ts`):**
   Timestamp noise filters configured via `assertions.noise` in `test-1.yaml` prevent test flakiness from nanosecond clock drift.
3. **Headless / CI Execution:**
   Automating Keploy in CI without browser OAuth prompts by running containerized flows and offline mock catalogs.

---

## 📄 Deliverables
- **GitHub Repository:** Public source code
- **Vercel Deployment:** Live static documentation site
