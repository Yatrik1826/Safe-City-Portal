# Architecture Overview

## System Layers

- Frontend: React + Vite + Tailwind + Chart.js + Mapbox + Socket.io client + PWA shell
- Backend: Node.js + Express.js + Socket.io + MongoDB (Mongoose)
- Data Simulation: Synthetic generator + stream simulator service

## Key Modules

- Auth & RBAC: JWT-based tokens with admin/officer/user roles
- Incidents: GeoJSON storage, 2dsphere indexes, filters, heatmap endpoints
- Emergency Response: Panic alerts, virtual unit assignment, status workflow
- Analytics: Aggregations for hourly and daily trends, category mix, risk scoring
- Prediction (AI-lite): Rule-based risk classification, unsafe time windows
- Realtime: Socket.io channels for incident and alert events
- Reports: Snapshot export for PDF generation

## Data Flow

1. Simulation engine generates incidents and stores them in MongoDB
2. Express API serves analytics and incidents to the dashboard
3. Socket.io pushes `incident:new` and `alert:new` to connected dashboards
4. Frontend visualizes heatmaps, charts, risk overlays, and live alert cards

## Prediction Logic (AI-lite)

- Risk score = incidentCount * 1.5 + recentWeight * 3
- Risk levels: Low (<7), Medium (7-14), High (>=15)
- Unsafe time windows are selected when hourly counts exceed the baseline average

The logic runs on aggregated spatial grid cells using MongoDB aggregation pipelines.
