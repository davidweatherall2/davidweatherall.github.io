import os
import json

import scrape


def champidtoname(id):	
	champdict = {'145' : 'KaiSa', '555' : 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac'}
	return champdict[str(id)]

def platformRegion(regionID):
	regions = {'TRLH1' : 'NALCS', 'ESPORTSTMNT06' : 'LCK', 'TRLH3' : 'EULCS' }
	return regions[regionID]

def get_teams(game_json):
	team1 = game_json['participantIdentities'][0]['player']['summonerName'].split(' ')[0]
	team2 = game_json['participantIdentities'][5]['player']['summonerName'].split(' ')[0]

	return [team1, team2]

def get_fb(timeline_json):
	for frame in timeline_json['frames']:
		for event in frame['events']:
			if event['type'] == 'CHAMPION_KILL':
				victimId = event['victimId'] - 1
				killerIds = [event['killerId'] - 1]
				for assister in event['assistingParticipantIds']:
					killerIds.append(assister - 1)

				print(killerIds)

				return {'position' : event['position'], 'victimId' : victimId, 'killerIds' : killerIds, 'assistIds' : event['assistingParticipantIds'], 'killerId' : event['killerId']}
	return False


# print('scraping...')
# scrape.scrape()

path = 'raw/game/'
games = os.listdir(path)

api = {
	'NALCS' : [],
	'EULCS' : [],
	'LCK' : []
}

api_light = {
	'NALCS' : [],
	'EULCS' : [],
	'LCK' : []
}

for game in games:

	item = {}

	file = 'raw/game/' + game

	f = open(file, 'r')
	text = f.read()
	game_json = json.loads(text)
	f.close()




	file = 'raw/timeline/' + game

	f = open(file, 'r')
	text = f.read()
	timeline_json = json.loads(text)
	f.close()

	item['teamNames'] = get_teams(game_json)

	item['time'] = int(str(game_json['gameCreation'])[:-3])


	if(game_json['teams'][0]['firstBlood'] is True):
		item['firstBlood'] = 0
	else:
		item['firstBlood'] = 1

	if(game_json['teams'][0]['win'] == 'Win'):
		item['win'] = 0
	else:
		item['win'] = 1
		
	if(game_json['teams'][0]['firstTower'] is True):
		item['firstTower'] = 0
	else:
		item['firstTower'] = 1
		
	if(game_json['teams'][0]['firstDragon'] is True):
		item['firstDragon'] = 0
	else:
		item['firstDragon'] = 1
		
	if(game_json['teams'][0]['firstInhibitor'] is True):
		item['firstInhibitor'] = 0
	else:
		item['firstInhibitor'] = 1
		
	if(game_json['teams'][0]['firstBaron'] is True):
		item['firstBaron'] = 0
	elif(game_json['teams'][0]['firstBaron'] is True):
		item['firstBaron'] = 1
	else:
		item['firstBaron'] = False
		
	if(game_json['teams'][0]['firstRiftHerald'] is True):
		item['firstRiftHerald'] = 0
	elif(game_json['teams'][1]['firstRiftHerald'] is True):
		item['firstRiftHerald'] = 1
	else:
		item['firstRiftHerald'] = False

	item['towerKills'] = [game_json['teams'][0]['towerKills'], game_json['teams'][1]['towerKills']]
	item['inhibitorKills'] = [game_json['teams'][0]['inhibitorKills'], game_json['teams'][1]['inhibitorKills']]
	item['baronKills'] = [game_json['teams'][0]['baronKills'], game_json['teams'][1]['baronKills']]
	item['dragonKills'] = [game_json['teams'][0]['dragonKills'], game_json['teams'][1]['dragonKills']]

	item['bans'] = []

	for team in game_json['teams']:
		bans = []
		for ban in team['bans']:
			bans.append(ban['championId'])

		item['bans'].append(bans)


	region = platformRegion(game_json['platformId'])
	game_id = game_json['gameId']

	item['timeline'] = '/api/{}/games/{}/timeline.json'.format(region, game_id)

	item_light = item.copy()
	item_light['players'] = []

	item['players'] = []


	player_count = 0

	fb_people = get_fb(timeline_json)

	for player in game_json['participants']:
		p_stats = player['stats']
		player_item = {}
		light_item = {}
		player_item['name'] = game_json['participantIdentities'][player_count]['player']['summonerName']
		light_item['name'] = game_json['participantIdentities'][player_count]['player']['summonerName']
		player_item['role'] = player['timeline']['role']
		player_item['champId'] = player['championId']
		light_item['champId'] = player['championId']
		player_item['spells'] = [player['spell1Id'], player['spell2Id']]
		player_item['items'] = [p_stats['item1'], p_stats['item2'], p_stats['item3'], p_stats['item4'], p_stats['item5'], p_stats['item6']]
		player_item['kills'] = p_stats['kills']
		player_item['deaths'] = p_stats['deaths']
		player_item['assists'] = p_stats['assists']
		player_item['multiKills'] = {
			'largest' : p_stats['largestMultiKill'],
			'double' : p_stats['doubleKills'],
			'triple' : p_stats['tripleKills'],
			'quadra' : p_stats['quadraKills'],
			'penta' : p_stats['pentaKills'],
		}
		player_item['damageDealt'] = {
			'total' : p_stats['totalDamageDealtToChampions'],
			'magic' : p_stats['magicDamageDealtToChampions'],
			'physical' : p_stats['physicalDamageDealtToChampions'],
			'true' : p_stats['trueDamageDealtToChampions']
		}
		player_item['damageTaken'] = {
			'total' : p_stats['totalDamageTaken'],
			'magic' : p_stats['magicalDamageTaken'],
			'physical' : p_stats['physicalDamageTaken'],
			'true' : p_stats['trueDamageTaken']
		}
		player_item['totalHeal'] = p_stats['totalHeal']
		player_item['objectivesDamage'] = p_stats['damageDealtToObjectives']
		player_item['turretsDamage'] = p_stats['damageDealtToTurrets']
		player_item['timeCCingOthers'] = p_stats['timeCCingOthers']
		player_item['totalTimeCrowdControlDealt'] = p_stats['totalTimeCrowdControlDealt']
		player_item['goldEarned'] = p_stats['goldEarned']
		player_item['cs'] = p_stats['totalMinionsKilled']
		player_item['csJungle'] = p_stats['neutralMinionsKilled']
		player_item['level'] = p_stats['champLevel']
		player_item['controlsBought'] = p_stats['visionWardsBoughtInGame']
		player_item['wardsPlaced'] = p_stats['wardsPlaced']
		player_item['wardsKilled'] = p_stats['wardsKilled']
		player_item['firstBloodKill'] = p_stats['firstBloodKill']
		if player_count in fb_people['assistIds']:
			player_item['firstBloodAssist'] = True
		else:
			player_item['firstBloodAssist'] = False
		
		if player_count in fb_people['killerIds']:
			light_item['firstBloodInvolve'] = True
		else:
			light_item['firstBloodInvolve'] = False
		
		if player_count == fb_people['victimId']:
			player_item['firstDeath'] = True
			light_item['firstDeath'] = True
		else:
			player_item['firstDeath'] = False
			light_item['firstDeath'] = False

		player_item['firstBloodPosition'] = fb_people['position']
		player_item['firstTowerKill'] = p_stats['firstTowerKill']
		player_item['firstTowerAssist'] = p_stats['firstTowerAssist']
		player_item['firstInhibitorKill'] = p_stats['firstInhibitorKill']
		player_item['firstInhibitorAssist'] = p_stats['firstInhibitorAssist']
		player_item['csPerMin'] = player['timeline']['creepsPerMinDeltas']
		player_item['goldPerMin'] = player['timeline']['goldPerMinDeltas']
		player_item['damageTakenPerMin'] = player['timeline']['damageTakenPerMinDeltas']


		if('damageTakenDiffPerMinDeltas' in player['timeline']):
			player_item['damageGivenPerMin'] = {}
			for delta in player_item['damageTakenPerMin']:
				player_item['damageGivenPerMin'][delta] = player_item['damageTakenPerMin'][delta] + player['timeline']['damageTakenDiffPerMinDeltas'][delta]

		else:
			player_item['damageGivenPerMin'] = False

		item['players'].append(player_item)
		item_light['players'].append(light_item)

		player_count += 1

	api[platformRegion(game_json['platformId'])].append(item)
	api_light[platformRegion(game_json['platformId'])].append(item_light)


	game_path = 'api/{}/games/{}'.format(region, game_id)

	if not os.path.exists(game_path):
		os.makedirs(game_path)

	f = open('{}/players.json'.format(game_path), 'w')
	f.write(json.dumps(item['players']))
	f.close()

	f = open('{}/game.json'.format(game_path), 'w')
	f.write(json.dumps(game_json))
	f.close()

	f = open('{}/timeline.json'.format(game_path),'w')
	f.write(json.dumps(timeline_json))
	f.close()



for region in api:
	region_sorted = sorted(api[region], key=lambda k: k['time'])
	f = open('api/{}/full.json'.format(region), 'w')
	f.write(json.dumps(region_sorted))
	f.close()

for region in api_light:
	region_sorted = sorted(api_light[region], key=lambda k: k['time'])
	f = open('api/{}/light.json'.format(region), 'w')
	f.write(json.dumps(region_sorted))
	f.close()
