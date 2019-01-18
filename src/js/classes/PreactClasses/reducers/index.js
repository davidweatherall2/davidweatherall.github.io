import { combineReducers } from 'redux'
import regions from './regions'
import config from './config'
import matches from './matches'
import stats from './stats'

export default combineReducers({
	regions,
	config,
	matches,
	stats
})
