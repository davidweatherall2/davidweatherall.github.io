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

		default:
			return state
		}
}
