# Setup & Deployment

## Local Development

1. Start MongoDB locally or use Docker Compose.
2. Backend:
   - `cd server`
   - `npm install`
   - `cp .env.example .env`
   - `npm run seed`
   - `npm run dev`
3. Frontend:
   - `cd client`
   - `npm install`
   - `npm run dev`

## Docker (Recommended)

- `docker compose up --build`
- Client is served at `http://localhost:5173`
- API at `http://localhost:4000`

## PWA Notes

- The PWA manifest is at `client/public/manifest.json`.
- Replace `icon-192.png` and `icon-512.png` in `client/public` with real app icons.

## Production Notes

- Use a managed MongoDB (Atlas) and set `MONGO_URI`.
- Configure `JWT_SECRET` with a secure random value.
- Set `VITE_API_URL` and `VITE_MAPBOX_TOKEN` in the client build pipeline.
- Deploy server to Render/AWS and client to Vercel/Netlify.
