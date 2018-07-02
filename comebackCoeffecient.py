
import urllib.request
import os
import json
import math


def champidtoname(id):	
	champdict = {'145' : 'KaiSa', '555' : 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac'}
	return champdict[str(id)]



y = 0
z = 0
a = {}
b = {}

time = 30
differencemax = 4000
differencemin = 0



gamesArray = []

for filename in os.listdir('game'):
	gamesArray.append(filename)

i = 0

lenArray = len(gamesArray)

while i < lenArray:

	print("Progress: {} of total games {}".format(str(i), str(lenArray)))
	gameId = gamesArray[i]

	if(os.path.isfile('jsons/game/' + gameId) and os.path.isfile('jsons/timeline/' + gameId)):


		file = 'jsons/game/' + gameId
		f = open(file, 'rb')
		text = f.read()
		encjson = json.loads(text.decode())

		if(encjson['teams'][0]['win']=='Win'):
			winner = 0
		else:
			winner = 1
		f.close()


		file = 'jsons/timeline/' + gameId
		f = open(file, 'rb')
		text = f.read().decode()
		encjson = json.loads(text)
		maxlen = len(encjson['frames'])
		if(maxlen>time):
		
			team1gold = encjson['frames'][time]['participantFrames']['1']['totalGold'] + encjson['frames'][time]['participantFrames']['2']['totalGold'] + encjson['frames'][time]['participantFrames']['3']['totalGold'] + encjson['frames'][time]['participantFrames']['4']['totalGold'] + encjson['frames'][time]['participantFrames']['5']['totalGold']
			team2gold = encjson['frames'][time]['participantFrames']['6']['totalGold'] + encjson['frames'][time]['participantFrames']['7']['totalGold'] + encjson['frames'][time]['participantFrames']['8']['totalGold'] + encjson['frames'][time]['participantFrames']['9']['totalGold'] + encjson['frames'][time]['participantFrames']['10']['totalGold']
			
			
			file = 'jsons/game/' + gameId
			f = open(file, 'rb')
			text = f.read().decode()
			encjson = json.loads(text)
			
			champsingame = []
			ji = 0	
			while(ji<10):
				if(encjson['participants'][ji]['championId'] not in a):
					print('here')
					a[encjson['participants'][ji]['championId']] = 0
					b[encjson['participants'][ji]['championId']] = 0
				champsingame.append(encjson['participants'][ji]['championId'])
				ji+=1
				
			if team1gold > (team2gold - differencemax) and (team2gold - differencemin) > team1gold:
				ji = 0
				while(ji<5):
					a[encjson['participants'][ji]['championId']] +=1
					ji+=1
				if winner == 0:
					ji = 0
					while(ji<5):
						b[encjson['participants'][ji]['championId']] +=1
						ji+=1
			

			if team2gold > (team1gold - differencemax) and (team1gold  - differencemin) > team2gold:
				ji = 5
				while(ji<10):
					a[encjson['participants'][ji]['championId']] +=1
					ji+=1
				if winner == 1:
					ji = 5
					while(ji<10):
						b[encjson['participants'][ji]['championId']] +=1
						ji+=1
		f.close()

	i+=1

z = {}
for eachteamname in b:
	if(a[eachteamname]==0):
		a[eachteamname] = 1
	z[eachteamname] = round((b[eachteamname]/a[eachteamname])*100)
q = sorted(z, key=z.get, reverse=True)
for eachteamname in q:
	if a[eachteamname] > 0:
		print(champidtoname(eachteamname) + " wins in " + str(z[eachteamname]) + "% of games when between " + str(differencemin) + " and " + str(differencemax) + " gold behind. Sample Size: " + str(a[eachteamname]))
