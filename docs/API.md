# API Documentation

Base URL: `http://localhost:4000`

## Auth

- `POST /api/auth/register`
  - Body: `{ "name": "", "email": "", "password": "", "role": "user|admin|officer" }`
- `POST /api/auth/login`
  - Body: `{ "email": "", "password": "" }`
  - Response: `{ token, user }`

## Incidents

- `GET /api/incidents`
  - Query: `category`, `status`, `from`, `to`, `isSimulated`, `limit`, `skip`
- `GET /api/incidents/nearby?lng=&lat=&km=`
- `GET /api/incidents/heatmap`
- `POST /api/incidents`
  - Body: `{ category, description, severity, lng, lat, addressLabel }`

## Alerts

- `POST /api/alerts/panic`
  - Body: `{ lng, lat, category?, description? }`
- `GET /api/alerts?status=`
- `PUT /api/alerts/:id/status`
  - Body: `{ status: "pending|dispatched|resolved" }`

## Analytics

- `GET /api/analytics/summary`
- `GET /api/analytics/area-risk`

## Prediction (AI-lite)

- `GET /api/predict/area?lng=&lat=&km=`
- `GET /api/predict/time-windows`

## Reports

- `GET /api/reports/snapshot`

## Simulation

- `GET /api/simulate/status`
- `POST /api/simulate/generate`
  - Body: `{ count }`
- `POST /api/simulate/start`
  - Body: `{ frequencyPerMinute }`
- `POST /api/simulate/stop`

All non-auth endpoints require `Authorization: Bearer <token>`.
