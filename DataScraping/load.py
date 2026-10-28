"""Upsert a fetched CSV into Supabase.

Usage: python load.py data/stats-2026-27.csv
Needs DATABASE_URL in the environment or a .env file: a postgresql:// connection string
(Supabase -> Connect -> Session pooler). Run schema.sql first.
"""
import os
import sys

import pandas as pd
import psycopg
from dotenv import load_dotenv


def py(value):
	return None if pd.isna(value) else value.item() if hasattr(value, "item") else value


def main(path):
	load_dotenv()
	df = pd.read_csv(path)
	with psycopg.connect(os.environ["DATABASE_URL"], prepare_threshold=None) as conn, conn.cursor() as cur:
		for r in df.drop_duplicates("TeamCode").to_dict("records"):
			cur.execute(
				"""insert into team (code, name) values (%s, %s)
				   on conflict (code) do update set name = excluded.name""",
				(py(r["TeamCode"]), r["Team"]),
			)
		for r in df.to_dict("records"):
			cur.execute(
				"""insert into player (code, name, nation_code, birth_date) values (%s, %s, %s, %s)
				   on conflict (code) do update set
				     name = excluded.name, nation_code = excluded.nation_code, birth_date = excluded.birth_date""",
				(py(r["Code"]), r["Name"], py(r["Nation"]), py(r["BirthDate"])),
			)
			cur.execute(
				"""insert into player_season
				     (player_id, team_id, season, position, mp, starts, minutes, goals, assists,
				      pens_missed, yellow, red, xg, xag, price, points, status, news)
				   select p.id, t.id, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
				   from player p, team t where p.code = %s and t.code = %s
				   on conflict (player_id, team_id, season) do update set
				     position = excluded.position, mp = excluded.mp, starts = excluded.starts,
				     minutes = excluded.minutes, goals = excluded.goals, assists = excluded.assists,
				     pens_missed = excluded.pens_missed, yellow = excluded.yellow, red = excluded.red,
				     xg = excluded.xg, xag = excluded.xag, price = excluded.price, points = excluded.points,
				     status = excluded.status, news = excluded.news""",
				(r["Season"], r["Pos"], py(r["MP"]), py(r["Starts"]), py(r["Min"]), py(r["Gls"]), py(r["Ast"]),
				 py(r["PensMissed"]), py(r["CrdY"]), py(r["CrdR"]), py(r["xG"]), py(r["xAG"]),
				 py(r["Price"]), py(r["Points"]), py(r["Status"]), py(r["News"]),
				 py(r["Code"]), py(r["TeamCode"])),
			)
			# After a transfer FPL reports only the new club, so drop the old club's row for this season
			cur.execute(
				"""delete from player_season ps using player p, team t
				   where p.code = %s and t.code = %s and ps.player_id = p.id
				     and ps.season = %s and ps.team_id <> t.id""",
				(py(r["Code"]), py(r["TeamCode"]), r["Season"]),
			)
	print(f"Loaded {len(df)} player-season rows from {path}")


if __name__ == "__main__":
	if len(sys.argv) != 2:
		raise SystemExit(__doc__)
	main(sys.argv[1])
