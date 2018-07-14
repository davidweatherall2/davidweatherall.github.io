export default function config(state = [], action) {
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
