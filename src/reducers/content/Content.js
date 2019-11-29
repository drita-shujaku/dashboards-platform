import ACTION_TYPES from 'reducers/content/ContentActionTypes'

const initialState = []

const content = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return action.data
    case ACTION_TYPES.UPDATE_CONTENT:
      const { item } = action
      const found = state.find(content => content.id === item.id)
      if (!found) {
        return [ ...state, item ]
      }
      return state.map(content => {
        if (content.id === item.id) {
          return item
        }
        return content
      })
    case ACTION_TYPES.DELETE_CONTENT:
      return state.filter(content => content.id !== action.item.id)
    case ACTION_TYPES.INVALIDATE_CONTENT:
      return initialState
    default:
      return state
  }
}

const defaultRequestState = {
  isLoading: false,
  response: {
    code: 200,
    message: 'Last request succeeded!'
  }
}

const request = (state = defaultRequestState, action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return defaultRequestState
    case ACTION_TYPES.REQUEST_CONTENT:
      return {
        ...defaultRequestState,
        isLoading: true
      }
    default:
      return state
  }
}

export const detectChange = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_CONTENT:
    case ACTION_TYPES.DELETE_CONTENT:
      return true
    default:
      return false
  }
}


const contentReducer = (state = {}, action) => ({
  items: content(state.items, action),
  request: request(state.request, action),
  change: detectChange(state.change, action)
})


export default contentReducer