import json
import os
import urllib.request
import time


regions = {
			'lck': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lck', 'region_code' : 'ESPORTSTMNT06'},
			'nalcs': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=na-lcs', 'region_code' : 'TRLH1'},
			'eulcs': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=eu-lcs', 'region_code' : 'TRLH3'},
		  }

data_path = 'raw/'

if os.path.isfile('{}match_ids.json'.format(data_path)):
	f = open('{}match_ids.json'.format(data_path), 'r')
	text = f.read()
	match_array = json.loads(text)['matches']
	f.close()
else:
	match_array = []




def getGame(game_id, gameHash, region):

	url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}?gameHash={}'.format(region, game_id, gameHash)

	json_raw = getJson(url_string)
	if json_raw == False:
		return False

	json_file = open(data_path + 'game/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

	url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}/timeline?gameHash={}'.format(region, game_id, gameHash)

	json_raw = getJson(url_string)
	if json_raw == False:
		return False

	json_file = open(data_path + 'timeline/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

def getJson(url_string):
	print('getting json: ' + url_string)
	req = urllib.request.Request(url_string, headers={'User-Agent' : "Magic Browser"}) 

	try:
		response_string = urllib.request.urlopen(req)
		json_raw = response_string.read().decode()
	except urllib.request.HTTPError as e:
		if(e.code == 104):
			print('error 104, sleeping for 20 seconds and retrying')
			time.sleep(20)
			return getJson(url_string)
		if(e.code == 404):
			return False

	print('got json')

	return json_raw

def wipeDir():
	os.system('rm -rf {}game/*'.format(data_path))
	os.system('rm -rf {}timeline/*'.format(data_path))

def addMatchJson(match_id):
	if not os.path.isfile('{}match_ids.json'.format(data_path)):
		f = open('{}match_ids.json'.format(data_path), 'w')
		init_matches = {'matches' : []}
		f.write(json.dumps(init_matches))
		f.close()

	f = open('{}match_ids.json'.format(data_path), 'r')
	text = f.read()
	match_json = json.loads(text)
	f.close()

	match_json['matches'].append(match_id)

	f = open('{}match_ids.json'.format(data_path), 'w')
	f.write(json.dumps(match_json))
	f.close()


def scrape():

	print('Wipe previous data? y/n')

	if input('') == 'y':
		wipeDir()

	for region in regions:
		print('region: ' + region)
		region_dict = regions[region]

		json_raw = getJson(region_dict['url'])

		json_obj = json.loads(json_raw)

		count = 0

		for tournament in json_obj['highlanderTournaments']:
			print('{}. {}'.format(count, tournament['title']))
			count += 1

		print('Select Tournaments (seperate by spaces):')
		tournaments = input('')

		tournaments_array = tournaments.split(" ")

		for tournament_key in tournaments_array:

			tournament_key = int(tournament_key)

			print('sraping {}'.format(json_obj['highlanderTournaments'][tournament_key]['title']))

			tournament_id = json_obj['highlanderTournaments'][tournament_key]['id']

			brackets = json_obj['highlanderTournaments'][tournament_key]['brackets']

			for bracket in brackets:

				matches = brackets[bracket]['matches']

				for match_id in matches:

					match_url_string = 	'https://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId={}&matchId={}'.format(tournament_id, match_id)

					match_json_raw = getJson(match_url_string)

					match_json = json.loads(match_json_raw)

					for game in match_json['gameIdMappings']:

						game_hash = game['gameHash']
						game_id_hash = game['id']

						game_id = matches[match_id]['games'][game_id_hash]['gameId']

						if game_id + '.json' in os.listdir(data_path + 'game'):
							print('skipping: ' + game_id)
							continue

						getGame(game_id, game_hash, region_dict['region_code'])

					if len(match_json['gameIdMappings']) > 0:
						addMatchJson(match_id)