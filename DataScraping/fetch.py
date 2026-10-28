"""Fetch current-season Premier League player stats from the Fantasy Premier League API.

Usage: python fetch.py        # writes data/stats-<season>.csv

No browser or login needed. Matches played (MP) is counted from each player's
per-match history, which costs one request per player who has played.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import pandas as pd
import requests

BASE = "https://fantasy.premierleague.com/api"
OUT_DIR = Path(__file__).parent / "data"
POSITIONS = {1: "GK", 2: "DF", 3: "MF", 4: "FW"}
HEADERS = {"User-Agent": "Mozilla/5.0"}


def get(session, path):
	response = session.get(f"{BASE}/{path}", headers=HEADERS, timeout=30)
	response.raise_for_status()
	return response.json()


def appearances(session, element_id):
	history = get(session, f"element-summary/{element_id}/")["history"]
	return sum(1 for match in history if match["minutes"] > 0)


def fetch():
	with requests.Session() as session:
		bootstrap = get(session, "bootstrap-static/")
		regions = {r["id"]: r["iso_code_long"] for r in get(session, "regions/")}
		first_deadline = bootstrap["events"][0]["deadline_time"]
		start_year = int(first_deadline[:4])
		season = f"{start_year}-{str(start_year + 1)[2:]}"
		teams = {t["id"]: t for t in bootstrap["teams"]}

		players = [p for p in bootstrap["elements"] if p["minutes"] > 0]
		with ThreadPoolExecutor(max_workers=4) as pool:
			mp = list(pool.map(lambda p: appearances(session, p["id"]), players))

	rows = []
	for p, played in zip(players, mp):
		rows.append({
			"Code": p["code"],
			"Name": f"{p['first_name']} {p['second_name']}".strip(),
			"Nation": regions.get(p["region"]),
			"BirthDate": p["birth_date"],
			"Pos": POSITIONS[p["element_type"]],
			"MP": played,
			"Starts": p["starts"],
			"Min": p["minutes"],
			"Gls": p["goals_scored"],
			"Ast": p["assists"],
			"PensMissed": p["penalties_missed"],
			"CrdY": p["yellow_cards"],
			"CrdR": p["red_cards"],
			"xG": float(p["expected_goals"]),
			"xAG": float(p["expected_assists"]),
			"Team": teams[p["team"]]["name"],
			"TeamCode": teams[p["team"]]["code"],
			"Price": p["now_cost"] / 10,
			"Points": p["total_points"],
			"Status": p["status"],
			"News": p["news"],
			"Season": season,
		})
	return season, pd.DataFrame(rows)


if __name__ == "__main__":
	season, df = fetch()
	OUT_DIR.mkdir(exist_ok=True)
	out = OUT_DIR / f"stats-{season}.csv"
	df.to_csv(out, index=False)
	print(f"Wrote {len(df)} players ({season}) to {out}")
