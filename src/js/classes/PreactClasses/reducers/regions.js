export default function regions(state = [], action) {
  switch (action.type) {
  	case 'UPDATE_REGION_PENDING':
  		return {
  			...state,
  			loading: true,
  		}
	case 'UPDATE_REGION_FULFILLED':
		return {
			...state,
			regionData : action.payload,
			loading: false
		}

	default:
		return state
	}
}
