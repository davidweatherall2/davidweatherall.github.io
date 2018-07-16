export default function config(state = [], action) {
  switch (action.type) {
	case 'UPDATE_REGION_TEXT':
		return {
			...state,
			activeRegion : action.text
		}

	default:
		return state
	}
}
