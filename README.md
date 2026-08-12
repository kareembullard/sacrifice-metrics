# Sacrifice Metrics Dashboard

A data-driven dashboard for quantifying the impact of life choices — tracking sacrifices, calculating opportunity cost, and visualizing trade-offs across four views: Dashboard, Impact Table, Formulas, and Tracker.

![screenshot](assets/screenshots/sacrifice-metrics.png)

## Live Demo

**Live:** [https://kareembullard.github.io/sacrifice-metrics/](https://kareembullard.github.io/sacrifice-metrics/)

`index.html` (a copy of `Sacrifice_Metrics_Dashboard.html`) is served directly from GitHub Pages via relative-path `style.css`/`app.js` — no build step. `sacrifice-metrics-dashboard_index.html` is the enhanced React/TypeScript rebuild, kept for local development.

## Features

- **Dashboard** — Summary view with key sacrifice metrics and visualizations
- **Impact Table** — Structured breakdown of choices and their cascading effects
- **Formulas** — The math behind the metrics (opportunity cost, ROI of sacrifice)
- **Tracker** — Log and monitor ongoing sacrifices over time
- Chart.js integration for data visualization
- Dark-gradient UI (gray-900 → indigo-900)
- Tabbed navigation between all four views

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + TypeScript |
| Build | Vite |
| Charts | Chart.js |
| Styling | Tailwind CSS |

## React Version — Local Setup

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

## Project Structure

```
├── App.tsx                        # Tab shell + routing
├── index.tsx                      # Entry point
├── constants.ts                   # Metric definitions + data
├── components/
│   ├── ui/                        # Shared UI components (TabButton, etc.)
│   ├── Dashboard.tsx              # Main dashboard view
│   ├── SacrificeImpactTable.tsx   # Detailed impact breakdown
│   ├── Formulas.tsx               # Formula documentation view
│   └── Tracker.tsx                # Ongoing sacrifice tracker
```

## About

Built by Kareem Bullard as part of the King Projects portfolio — a unique personal analytics tool that applies data science thinking to life decision-making. Demonstrates TypeScript component architecture, tabbed navigation, and Chart.js data visualization.
