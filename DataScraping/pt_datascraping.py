import pandas as pd
from playwright.sync_api import sync_playwright
from io import StringIO

def scrape_data(playwright):
	browser = playwright.chromium.launch(headless=False)
	page = browser.new_page()
	page.goto("https://fbref.com/en/comps/9/2024-2025/stats/2024-2025-Premier-League-Stats")
	table = page.locator("table.stats_table").first
	links = table.locator("a").all()
	squad_links = []
	for link in links:
		href = link.get_attribute("href")
		if href and "/squads/" in href:
			squad_links.append("https://fbref.com" + href)
	all_teams = []
	for i, squad_link in enumerate(squad_links):
		team_name = squad_link.split("/")[-1].replace("-Stats", "")
		page.goto(squad_link, timeout=120000)
		page.wait_for_selector('table.stats_table', timeout=120000)
		table_html = page.locator('table.stats_table').first.inner_html()
		df = pd.read_html(StringIO(f"<table>{table_html}</table>"))[0]
		if hasattr(df.columns, 'droplevel'):
			try:
				df.columns = df.columns.droplevel()
			except Exception:
				pass
		df["Team"] = team_name
		all_teams.append(df)
	browser.close()
	if all_teams:
		stat_df = pd.concat(all_teams, ignore_index=True)
		stat_df = stat_df[stat_df['Player'].notna() & (stat_df['Player'].str.strip() != '')]
		unwanted_keywords = ['Player', 'Squad Total', 'Opponent Total', 'Playing Time', 'Performance', 'Expected', 'Progression', 'Per 90 Minutes', 'Totals', 'Per 90', 'Minutes']
		stat_df = stat_df[~stat_df['Player'].str.contains('|'.join(unwanted_keywords), case=False, na=False)]

		stat_df = stat_df.loc[:, ~stat_df.columns.duplicated()]
		output_cols = [
			'Player',
			'Nation',
			'Pos',
			'Age',
			'MP',
			'Starts',
			'Min',
			'Gls',
			'Ast',
			'PK',
			'CrdY',
			'CrdR',
			'xG',
			'xAG',
			'Team',
		]
		output_cols = [col for col in output_cols if col in stat_df.columns]
		stat_df[output_cols].to_csv("stats.csv", index=False)

with sync_playwright() as playwright:
	scrape_data(playwright)
