# PremTeam

A Premier League player stats browser. Browse the current season by team, nation or position, or search for a player by name.

- **Frontend:** React 19 + Vite, React Router, framer-motion, SCSS
- **Backend:** Spring Boot 4 (Java 21), read-only REST API
- **Database:** Postgres on Supabase
- **Data:** the public Fantasy Premier League API, loaded by a small Python pipeline

```
Fantasy Premier League API --> DataScraping (fetch.py, load.py) --> Supabase --> Spring Boot API --> React app
```

## Project layout

| Folder | What it is |
|---|---|
| `frontend/` | The React app |
| `Backend/` | The Spring Boot API |
| `DataScraping/` | `fetch.py` downloads the stats, `load.py` upserts them into Supabase, `schema.sql` defines the tables |

## Getting started

You need Java 21, Node 22, Python 3.10+ and a Supabase project.

### 1. Database

Run `DataScraping/schema.sql` in the Supabase SQL editor. It creates the `team`, `player` and `player_season` tables, a `player_stats` view the API reads, and read-only row level security.

### 2. Load the data

Copy `.env.example` to `.env` and set `DATABASE_URL` to your Supabase **Session pooler** connection string (Supabase > Connect). Then:

```
cd DataScraping
pip install -r requirements.txt
python fetch.py
python load.py data/stats-2026-27.csv
```

The loader upserts, so you can re-run it any time during the season to refresh the numbers.

### 3. Backend

The backend reads its database settings from environment variables (it does not read `.env`):

| Variable | Value |
|---|---|
| `DB_URL` | `jdbc:postgresql://<pooler-host>:5432/postgres?sslmode=require&preferQueryMode=simple` |
| `DB_USERNAME` | `postgres.<project-ref>` |
| `DB_PASSWORD` | your database password |
| `PORT` | optional, defaults to 8080 |
| `CORS_ALLOWED_ORIGINS` | optional, comma-separated origin patterns |

```
cd Backend
./mvnw spring-boot:run
```

Run the tests with `./mvnw test`. They use an in-memory database and need no setup.

### 4. Frontend

```
cd frontend
npm install
npm run dev
```

The dev server runs on port 3000 and forwards `/api` requests to the backend on port 8080. If your backend is on another port, put `VITE_PROXY_TARGET=http://localhost:8081` in `frontend/.env.local`. For a production build, set `VITE_API_URL` to the deployed backend URL and run `npm run build`.

## API

All endpoints are `GET` and return JSON.

| Endpoint | Returns |
|---|---|
| `/api/v1/player` | Players for the latest season. Optional filters: `team`, `nation`, `position`, `name` (the first one given is used) |
| `/api/v1/player/teams` | Teams with their badge codes |
| `/api/v1/player/nations` | Nations with player counts |
| `/api/v1/player/positions` | The four positions: `GK`, `DF`, `MF`, `FW` |

## Data notes

- The Fantasy Premier League API only covers the current season and lists players who have played at least one minute.
- It has no penalties scored, so the app shows penalties missed instead.
- Matches played is counted from each player's match history.
- Team names are the API's short names, such as "Man City" and "Spurs".
