import urllib.request
import os
import json
import math


def go():

	y = 0
	z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	positions = ['top', 'jungle', 'mid', 'adc', 'support', 'top', 'jungle', 'mid', 'adc', 'support']

	htmlString = ''


	path = 'jsons/game/'
	games = os.listdir(path)

	for game in games:

		y += 1

		file = 'jsons/game/' + game

		f = open(file, 'r')
		text = f.read()
		encjson = json.loads(text)

		timeFile = 'jsons/timeline/' + game

		timeF = open(timeFile, 'r')
		timeText = timeF.read()
		timeEncjson = json.loads(timeText)


		i = 0
		while i < len(timeEncjson['frames']):
			ii = 0
			while ii < len(timeEncjson['frames'][i]['events']):
				if(timeEncjson['frames'][i]['events'][ii]['type'] == 'CHAMPION_KILL'):


					deadPos = timeEncjson['frames'][i]['events'][ii]['victimId'] - 1
					print(deadPos)
					z[deadPos] += 1

					i = len(timeEncjson['frames']) - 1
					ii = len(timeEncjson['frames'][i]['events'])
				else:
					ii +=1
			i +=1


	i = 0
	while(i < 5):
		htmlString += "<br>Blue side " + positions[i] + " dies to first blood " + str(round((z[i]/y)*100)) + "% of the time"
		i+=1
	while(i < 10):
		htmlString += "<br>Red side " + positions[i] + " dies to first blood " + str(round((z[i]/y)*100)) + "% of the time"
		i+=1


	htmlString += '<br>'

	i = 0
	while(i < 5):
		htmlString += "<br>" + positions[i] + " dies to first blood " + str(round(((z[i] + z[i+5])/y)*100)) + "% of the time"
		i+=1

	return htmlString