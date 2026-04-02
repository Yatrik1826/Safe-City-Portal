# Nirbhaya Safe City Intelligent Monitoring and Response System

A research-grade MERN platform that simulates smart city safety operations for women's safety. It includes incident reporting, realtime response simulation, analytics, and AI-lite prediction.

This README is the single source of truth for:
1. What the project is and why it exists.
2. How to run it locally.
3. How to work with it in Git.

## Table Of Contents
1. Project Overview
2. Features
3. Tech Stack
4. Repository Structure
5. Local Setup
6. Environment Variables
7. Running The App
8. Scripts
9. Testing
10. Git Workflow
11. Commit Conventions
12. Branching Strategy
13. Pull Requests
14. Releases And Versioning
15. Troubleshooting
16. Roadmap
17. Contributing
18. License

## Project Overview
The system models a safety operations center for a smart city. It accepts safety incidents, simulates dispatch and response actions, and provides analytics that help measure risk, response time, and incident patterns. The platform is intended for education, research, and demo environments rather than production use.

## Features
1. Incident reporting and tracking.
2. Realtime simulation of response workflows.
3. AI-lite risk prediction and alerts.
4. Analytics dashboards and reports.
5. Mapping and geospatial visualization.

## Tech Stack
1. Frontend: React.
2. Backend: Node.js, Express.
3. Database: MongoDB.
4. Realtime: Socket.io.
5. Tooling: npm, ESLint, Prettier.

## Repository Structure
1. `client/` React app.
2. `server/` Node.js API and realtime server.
3. `docs/` Design and architecture documents.
4. `scripts/` Project utilities.
5. `docker-compose.yml` Optional containerized setup.

## Local Setup
Prerequisites:
1. Node.js 18 or later.
2. npm 9 or later.
3. MongoDB 6 or later.

Clone and install:
```bash
git clone <your-repo-url>
cd NP
```

Install dependencies:
```bash
cd server
npm install
cd ../client
npm install
```

## Environment Variables
Create `.env` files in the following locations:
1. `server/.env`
2. `client/.env`

Example `server/.env`:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/nirbhaya
JWT_SECRET=change_me
```

Example `client/.env`:
```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```

## Running The App
Run backend:
```bash
cd server
npm run dev
```

Run frontend:
```bash
cd client
npm start
```

Optional docker setup:
```bash
docker-compose up --build
```

## Scripts
Common scripts:
1. `npm run dev` starts the backend in development mode.
2. `npm start` starts the frontend dev server.
3. `npm test` runs tests.
4. `npm run lint` runs linting.

## Testing
1. Backend tests live in `server/`.
2. Frontend tests live in `client/`.
3. Run tests from the respective directory:
```bash
npm test
```

## Git Workflow
This repo follows a simple Git flow suitable for small teams:
1. Create a feature branch from `main`.
2. Commit small, focused changes.
3. Open a pull request to `main`.
4. Use review comments to refine.
5. Merge after approval.

Typical daily commands:
```bash
git status
git pull --rebase origin main
git checkout -b feature/<short-name>
git add .
git commit -m "feat: short description"
git push -u origin feature/<short-name>
```

## Commit Conventions
Use Conventional Commits where possible:
1. `feat:` new feature.
2. `fix:` bug fix.
3. `docs:` documentation.
4. `refactor:` code change without behavior change.
5. `test:` adding or updating tests.
6. `chore:` maintenance or tooling.

Examples:
```bash
git commit -m "feat: add incident heatmap"
git commit -m "fix: correct alert severity mapping"
```

## Branching Strategy
1. `main` is stable and always deployable.
2. `feature/*` for new work.
3. `bugfix/*` for bug fixes.
4. `hotfix/*` for urgent patches.

## Pull Requests
Before opening a PR:
1. Rebase on latest `main`.
2. Run tests and linting.
3. Ensure the PR is focused on one topic.

PR checklist:
1. Clear title and description.
2. Screenshots or recordings for UI changes.
3. Linked issues or tasks.

## Releases And Versioning
1. Use semantic versioning: `MAJOR.MINOR.PATCH`.
2. Tag releases from `main`.
3. Create release notes in GitHub or `docs/`.

## Troubleshooting
1. MongoDB connection fails: verify `MONGO_URI` and local service status.
2. Port already in use: update `PORT` or stop the conflicting process.
3. API calls fail: confirm `REACT_APP_API_BASE_URL` matches backend host.

## Roadmap
1. Phase 1: Backend + Database + Simulation.
2. Phase 2: APIs + Realtime system.
3. Phase 3: Frontend UI.
4. Phase 4: Analytics + Maps.
5. Phase 5: Deployment.

See `docs/ARCHITECTURE.md`, `docs/API.md`, and `docs/SETUP.md` for deep dives.

## Contributing
1. Fork the repo and create a feature branch.
2. Follow the Git workflow and commit conventions above.
3. Open a pull request with a clear description.

## License
Add a license file or update this section when licensing is decided.
