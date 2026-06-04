# FraudGuard — Digital Fraud Awareness Platform

An interactive eLearning platform that educates users about digital fraud prevention and cybersecurity. Built specifically for Indian users to recognize and defend against common fraud schemes through realistic simulations.

**Live app:** [https://pravoobi.github.io/fraud-guard/](https://pravoobi.github.io/fraud-guard/)

---

## What It Does

FraudGuard walks users through realistic fraud scenarios — phone calls, SMS phishing, UPI scams — and teaches them how to respond correctly. Users earn a Fraud Awareness Score, track streaks, collect badges, and can generate a completion certificate once they finish all modules.

### Learning Modules

| Module | Topic |
|--------|-------|
| 1 | UPI Fraud Protection |
| 2 | Bank Impersonation Detection |
| 3 | KYC Scam Prevention |
| 4 | Aadhaar / PAN Fraud Alerts |
| 5 | Loan & Credit Card Scam Detection |
| 6 | Digital Arrest Scam Protection |

### Key Features

- **Interactive scenarios** — phone call simulations with spoofed caller ID, SMS phishing demos, UPI app interactions
- **Progress tracking** — Fraud Awareness Score (0–100), learning streaks, module completion, badges
- **Emergency resources** — immediate action steps for fraud victims, emergency contacts (Cyber Crime Helpline 1930, Police 100), bank helpline directory for 10+ Indian banks
- **Completion certificate** — downloadable certificate with user name and score after finishing all 6 modules
- **4 language support** — English, Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు)
- **Fully offline** — no backend, no accounts; progress is saved in your browser's localStorage

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **UI:** React 19, Tailwind CSS 4
- **i18n:** Custom `useTranslation` hook with per-language JSON files
- **Certificate generation:** `html-to-image`
- **State / persistence:** React Context + localStorage (no backend)
- **Deployment:** GitHub Pages & Vercel

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm run dev

# Production build (outputs to /out)
npm run build

# GitHub Pages build (sets basePath to /fraud-guard/)
npm run build:github
```

---

## Project Structure

```
src/
  app/               # Next.js pages (/, /dashboard, /module/[id], /emergency, /certificate)
  components/        # UI components (ScenarioEngine, Dashboard, PhoneCallInterface, ...)
  context/           # AppContext — global state (progress, score, language)
  data/              # Module definitions, scenario steps, scenario translations
  hooks/             # useTranslation
  translations/      # UI strings per language (en, hi, ta, te)
```

---

## Deployment

The app is statically exported and hosted on GitHub Pages at:

```
https://pravoobi.github.io/fraud-guard/
```

It can also be deployed to Vercel or any static host (Netlify, AWS S3, etc.) — no server required.
