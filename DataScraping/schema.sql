-- Fresh install: run once in the Supabase SQL editor (or via the Supabase MCP).
-- Data comes from the Fantasy Premier League API (see fetch.py).

create table if not exists team (
  id   smallint generated always as identity primary key,
  code int  not null unique,             -- FPL team code; also names the badge image
  name text not null unique
);

create table if not exists player (
  id          int generated always as identity primary key,
  code        int  not null unique,      -- FPL player code, stable across seasons
  name        text not null,
  nation_code char(3),
  birth_date  date
);

create table if not exists player_season (
  player_id   int      not null references player(id),
  team_id     smallint not null references team(id),
  season      text     not null,         -- '2026-27'
  position    text     not null,         -- GK, DF, MF, FW
  mp          smallint,                  -- matches played (appearances)
  starts      smallint,
  minutes     int,
  goals       smallint,
  assists     smallint,
  pens_missed smallint,
  yellow      smallint,
  red         smallint,
  xg          numeric(6,2),
  xag         numeric(6,2),
  primary key (player_id, team_id, season)
);

create index if not exists player_season_team_idx on player_season (team_id, season);
create index if not exists player_name_idx on player (lower(name));

-- Flat shape the Spring API reads: the latest season only.
create or replace view player_stats with (security_invoker = true) as
select
  ps.player_id::text || '-' || ps.team_id::text || '-' || ps.season as id,
  p.name,
  p.nation_code as nation,
  ps.position as pos,
  extract(year from age(p.birth_date))::int as age,
  ps.mp, ps.starts, ps.minutes as min,
  ps.goals as gls, ps.assists as ast, ps.pens_missed,
  ps.yellow as crdy, ps.red as crdr, ps.xg, ps.xag,
  t.name as team,
  t.code as team_code,
  ps.season
from player_season ps
join player p on p.id = ps.player_id
join team t on t.id = ps.team_id
where ps.season = (select max(season) from player_season);

-- Supabase exposes public tables over its API; allow read-only access.
alter table team          enable row level security;
alter table player        enable row level security;
alter table player_season enable row level security;
drop policy if exists "public read" on team;
drop policy if exists "public read" on player;
drop policy if exists "public read" on player_season;
create policy "public read" on team          for select using (true);
create policy "public read" on player        for select using (true);
create policy "public read" on player_season for select using (true);
