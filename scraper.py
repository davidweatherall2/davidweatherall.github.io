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
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291426?gameHash=83c7c51530ea074e',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291406?gameHash=5220923eb35c42c6',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1271104?gameHash=20332c0660059ff8',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1271091?gameHash=d31d642fb546e43e',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270874?gameHash=d22ded3c46abb9b8',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270866?gameHash=ff717fb95b6a5131',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270857?gameHash=33123e45a2046e53',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270837?gameHash=66974bf071ea38eb',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270607?gameHash=e51fbfc18213ad87',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270592?gameHash=7fa61eb33bd32bfc',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270576?gameHash=a054564b4232b1fc',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT02/1270555?gameHash=48cc4673e669584b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291442?gameHash=28f7b485f710168f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291458?gameHash=49cc14d02ccd0674',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291748?gameHash=7a3c085cf703d7bd',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291748?gameHash=7a3c085cf703d7bd',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291812?gameHash=e540d208bbc69bb3',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291835?gameHash=a75ab48a22470022',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1292345?gameHash=6f86444cce429244',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1292354?gameHash=79845cdf9a6e88db',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304356?gameHash=fc584c5143087c0b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304374?gameHash=175112ba57cbce5e',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304391?gameHash=72ad86120a14eb54',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304391?gameHash=72ad86120a14eb54',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304700?gameHash=b50bc9265ac35f9f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304739?gameHash=b80bb99cbce5bd71',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304768?gameHash=6ed6e9d7108f27e0',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304785?gameHash=13054e8f14fcae76',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1295383?gameHash=072ee1028f03f4c9',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1295402?gameHash=560c984fc1ba1168'
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
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT05/1390161?gameHash=c77bd1d7e54d4801',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130210?gameHash=91c7b22cded939ff',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130221?gameHash=a8580ee66ffbb525',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120607?gameHash=f4b702f689f87c90',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120622?gameHash=c87f08d06f392f3f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120629?gameHash=6b39ee929c2ebc47',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120638?gameHash=eb17c2013b9ee77d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120649?gameHash=aab6f321110ef3ed',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120705?gameHash=a6532b3af6accaf2',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1120711?gameHash=79659ad2d107f0d9',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130676?gameHash=f3e34e47140460ff',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130696?gameHash=532d412c3f38c0c5',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130709?gameHash=1491ee8228ad66ec'
        ],
        'CBLOL': [
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301305?gameHash=3f8d664b3b988446',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301290?gameHash=31ce80069fdbc873',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301270?gameHash=5b3babb5d392d78d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301262?gameHash=c594a9a52f46cc50',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301300?gameHash=3127f0ec9202fd77',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301287?gameHash=23b9e19a23f095d0',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301284?gameHash=279c3dcca9f99391',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301276?gameHash=c4ba9f59291ce4ab',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301251?gameHash=0717ecad97ae838d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301242?gameHash=d80454f4f436d4e5',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301228?gameHash=94d20f2c8f65ede5',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT03/1301223?gameHash=48cdb3f62492e606',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301262?gameHash=c594a9a52f46cc50',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291682?gameHash=a8f2c06d04117279',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291682?gameHash=a8f2c06d04117279',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291651?gameHash=5ec1b3473060dfd2',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291682?gameHash=a8f2c06d04117279',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291703?gameHash=cfb2d078f289825c',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1291737?gameHash=cf67a15df43c2bb2',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304264?gameHash=f5e69d8e2f6bae5e',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304282?gameHash=f9ea42cec97e930f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304302?gameHash=617f3af3e7d2ab4d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304324?gameHash=01bf1a7465a412ba',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304609?gameHash=7a5a6778a7074f09',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304635?gameHash=4cda5972cf8dd6bd',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304671?gameHash=67e29eccbbc8f667',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304691?gameHash=1572b2bb76b73da1'
        ],
        'OPL': [
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301183?gameHash=396641afdcdd99d9',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301169?gameHash=5d816e6d30d2b659',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301159?gameHash=9a7726176fdabfde',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1301128?gameHash=fcbd2630c0faec49',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1300964?gameHash=e49071347c975500',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1300956?gameHash=657d224d4a32aeb1',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1300941?gameHash=f1c97f8b358c25c3',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1300935?gameHash=67fa5d5bc78168f8',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303478?gameHash=8df5ef3d826ad211',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303478?gameHash=8df5ef3d826ad211',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303533?gameHash=3a712b015a672d8d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303533?gameHash=3a712b015a672d8d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303974?gameHash=28f566b2fa35a32a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303974?gameHash=28f566b2fa35a32a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303974?gameHash=28f566b2fa35a32a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303974?gameHash=28f566b2fa35a32a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303478?gameHash=8df5ef3d826ad211',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303509?gameHash=d0849b1ba82d4826',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303533?gameHash=3a712b015a672d8d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303581?gameHash=2bf61273d44c302f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303974?gameHash=28f566b2fa35a32a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1303999?gameHash=619d5a2d571a1b01',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304032?gameHash=30e5b243a407326c',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304075?gameHash=a3d0d6acfb8b92f1'
        ],
        'TCL': [
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130182?gameHash=ccb50f6e86e4c3df',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130177?gameHash=1f92cbefd9a965e0',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130166?gameHash=1cff679b64acb047',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130153?gameHash=00a7861ac0a23aef',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130229?gameHash=1489421028163983',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130243?gameHash=5491d110de253089',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130253?gameHash=f8e39ae785d11c0c',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130264?gameHash=a98718c088ce663c',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130611?gameHash=a099e1df984018a1',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130611?gameHash=a099e1df984018a1',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130630?gameHash=b1b183ad3374db06',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130643?gameHash=15bb88ac79a622a1',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130723?gameHash=c5113e7f25839c2e',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130734?gameHash=88de231d14ea4b07',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130739?gameHash=4ddb470392dd9248',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT04/1130748?gameHash=8f544ac73c53a606'
        ],
        'LCK': [
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1302595?gameHash=314d39ea940b354f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1302595?gameHash=314d39ea940b354f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1302595?gameHash=314d39ea940b354f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1302651?gameHash=555c7cd73dff952d',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1292960?gameHash=e3ce73c142354517',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1292974?gameHash=ab79b8f6f354bc0b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1292974?gameHash=ab79b8f6f354bc0b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1292974?gameHash=ab79b8f6f354bc0b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293370?gameHash=8a70038d2eba61de',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293885?gameHash=1ffaffd98da7e806',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293899?gameHash=aa93723cded96f3b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293909?gameHash=245dbdf428788434',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293929?gameHash=f4b6f53e68bbbc86',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293950?gameHash=e2f3a99412844d36',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1293964?gameHash=10bd6ec239231196',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304035?gameHash=f8e3702e77f87cc7',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304079?gameHash=8339c23d8d925f8b',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1304122?gameHash=bf7e80351592ce98',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294417?gameHash=746905a629b8f374',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294710?gameHash=0d01dd80aa803997',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294725?gameHash=3ae63821918e2b43',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294738?gameHash=5fd20a0eec2c86f4',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294750?gameHash=fa9335e1a61165a5',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294784?gameHash=7d1bf4754cda9b46',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1294813?gameHash=51f4579db6e7049f',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1305569?gameHash=f31c49ce4aee06a3',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1305601?gameHash=71bed3e1854feff3',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1305601?gameHash=71bed3e1854feff3',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1305624?gameHash=399f9a58b6057d3a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1295834?gameHash=34d00b8ff1d7fc4a',
            'http://matchhistory.na.leagueoflegends.com/en/#match-details/ESPORTSTMNT01/1295840?gameHash=c3ab9745c9b9659e'
        ]
    }
    data_path = 'raw/'

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
        print('Delete previous data? y/n')
        if(input() == 'y'):
            self.deleteData()

        scraped_files = os.listdir('{}game'.format(self.data_path))
        
        for region in self.regions:
            for match_history_link in self.regions[region]:
                [game_id, game_hash, region_code] = self.getInfoFromUrl(match_history_link)
                if '{}.json'.format(game_id) in scraped_files:
                    continue
                
                self.scrapeGame(game_id, game_hash, region, region_code)

        self.generateGameMap()

        return

    def generateGameMap(self):

        game_map = {}

        for region in self.regions:
            for match_history_link in self.regions[region]:
                [game_id, game_hash, region_code] = self.getInfoFromUrl(match_history_link)

                game_map[game_id] = region
        
        f = open('{}game_map.json'.format(self.data_path), 'w')
        f.write(json.dumps(game_map))
        f.close()

    def scrapeGame(self, game_id, game_hash, region, region_code):
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