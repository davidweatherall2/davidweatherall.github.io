import os



import firstBlood
import teamFB
import diePos


firstBloodString = firstBlood.go()
teamFBString = teamFB.go()
diePosString = diePos.go()

firstBloodTemplate = open('templates/firstBlood.html', 'r')
firstBloodTemplate = firstBloodTemplate.read()


FBHTML = firstBloodTemplate.replace('posFB', diePosString).replace('teamFB', teamFBString).replace('champFB', firstBloodString)

f = open('firstBlood.html', 'w')
f.write(FBHTML)
f.close()


import firstDragon
import teamFD


firstDragonString = firstDragon.go()
teamFDString = teamFD.go()

firstDragonTemplate = open('templates/firstDragon.html', 'r')
firstDragonTemplate = firstDragonTemplate.read()


FDHTML = firstDragonTemplate.replace('teamDrake', teamFDString).replace('champDrake', firstDragonString)

f = open('firstDragon.html', 'w')
f.write(FDHTML)
f.close()


import teamFT


teamFTString = teamFT.go()

firstTowerTemplate = open('templates/firstTower.html', 'r')
firstTowerTemplate = firstTowerTemplate.read()


FTHTML = firstTowerTemplate.replace('firstTower', teamFTString)

f = open('firstTower.html', 'w')
f.write(FTHTML)
f.close()