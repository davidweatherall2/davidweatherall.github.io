export default function config(state = [], action) {
  switch (action.type) {
	case 'UPDATE_REGION_TEXT':
		return {
			...state,
			activeRegion : action.text,
			team1 : false,
			team2 : false,
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
			team1: action.team1,
			team2: action.team2,
			activeRegion: action.region
		}

	default:
		return state
	}
}
