import os
import json

import scrape
import datetime


def champidtoname(id):	
	champdict = {'145' : 'KaiSa', '555' : 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac'}
	return champdict[str(id)]


def get_teams(game_json):
	team1 = game_json['participantIdentities'][0]['player']['summonerName'].split(' ')[0]
	team2 = game_json['participantIdentities'][5]['player']['summonerName'].split(' ')[0]

	return [team1, team2]

def opposite(number):
	if number == 0:
		return 1
	else:
		return 0

def team_id(num):
	if num == 100:
		return 0
	else:
		return 1

def get_ft(timeline_json):
	for frame in timeline_json['frames']:
		for event in frame['events']:
			if event['type'] == 'BUILDING_KILL' and event['buildingType'] == 'TOWER_BUILDING':
				return {'team' : event['teamId'], 'position' : event['laneType']}

	return False

def get_fb(timeline_json):
	for frame in timeline_json['frames']:
		for event in frame['events']:
			if event['type'] == 'CHAMPION_KILL':
				victimId = event['victimId'] - 1
				killerIds = [event['killerId'] - 1]
				killerId = event['killerId'] - 1
				assistIds = [];
				for assister in event['assistingParticipantIds']:
					killerIds.append(assister - 1)
					assistIds.append(assister - 1)


				return {'position' : event['position'], 'victimId' : victimId, 'killerIds' : killerIds, 'assistIds' : assistIds, 'killerId' : killerId}
	return False



f = open('raw/game_map.json', 'r')
text = f.read()
game_map = json.loads(text)

# print('scraping...')
# scrape.scrape()

path = 'raw/game/'
games = os.listdir(path)

regions = ['NALCS', 'EULCS', 'CBLOL', 'LCK', 'LMS', 'TCL', 'OPL']

api = {}
api_light = {}
api_stats = {}

for region in regions:
	api[region] = []
	api_light[region] = []
	api_stats[region] = {}

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

	teams = get_teams(game_json)
	region = game_map[game.replace('.json', '')]

	item['teamNames'] = teams

	for team in teams:
		if team not in api_stats[region]:
			api_stats[region][team] = {
				'matchesPlayed': 0,
				'blueMatchesPlayed': 0,
				'redMatchesPlayed': 0,

				'firstBloods' : 0,
				'blueFirstBloods' : 0,
				'redFirstBloods' : 0,

				'totalWins' : 0,
				'blueWins' : 0,
				'redWins' : 0,
				
				'firstDragons' : 0,
				'blueFirstDragons' : 0,
				'redFirstDragons' : 0,
				
				'firstBarons' : 0,
				'blueFirstBarons' : 0,
				'redFirstBarons' : 0,
				
				'firstInhibs' : 0,
				'blueFirstInhibs' : 0,
				'redFirstInhibs' : 0,
				
				'firstTowers' : 0,
				'blueFirstTowers' : 0,
				'redFirstTowers' : 0,
				
				'firstHeralds' : 0,
				'blueFirstHeralds' : 0,
				'redFirstHeralds' : 0,
				
				'towerKills' : 0,
				'blueTowerKills' : 0,
				'redTowerKills' : 0,

				'inhibitorKills' : 0,
				'blueInhibitorKills' : 0,
				'redInhibitorKills' : 0,

				'dragonKills' : 0,
				'blueDragonKills' : 0,
				'redDragonKills' : 0,

				'baronKills' : 0,
				'blueBaronKills' : 0,
				'redBaronKills' : 0,

				'playersMatchesPlayed' : {},
				'bluePlayersMatchesPlayed' : {},
				'redPlayersMatchesPlayed' : {},

				'firstBloodPlayers' : {},
				'blueFirstBloodPlayers' : {},
				'redFirstBloodPlayers' : {},

				'firstBloodAssistPlayers' : {},
				'blueFirstBloodAssistPlayers' : {},
				'redFirstBloodAssistPlayers' : {},

				'firstDeathPlayers' : {},
				'blueFirstDeathPlayers' : {},
				'redFirstDeathPlayers' : {},

				'firstTowerPosition' : {
					'TOP_LANE' : 0,
					'BOT_LANE' : 0,
					'MID_LANE' : 0
				},
				'firstBlueTowerPosition' : {
					'TOP_LANE' : 0,
					'BOT_LANE' : 0,
					'MID_LANE' : 0
				},
				'firstRedTowerPosition' : {
					'TOP_LANE' : 0,
					'BOT_LANE' : 0,
					'MID_LANE' : 0
				},

				'firstEnemyTowerPosition' : {
					'TOP_LANE' : 0,
					'BOT_LANE' : 0,
					'MID_LANE' : 0
				},
				'firstBlueEnemyTowerPosition' : {
					'TOP_LANE' : 0,
					'BOT_LANE' : 0,
					'MID_LANE' : 0
				},
				'firstRedEnemyTowerPosition' : {
					'TOP_LANE' : 0,
					'BOT_LANE' : 0,
					'MID_LANE' : 0
				},

				'firstBloodPositions' : [],
				'firstDeathPositions' : [],
			}

		api_stats[region][team]['matchesPlayed'] += 1


	api_stats[region][teams[0]]['blueMatchesPlayed'] += 1
	api_stats[region][teams[1]]['redMatchesPlayed'] += 1






	item['time'] = game_json['gameCreation']
	item['patch'] = "{}.{}".format(game_json['gameVersion'].split('.')[0], game_json['gameVersion'].split('.')[1])
	item['duration'] = game_json['gameDuration']


	if(game_json['teams'][0]['firstBlood'] is True):
		item['firstBlood'] = 0
		api_stats[region][teams[0]]['firstBloods'] += 1
		api_stats[region][teams[0]]['blueFirstBloods'] += 1
	else:
		item['firstBlood'] = 1
		api_stats[region][teams[1]]['firstBloods'] += 1
		api_stats[region][teams[1]]['redFirstBloods'] += 1

	if(game_json['teams'][0]['win'] == 'Win'):
		item['win'] = 0
		api_stats[region][teams[0]]['totalWins'] += 1
		api_stats[region][teams[0]]['blueWins'] += 1
	else:
		item['win'] = 1
		api_stats[region][teams[1]]['totalWins'] += 1
		api_stats[region][teams[1]]['redWins'] += 1
		
	if(game_json['teams'][0]['firstTower'] is True):
		item['firstTower'] = 0
		api_stats[region][teams[0]]['firstTowers'] += 1
		api_stats[region][teams[0]]['blueFirstTowers'] += 1
	else:
		item['firstTower'] = 1
		api_stats[region][teams[1]]['firstTowers'] += 1
		api_stats[region][teams[1]]['redFirstTowers'] += 1
		
	if(game_json['teams'][0]['firstDragon'] is True):
		item['firstDragon'] = 0
		api_stats[region][teams[0]]['firstDragons'] += 1
		api_stats[region][teams[0]]['blueFirstDragons'] += 1
	else:
		item['firstDragon'] = 1
		api_stats[region][teams[1]]['firstDragons'] += 1
		api_stats[region][teams[1]]['redFirstDragons'] += 1
		
	if(game_json['teams'][0]['firstInhibitor'] is True):
		item['firstInhibitor'] = 0
		api_stats[region][teams[0]]['firstInhibs'] += 1
		api_stats[region][teams[0]]['blueFirstInhibs'] += 1
	else:
		item['firstInhibitor'] = 1
		api_stats[region][teams[1]]['firstInhibs'] += 1
		api_stats[region][teams[1]]['redFirstInhibs'] += 1
		
	if(game_json['teams'][0]['firstBaron'] is True):
		item['firstBaron'] = 0
		api_stats[region][teams[0]]['firstBarons'] += 1
		api_stats[region][teams[0]]['blueFirstBarons'] += 1
	elif(game_json['teams'][0]['firstBaron'] is True):
		item['firstBaron'] = 1
		api_stats[region][teams[1]]['firstBarons'] += 1
		api_stats[region][teams[1]]['redFirstBarons'] += 1
	else:
		item['firstBaron'] = False
		
	if(game_json['teams'][0]['firstRiftHerald'] is True):
		item['firstRiftHerald'] = 0
		api_stats[region][teams[0]]['firstHeralds'] += 1
		api_stats[region][teams[0]]['blueFirstHeralds'] += 1
	elif(game_json['teams'][1]['firstRiftHerald'] is True):
		item['firstRiftHerald'] = 1
		api_stats[region][teams[1]]['firstHeralds'] += 1
		api_stats[region][teams[1]]['redFirstHeralds'] += 1
	else:
		item['firstRiftHerald'] = False

	item['towerKills'] = [game_json['teams'][0]['towerKills'], game_json['teams'][1]['towerKills']]
	item['inhibitorKills'] = [game_json['teams'][0]['inhibitorKills'], game_json['teams'][1]['inhibitorKills']]
	item['baronKills'] = [game_json['teams'][0]['baronKills'], game_json['teams'][1]['baronKills']]
	item['dragonKills'] = [game_json['teams'][0]['dragonKills'], game_json['teams'][1]['dragonKills']]


	api_stats[region][teams[0]]['towerKills'] += game_json['teams'][0]['towerKills']
	api_stats[region][teams[1]]['towerKills'] += game_json['teams'][1]['towerKills']
	api_stats[region][teams[0]]['blueTowerKills'] += game_json['teams'][0]['towerKills']
	api_stats[region][teams[1]]['redTowerKills'] += game_json['teams'][1]['towerKills']


	api_stats[region][teams[0]]['dragonKills'] += game_json['teams'][0]['dragonKills']
	api_stats[region][teams[1]]['dragonKills'] += game_json['teams'][1]['dragonKills']
	api_stats[region][teams[0]]['blueDragonKills'] += game_json['teams'][0]['dragonKills']
	api_stats[region][teams[1]]['redDragonKills'] += game_json['teams'][1]['dragonKills']


	api_stats[region][teams[0]]['inhibitorKills'] += game_json['teams'][0]['inhibitorKills']
	api_stats[region][teams[1]]['inhibitorKills'] += game_json['teams'][1]['inhibitorKills']
	api_stats[region][teams[0]]['blueInhibitorKills'] += game_json['teams'][0]['inhibitorKills']
	api_stats[region][teams[1]]['redInhibitorKills'] += game_json['teams'][1]['inhibitorKills']


	api_stats[region][teams[0]]['baronKills'] += game_json['teams'][0]['baronKills']
	api_stats[region][teams[1]]['baronKills'] += game_json['teams'][1]['baronKills']
	api_stats[region][teams[0]]['blueBaronKills'] += game_json['teams'][0]['baronKills']
	api_stats[region][teams[1]]['redBaronKills'] += game_json['teams'][1]['baronKills']

	item['bans'] = []

	for team in game_json['teams']:
		bans = []
		for ban in team['bans']:
			bans.append(ban['championId'])

		item['bans'].append(bans)


	game_id = game_json['gameId']

	item['gameId'] = game_id

	ft_status = get_ft(timeline_json)
	if ft_status == False:
		continue
	ft_enemy = team_id(ft_status['team'])
	ft_team = opposite(ft_enemy)
	ft_position = ft_status['position']

	api_stats[region][teams[ft_team]]['firstTowerPosition'][ft_position] += 1
	api_stats[region][teams[ft_enemy]]['firstEnemyTowerPosition'][ft_position] += 1

	if ft_team == 0:
		api_stats[region][teams[ft_team]]['firstBlueTowerPosition'][ft_position] += 1
		api_stats[region][teams[ft_enemy]]['firstRedEnemyTowerPosition'][ft_position] += 1

	else:
		api_stats[region][teams[ft_team]]['firstRedTowerPosition'][ft_position] += 1
		api_stats[region][teams[ft_enemy]]['firstBlueEnemyTowerPosition'][ft_position] += 1



	item_light = item.copy()

	item['timeline'] = '/api/{}/games/{}/timeline.json'.format(region, game_id)
	item['timeline'] = '/api/{}/games/{}/timeline.json'.format(region, game_id)
	item['timeline'] = '/api/{}/games/{}/timeline.json'.format(region, game_id)

	item_light['players'] = []

	item['players'] = []


	player_count = 0

	fb_people = get_fb(timeline_json)

	for player in game_json['participants']:

		if player_count < 5:
			statsTeamNum = 0
		else:
			statsTeamNum = 1

		summonerName = game_json['participantIdentities'][player_count]['player']['summonerName']

		if summonerName not in api_stats[region][teams[statsTeamNum]]['playersMatchesPlayed']:
			api_stats[region][teams[statsTeamNum]]['playersMatchesPlayed'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['bluePlayersMatchesPlayed'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['redPlayersMatchesPlayed'][summonerName] = 0


			api_stats[region][teams[statsTeamNum]]['firstBloodPlayers'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['blueFirstBloodPlayers'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['redFirstBloodPlayers'][summonerName] = 0

			api_stats[region][teams[statsTeamNum]]['firstBloodAssistPlayers'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['blueFirstBloodAssistPlayers'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['redFirstBloodAssistPlayers'][summonerName] = 0

			api_stats[region][teams[statsTeamNum]]['firstDeathPlayers'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['blueFirstDeathPlayers'][summonerName] = 0
			api_stats[region][teams[statsTeamNum]]['redFirstDeathPlayers'][summonerName] = 0



		api_stats[region][teams[statsTeamNum]]['playersMatchesPlayed'][summonerName] += 1
		if statsTeamNum == 0:
			api_stats[region][teams[statsTeamNum]]['bluePlayersMatchesPlayed'][summonerName] += 0
		else:
			api_stats[region][teams[statsTeamNum]]['redPlayersMatchesPlayed'][summonerName] += 0


		p_stats = player['stats']
		player_item = {}
		light_item = {}
		player_item['name'] = summonerName
		light_item['name'] = summonerName
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


		if p_stats['firstBloodKill']:

			api_stats[region][teams[statsTeamNum]]['firstBloodPlayers'][summonerName] += 1
			if statsTeamNum == 0:
				api_stats[region][teams[statsTeamNum]]['blueFirstBloodPlayers'][summonerName] += 1
			else:
				api_stats[region][teams[statsTeamNum]]['redFirstBloodPlayers'][summonerName] += 1


		if player_count in fb_people['assistIds']:
			player_item['firstBloodAssist'] = True


			api_stats[region][teams[statsTeamNum]]['firstBloodAssistPlayers'][summonerName] += 1
			if statsTeamNum == 0:
				api_stats[region][teams[statsTeamNum]]['blueFirstBloodAssistPlayers'][summonerName] += 1
			else:
				api_stats[region][teams[statsTeamNum]]['redFirstBloodAssistPlayers'][summonerName] += 1

		else:
			player_item['firstBloodAssist'] = False
		
		if player_count in fb_people['killerIds']:
			light_item['firstBloodInvolve'] = True
		else:
			light_item['firstBloodInvolve'] = False
		
		if player_count == fb_people['victimId']:
			player_item['firstDeath'] = True
			light_item['firstDeath'] = True


			api_stats[region][teams[statsTeamNum]]['firstDeathPlayers'][summonerName] += 1
			if statsTeamNum == 0:
				api_stats[region][teams[statsTeamNum]]['blueFirstDeathPlayers'][summonerName] += 1
			else:
				api_stats[region][teams[statsTeamNum]]['redFirstDeathPlayers'][summonerName] += 1

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

	api[region].append(item)
	api_light[region].append(item_light)


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
	region_sorted = sorted(api[region], key=lambda k: k['time'], reverse=True)
	f = open('api/{}/full.json'.format(region), 'w')
	f.write(json.dumps(region_sorted))
	f.close()

for region in api_light:
	region_sorted = sorted(api_light[region], key=lambda k: k['time'], reverse=True)
	f = open('api/{}/light.json'.format(region), 'w')
	f.write(json.dumps(region_sorted))
	f.close()


for region in api_stats:
	f = open('api/{}/stats.json'.format(region), 'w')
	f.write(json.dumps(api_stats[region]))
	f.close()
















## Build scheduled api

schedule = open('raw/scheduled_matches.json', 'r')
schedule = schedule.read()
schedule_json = json.loads(schedule)

sorted_array = sorted(
	schedule_json,
	key=lambda x: datetime.datetime.strptime(x['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z'), reverse=False
)

new_array = []
for item in sorted_array:
	item['datetime'] = datetime.datetime.strptime(item['datetime'], "%Y-%m-%dT%H:%M:%S.%f%z").timestamp()
	if item['datetime'] > int(datetime.datetime.now().timestamp()):
		new_array.append(item)

f = open('api/schedule.json', 'w')
f.write(json.dumps(new_array))
f.close()