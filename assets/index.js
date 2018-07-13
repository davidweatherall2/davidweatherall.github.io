'use strict';

var _LeagueReactApp = require('classes/LeagueReactApp');

var xhello = function xhello(name) {
  return 'hello ' + name;
};

var asdf = document.querySelector('.js-league-app');
if (asdf) {
  new _LeagueReactApp.LeagueReactApp();
}