export default function regions(state = [], action) {
  switch (action.type) {
  	case 'UPDATE_REGION_PENDING':
  		return {
  			...state,
  			regionLoading: true,
  		}
	case 'UPDATE_REGION_FULFILLED':
		return {
			...state,
			regionData : action.payload,
			regionLoading: false
		}
	case 'UPDATE_REGION_STATS_PENDING':
  		return {
  			...state,
  			statsLoading: true,
  		}
	case 'UPDATE_REGION_STATS_FULFILLED':
		return {
			...state,
			regionStats : action.payload,
			statsLoading: false
		}

	default:
		return state
	}
}
