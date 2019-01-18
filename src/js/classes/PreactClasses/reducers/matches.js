export default function matches(state = [], action) {
    switch (action.type) {
      case 'GET_MATCHES_PENDING':
          return {
              ...state,
              loading: true,
          }
      case 'GET_MATCHES_FULFILLED':
          return {
              ...state,
              loading : false,
              matches: action.payload
          }
  
      default:
          return state
      }
  }
  