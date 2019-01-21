export default function stats(state = {loading: 0}, action) {
	switch (action.type) {
		case 'FETCH_STATS_PENDING':
			return {
				...state,
				loading: state.loading + 1,
			}
		case 'FETCH_STATS_FULFILLED':
			return {
				...state,
				loading: state.loading - 1,
				stats : {
					...state.stats,
					[action.meta] : action.payload
				}
			}

		case 'SET_ALL_PATCHES':
			return {
				...state,
				activePatches: action.patches
			}

		case 'SET_ALL_REGIONS':
			return {
				...state,
				activeRegions: action.regions
			}

		case 'SET_ALL_VARIABLES':
			return {
				...state,
				activeVariables: action.variables
			}

		case 'SET_MINPLAYED':
			return {
				...state,
				minPlayed: action.minPlayed
			}

		default:
			return state
		}
}
