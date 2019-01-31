import json
import os
import urllib.request
import time


regions = {
	'LCK': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lck'},
	'NALCS': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lcs'},
	'EULCS': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lec'},
	'CBLOL': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=cblol-brazil'},
	'LMS' :  {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=lms'},
	'TCL': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=turkiye-sampiyonluk-ligi'},
	'OPL': {'url' : 'https://api.lolesports.com/api/v1/leagues?slug=oce-opl'}
}

data_path = 'raw/'

if os.path.isfile('{}match_ids.json'.format(data_path)):
	f = open('{}match_ids.json'.format(data_path), 'r')
	text = f.read()
	match_array = json.loads(text)['matches']
	f.close()
else:
	match_array = []




def getGame(game_id, gameHash):

	region_base = 'ESPORTSTMNT0'
	region = ''
	i = 1
	while i < 6:
		region = region_base + str(i)
		print('checking region {}'.format(region))
		url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}?gameHash={}'.format(region, game_id, gameHash)
		print('getting api: {}'.format(url_string))
		json_raw = getJson(url_string)
		if json_raw == False:
			i += 1
			if i == 6:
				print('no match found')
		else:
			break

	json_file = open(data_path + 'game/{}.json'.format(str(game_id)), 'wb')
	json_file.write(json_raw.encode('utf-8'))
	json_file.close

	url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}/timeline?gameHash={}'.format(region, game_id, gameHash)
	print('getting second api: {}'.format(url_string))
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
		print(e)
		return False

	print('got json')

	return json_raw

def addImage(match_json, region):
	if not os.path.isdir("assets/img/logos"):
		os.makedirs("assets/img/logos")

	if not os.path.isdir("assets/img/logos/{}".format(region)):
		os.makedirs("assets/img/logos/{}".format(region))

	i = 0
	if len(match_json['teams']) > 1:
		while i < 2:
			team_acro = match_json['teams'][i]["acronym"]
			if "{}.png".format(team_acro) not in os.listdir("assets/img/logos/{}/".format(region)):
				logo_link = match_json['teams'][i]["logoUrl"]
				urllib.request.urlretrieve(logo_link, "assets/img/logos/{}/{}.png".format(region, team_acro))
			i += 1

def wipeDir():
	os.system('rm -rf {}game/*'.format(data_path))
	os.system('rm -rf {}timeline/*'.format(data_path))

def scrape():

	print('Wipe previous data? y/n')

	if input('') == 'y':
		wipeDir()

	region_tournaments = []
	scheduled_matches = []
	game_map = {}

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

		if tournaments:
			tournaments_array = tournaments.split(" ")
		else:
			tournaments_array = []

		region_tournaments.append({
			'region_name' : region,
			'region_dict' : region_dict,
			'tournaments_array': tournaments_array,
			'json_raw' : json_raw,
			'json_obj' : json_obj
		})

	number_regions_scraped = 0
	total_regions = len(region_tournaments)

	for region_data in region_tournaments:

		number_regions_scraped = number_regions_scraped + 1

		region_dict = region_data['region_dict']
		region_name = region_data['region_name']
		tournaments_array = region_data['tournaments_array']
		json_raw = region_data['json_raw']
		json_obj = region_data['json_obj']
		

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

					addImage(match_json, region_name)

					if len(match_json['scheduleItems']) > 0:
						print('week: {}, day: {}'.format(match_json['scheduleItems'][0]['tags']['blockLabel'], match_json['scheduleItems'][0]['tags']['subBlockLabel']))
						if len(match_json['teams']) == 2:
							scheduled_matches.append({
								'region' : region_name,
								'team1' : match_json['teams'][0]['name'],
								'team1acro' : match_json['teams'][0]['acronym'],
								'team2' : match_json['teams'][1]['name'],
								'team2acro' : match_json['teams'][1]['acronym'],
								'datetime' : match_json['scheduleItems'][0]['scheduledTime'],
							})

					for game in match_json['gameIdMappings']:

						game_hash = game['gameHash']
						game_id_hash = game['id']

						game_id = matches[match_id]['games'][game_id_hash]['gameId'].replace('\t', '')

						if game_id + '.json' in os.listdir(data_path + 'game'):
							print('skipping: ' + game_id)
							continue

						getGame(game_id, game_hash)
						game_map[game_id] = region_name

					print('{} / {} region'.format(number_regions_scraped, total_regions))

	f = open(data_path + 'scheduled_matches.json', 'w')
	f.write(json.dumps(scheduled_matches))
	f.close()

	f = open(data_path + 'game_map.json', 'w')
	f.write(json.dumps(game_map))
	f.close()

	

	return scheduled_matches
