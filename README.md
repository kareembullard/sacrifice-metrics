# Sacrifice Metrics Dashboard

A data-driven dashboard for quantifying the impact of life choices — tracking sacrifices, calculating opportunity cost, and visualizing trade-offs across four views: Dashboard, Impact Table, Formulas, and Tracker.

![screenshot](assets/screenshots/sacrifice-metrics.png)

## Live Demo

**HTML Version (no install needed):**
Open `sacrifice-metrics-dashboard_index.html` in the `App_sacrifice-metrics-dashboard` folder — or deploy to GitHub Pages:
```
https://[your-github-username].github.io/sacrifice-metrics-dashboard/Sacrifice_Metrics_Dashboard.html
```

> This React version (`App_sacrifice-metrics-dashboard-React_2`) is the enhanced rebuild with TypeScript and component separation. The HTML version works without any build step.

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
