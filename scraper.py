import json
import os
import urllib.request
import requests
import time
import datetime
import csv
import ast
import re

class LOLScraper:

    #Attributes
    regions = {
        'NALCS': [

        ],
        'EULCS': [
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130201?gameHash=3d2aa031c17d90ae',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130196?gameHash=31553f5bb6ba4420',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130193?gameHash=0995997660a65721',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120173?gameHash=b0bffc01c9d5acb8',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120155?gameHash=54dd5c01a9d8817e',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120150?gameHash=ab21332050c53eac',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120145?gameHash=e191a9fe9ad91551',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120126?gameHash=ce786a33e52b4435',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390263?gameHash=11c29bbfef59b453',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390257?gameHash=5f6a9d222f02b916',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390249?gameHash=840a42a71eb33082',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390241?gameHash=ce20c3ad794a4e79',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390233?gameHash=5f30125d96d86d60',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390213?gameHash=046907e6a70adc65',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390202?gameHash=2c584b319e1509d9',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390196?gameHash=4bc08e5d10033415',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390170?gameHash=686d45795a6ea625',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390161?gameHash=c77bd1d7e54d4801'
        ],
        'CBLOL': [],
        'TCL': []
    }
    data_path = 'raw/'
    game_map = {}

    def deleteData(self):
        games_path = '{}game'.format(self.data_path)
        timelines_path = '{}timeline'.format(self.data_path)
        for f in os.listdir(games_path):
            os.remove(os.path.join(games_path, f))
        
        for f in os.listdir(timelines_path):
            os.remove(os.path.join(timelines_path, f))

    def getInfoFromUrl(self, url):
        print(url)
        result = re.search('match-details/(.*)/', url)
        print(result)
        region_code = result.group(1)

        result = re.search("{}/(.*)\?gameHash".format(region_code), url)
        game_id = result.group(1)
        print(game_id)

        game_hash = url.split("?gameHash=")[1]

        return [game_id, game_hash, region_code]


    def scrapeGames(self):
        self.deleteData()
        scraped_files = os.listdir('{}game'.format(self.data_path))
        
        for region in self.regions:
            for match_history_link in self.regions[region]:
                [game_id, game_hash, region_code] = self.getInfoFromUrl(match_history_link)
                if '{}.json'.format(game_id) in scraped_files:
                    continue
                
                self.scrapeGame(game_id, game_hash, region, region_code)

        f = open('{}game_map.json'.format(self.data_path), 'w')
        f.write(json.dumps(self.game_map))
        f.close()

        return

    def scrapeGame(self, game_id, game_hash, region, region_code):
        self.game_map[game_id] = region
        url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}?gameHash={}'.format(region_code, game_id, game_hash)
        json_raw = self.getJson(url_string)

        if json_raw == '':
            print('no match found {}'.format(game_id))
            return False

        print(json_raw)

        json_file = open(self.data_path + 'game/{}.json'.format(str(game_id)), 'wb')
        json_file.write(json_raw.encode('utf-8'))
        json_file.close

        url_string = 'https://acs.leagueoflegends.com/v1/stats/game/{}/{}/timeline?gameHash={}'.format(region_code, game_id, game_hash)
        json_raw = self.getJson(url_string)
        if json_raw == False:
            return False

        json_file = open(self.data_path + 'timeline/{}.json'.format(str(game_id)), 'wb')
        json_file.write(json_raw.encode('utf-8'))
        json_file.close


    def getJson(self, url_string):
        print('getting json {}'.format(url_string))
        cookies = {
            'id_token': 'eyJraWQiOiJzMSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1OGRlODExZS1jODY4LTVhMjUtYmZiNy05YjJjNWFkOWNiNDEiLCJjb3VudHJ5IjoiZ2JyIiwicGxheWVyX3Bsb2NhbGUiOiJlbi1VUyIsImFtciI6WyJwYXNzd29yZCJdLCJpc3MiOiJodHRwczpcL1wvYXV0aC5yaW90Z2FtZXMuY29tIiwibG9sIjpbeyJjdWlkIjoyOTI1MzM5NywiY3BpZCI6IkVVVzEiLCJ1aWQiOjI5MjUzMzk3LCJ1bmFtZSI6ImR3ZXZ6IiwicHRyaWQiOm51bGwsInBpZCI6IkVVVzEiLCJzdGF0ZSI6IkVOQUJMRUQifV0sImxvY2FsZSI6ImVuX1VTIiwiYXVkIjoicnNvLXdlYi1jbGllbnQtcHJvZCIsImFjciI6InVybjpyaW90OmJyb256ZSIsInBsYXllcl9sb2NhbGUiOiJlbi1VUyIsImV4cCI6MTU4MDcyNDQwNywiaWF0IjoxNTgwNjM4MDA3LCJhY2N0Ijp7ImdhbWVfbmFtZSI6InlvdW5nIGtoYW4iLCJ0YWdfbGluZSI6IkVVVyJ9LCJqdGkiOiIxMlkzdVpVbmVjNCIsImxvZ2luX2NvdW50cnkiOiJnYnIifQ.ThbOBPpZhOL9udzqpVu4AXCs94BTLmDHvbIdrfdWkcnBd5q6GnT_u8kcLl1EcIYLt5nGER82ZcOZNxutsdf45UNnpVVKVaCSTvdnDS1JLtaK0Hl5W-yPiIMiOVmdXlLI5rr_gcPINsaQ78t5VDB_UzMSY1aqi0ABe8VWkA6VSQs'
        }
        req = requests.get(url_string, 
            headers={'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"},
            cookies=cookies
        )

        if req.status_code == 200:
            json_raw = req.text
        else:
            print(req.status_code)
            return False

        return json_raw

    def sortMatches(self, matches):
        return sorted(matches, key=lambda k: k['match_time'])

    def createTemplate(self):
        self.deleteData()

        regions_map = {}
        data_map = {}

        for region in self.regions:
            region_dict = self.regions[region]
            regions_map[region] = self.getRegionTournaments(region_dict)

        for region in regions_map:
            matches = self.getMatchesFromRegionData(region, regions_map[region])
            matches = self.sortMatches(matches)
            data_map[region] = matches

        f = open(self.data_path + 'data_map.json', 'w')
        f.write(json.dumps(data_map))
        f.close()

        self.convertTemplateToCSV()

    def getLoadedMatchObj(self, match_object):
        try:
            json_obj = json.loads(match_object)
        except json.decoder.JSONDecodeError as e:
            json_eval = ast.literal_eval(match_object)
            json_string = json.dumps(json_eval)
            json_obj = json.loads(json_string)
        
        return json_obj

    def updateTemplate(self):
        f = open('{}data_map.json'.format(self.data_path), 'r', encoding="utf-8")
        text = f.read()
        match_infos = json.loads(text)
        f.close()
        
        now_timestamp = int(datetime.datetime.now().timestamp())

        for region in match_infos:
            region_matches = match_infos[region]
            for match_index, match in enumerate(region_matches):
                match_timestamp = int(datetime.datetime.strptime(match['match_time'], '%Y-%m-%dT%H:%M:%S.%f%z').timestamp())

                if now_timestamp > match_timestamp and len(match['game_infos']) == 0:
                    loaded_match_obj = self.getLoadedMatchObj(match['match_object'])
                    
                    match_infos[region][match_index] = self.getMatchData(match['match_id'], match['tournament_id'], loaded_match_obj)

        f = open(self.data_path + 'data_map.json', 'w')
        f.write(json.dumps(match_infos))
        f.close()

    def getMatchesFromRegionData(self, region, region_data):
        matches_array = []

        tournaments_array = region_data['tournaments_array']
        json_raw = region_data['json_raw']
        json_obj = region_data['json_obj']
        

        for tournament_key in tournaments_array:

            tournament_key = int(tournament_key)
            tournament_id = json_obj['highlanderTournaments'][tournament_key]['id']

            brackets = json_obj['highlanderTournaments'][tournament_key]['brackets']

            for bracket in brackets:

                matches = brackets[bracket]['matches']

                for match_id in matches:
                    
                    match_object = matches[match_id]
                    match_data = self.getMatchData(match_id, tournament_id, match_object)
                    if match_data:
                        matches_array.append(match_data)

        return matches_array

    def getMatchData(self, match_id, tournament_id, match_object):

        match_data = {}
        
        match_url_string = 'https://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId={}&matchId={}'.format(tournament_id, match_id)
        match_json_raw = self.getJson(match_url_string)
        match_json = json.loads(match_json_raw)

        if len(match_json['scheduleItems']) > 0:
            match_data['match_time'] = match_json['scheduleItems'][0]['scheduledTime']
        else:
            return False

        if len(match_json['teams']) == 2:
            match_data['team1'] = match_json['teams'][0]['name']
            match_data['team1acro'] = match_json['teams'][0]['acronym']
            match_data['team2'] = match_json['teams'][1]['name']
            match_data['team2acro'] = match_json['teams'][1]['acronym']

        game_infos = []

        for game in match_json['gameIdMappings']:
            game_hash = game['gameHash']
            game_id_hash = game['id']

            print(match_object)
            print(type(match_object))

            if 'gameId' not in match_object['games'][game_id_hash]:
                continue

            game_id = match_object['games'][game_id_hash]['gameId'].replace('\t', '')

            game_infos.append({
                'game_id' : game_id,
                'game_hash' : game_hash
            })

        match_data['game_infos'] = game_infos
        match_data['match_url'] = match_url_string

        match_data['match_object'] = json.dumps(match_object)
        match_data['match_id'] = match_id
        match_data['tournament_id'] = tournament_id

        return match_data

    def convertTemplateToCSV(self):
        with open('{}data_map.csv'.format(self.data_path), 'w', newline='', encoding="utf-8") as csvfile:
            fieldnames = ['region', 'match_time', 'team1', 'team1acro', 'team2', 'team2acro', 'game_ids', 'game_hashes', 'match_url', 'match_id', 'tournament_id', 'match_object']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

            f = open('{}data_map.json'.format(self.data_path), 'r', encoding="utf-8")
            text = f.read()
            match_infos = json.loads(text)
            
            for region in match_infos:
                for match in match_infos[region]:
                    game_ids = []
                    game_hashes = []

                    for game_info in match['game_infos']:
                        game_ids.append(game_info['game_id'])
                        game_hashes.append(game_info['game_hash'])

                    game_ids_string = '-'.join(game_ids)
                    game_hashes_string = '-'.join(game_hashes) 
                    
                    match['game_ids'] = game_ids_string
                    match['game_hashes'] = game_hashes_string
                    match['region'] = region

                    match.pop('game_infos', None)
                    writer.writerow(match)

                writer.writerow({})

    
    def convertCSVToTemplate(self):
        data_obj = {}
        with open('{}data_map.csv'.format(self.data_path), newline='') as csvfile:
            data_rows = csv.DictReader(csvfile)
            for row in data_rows:
                if row['region']:
                    if row['region'] not in data_obj:
                        data_obj[row['region']] = []
                    
                    game_infos = []

                    if row['game_ids']:
                        game_ids = row['game_ids'].split('-')
                        game_hashes = row['game_hashes'].split('-')

                        for game_index, game_id in enumerate(game_ids):
                            game_infos.append({
                                'game_id' : game_id,
                                'game_hash' : game_hashes[game_index]
                            })

                    data_obj[row['region']].append({
                        'match_time' : row['match_time'],
                        'team1' : row['team1'],
                        'team1acro' : row['team1acro'],
                        'team2' : row['team2'],
                        'team2acro' : row['team2acro'],
                        'game_infos' : game_infos,
                        'match_url' : row['match_url'],
                        'match_id' : row['match_id'],
                        'tournament_id' : row['tournament_id'],
                        'match_object' : row['match_object'],
                        
                    })

        f = open(self.data_path + 'data_map.json', 'w')
        f.write(json.dumps(data_obj))
        f.close()




    def getRegionTournaments(self, region_dict):
        json_raw = self.getJson(region_dict['url'])
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

        return {
            'region_dict' : region_dict,
            'tournaments_array': tournaments_array,
            'json_raw' : json_raw,
            'json_obj' : json_obj
        }