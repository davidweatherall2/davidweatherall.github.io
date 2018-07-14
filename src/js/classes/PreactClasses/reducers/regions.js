export default function regions(state = [], action) {
  switch (action.type) {
	case 'UPDATE_REGION':
		return {
			...state,
			activeRegion : action.text
		}

	default:
		return state
	}
}
