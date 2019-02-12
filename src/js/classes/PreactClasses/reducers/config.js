export default function config(state = [], action) {
  switch (action.type) {
	case 'UPDATE_REGION_TEXT':
		return {
			...state,
			activeRegion : action.text,
			team1 : false,
			team2 : false,
		}
	case 'SET_APP_TYPE':
		return {
			...state,
			appType: action.appType
		}
	case 'UPDATE_TEAM1':
		return {
			...state,
			team1 : action.text
		}
	case 'UPDATE_TEAM2':
		return {
			...state,
			team2 : action.text
		}

	case 'UPDATE_TEAMS':
		return {
			...state,
			newTeam1: action.team1,
			newTeam2: action.team2,
			newRegion: action.region
		}

	case 'RESET_NEW_REGION':
		return {
			...state,
			newRegion: false
		}

	case 'RESET_NEW_TEAMS':
		return {
			...state,
			newTeam1: false,
			newTeam2: false,
		}

	default:
		return state
	}
}
