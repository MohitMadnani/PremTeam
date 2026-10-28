# PremTeam

Premier League player stats browser (current season, from the FPL API). React (Vite) frontend over a Spring Boot REST API backed by Postgres (Supabase).

## Layout

- `Backend/` — Spring Boot 4.1, Java 21, Maven wrapper (`./mvnw`). Package `com.pt.premier_team`.
- `frontend/` — Vite + React 19, React Router 7, axios, framer-motion, SCSS. Node 22 (`.nvmrc`).
- `DataScraping/` — the data pipeline: `fetch.py` (Fantasy Premier League API -> `data/stats-<season>.csv`), `load.py` (CSV -> Supabase upsert), `schema.sql` (tables + view).
- `.mcp.json` / `.agents/skills/` — Supabase MCP server and Supabase agent skills (authenticate the MCP with `/mcp`).

## Backend

Read-only API, one entity (`Player`) mapped to the `player_stats` view (latest loaded season, flat shape). Underlying tables: `team`, `player`, `player_season` (key: player, team, season).

- `GET /api/v1/player` — optional `team`, `nation`, `position`, `name` params; first non-blank one wins (that order). `team` is an exact match on the FPL name, e.g. `Man City`; `nation` (3-letter code like `ESP`, `ENG`) and `position` (`GK`/`DF`/`MF`/`FW`) are case-insensitive exact matches; `name` is a case-insensitive contains. No params returns everyone.
- `GET /api/v1/player/teams` — `[{name, code}]`; `/nations` — `[{code, players}]`; `/positions` — distinct values.
- The frontend reads `player.name`, which `Player.getName()` provides.
- CORS lives only in `config/WebConfig.java`, driven by `app.cors.allowed-origins`.
- Hibernate does not manage the schema (`ddl-auto=none`); `DataScraping/schema.sql` does.

Config comes from env vars, nothing is committed: `DB_URL` (JDBC URL), `DB_USERNAME`, `DB_PASSWORD`, optional `PORT`, `CORS_ALLOWED_ORIGINS`. Supabase session pooler URL form: `jdbc:postgresql://<host>:5432/postgres?sslmode=require&preferQueryMode=simple`.

## Data pipeline

From `DataScraping/` (`pip install -r requirements.txt`): `python fetch.py`, then `python load.py data/stats-2026-27.csv`. `fetch.py` calls the public FPL API (no browser, no key), covers the current season only and players with minutes > 0; MP is counted from each player's match history. `load.py` reads `DATABASE_URL` (postgresql:// form, see `.env.example`) and upserts, so re-running during the season is safe and refreshes the numbers; after a transfer it also removes the player's row for the old club in the same season.

`.github/workflows/update-data.yml` runs both scripts every 3 hours Friday to Monday (UTC) plus on demand, using the `DATABASE_URL` repository secret. GitHub only runs scheduled workflows from the default branch (`master`), and the runners are IPv4-only, so the secret must be the Session pooler string.

The FPL API has no penalties scored (stored as `pens_missed`) and gives nationality as a region id, resolved through `/api/regions/`. Players are keyed on the FPL `code`, which is stable across seasons; team names are FPL's short names (`Man City`, `Spurs`) and `team.code` builds the badge URL.

## Commands

Backend (from `Backend/`): `./mvnw test` (H2, profile `test`, no real DB needed), `./mvnw package`, `./mvnw spring-boot:run` (needs the env vars). The `Dockerfile` copies the built jar from `target/`, so run `package` first.

Boot 4 gotcha: MockMvc test support is in `spring-boot-starter-webmvc-test`, package `org.springframework.boot.webmvc.test.autoconfigure`.

## Frontend

Frontend (from `frontend/`): `npm run dev` (port 3000), `npm run build` (to `build/`), `npm run preview`. No test runner is set up.

- API calls go through `src/api.js`. In dev they are same-origin and the Vite proxy forwards `/api` to `VITE_PROXY_TARGET` (default `http://localhost:8080`; set it in the gitignored `frontend/.env.local`, e.g. when 8080 is taken). Production builds set `VITE_API_URL` to the deployed backend.
- Nav bar: `components/Sidebar` (`--nav-height` in `index.css` sets its height; pages pad their top with it).
- Routes (`src/App.jsx`): `/`, `/search`, `/teams`, `/nations`, `/positions`, and `/data` / `/teamdata`, both rendering `TeamData` (styled card grid with sort), which picks the request from the query string (`team`, `nation`, `position`, `name`).
- The team list comes from the API; the nations list comes from the API too, and `src/jsondata/countries.json` (generated from the FPL `/api/regions/`) maps each 3-letter code to a name and flag code. Position labels live in `position.json`. Team badges load from `resources.premierleague.com/premierleague/badges/70/t<code>.png`.

## Rules

- Never commit credentials. A Supabase password was committed in earlier history and must be treated as leaked; rotate it.
- Work on a branch, not `master`.

## MCP permission requests

Applies only while actually using an MCP tool that needs write permission, not whenever MCP is merely mentioned. When asking me to approve such an action, give a plain-English, one-line summary in this form, with no jargon or SQL:

`<what you will do> - allow or not?`

Example: `Push the new tables to the database - allow or not?`
