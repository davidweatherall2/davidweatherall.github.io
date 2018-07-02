import json
import os
import urllib.request


regions = {
			'lck': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lck', 'region_code' : 'ESPORTSTMNT06', 'tournament' : 5 },
			'nalcs': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=na-lcs', 'region_code' : 'TRLH1', 'tournament' : 1 },
			'eulcs': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=eu-lcs', 'region_code' : 'TRLH3', 'tournament' : 1},
		  }


def getGame(game_id, gameHash, region):

	url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}?gameHash={}'.format(region, game_id, gameHash)

	print(url_string)

	with urllib.request.urlopen(url_string) as url:
		json_raw = url.read().decode()

	json_file = open('jsons/game/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

	url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}/timeline?gameHash={}'.format(region, game_id, gameHash)

	with urllib.request.urlopen(url_string) as url:
		json_raw = url.read().decode()

	json_file = open('jsons/timeline/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

def getJson(url_string):
	print('getting json: ' + url_string)
	req = urllib.request.Request(url_string, headers={'User-Agent' : "Magic Browser"}) 

	with urllib.request.urlopen(req) as url:
		json_raw = url.read().decode()

	print('got json')

	return json_raw

def scrape():
	for region in regions:
		print('region: ' + region)
		region_dict = regions[region]

		json_raw = getJson(region_dict['url'])

		json_obj = json.loads(json_raw)

		tournament_id = json_obj['highlanderTournaments'][region_dict['tournament']]['id']

		brackets = json_obj['highlanderTournaments'][region_dict['tournament']]['brackets']

		for bracket in brackets:


			matches = brackets[bracket]['matches']

			print(matches.keys())

			for match_id in matches:

				print(match_id)

				match_url_string = 	'https://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId={}&matchId={}'.format(tournament_id, match_id)

				match_json_raw = getJson(match_url_string)

				match_json = json.loads(match_json_raw)

				for game in match_json['gameIdMappings']:

					game_hash = game['gameHash']
					game_id_hash = game['id']

					game_id = matches[match_id]['games'][game_id_hash]['gameId']

					if game_id + '.json' in os.listdir('jsons/game'):
						print('skipping: ' + game_id)
						continue

					getGame(game_id, game_hash, region_dict['region_code'])