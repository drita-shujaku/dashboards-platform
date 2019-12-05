import ACTION_TYPES from 'reducers/content/ContentActionTypes'

const initialState = {
  content: []
}

const content = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
    case ACTION_TYPES.UPDATE_CONTENT:
      return action.data.content
    case ACTION_TYPES.DELETE_CONTENT:
      const { id } = action.data.content
      return state.filter(content => content.id !== id)
    default:
      return state
  }
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return {...action.data, content: content(state.content, action)}
    case ACTION_TYPES.INVALIDATE_CONTENT:
      return initialState
    default:
      console.log('default state', state)
      return {...state, content: content(state.content, action)}
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
  board: board(state.board, action),
  request: request(state.request, action),
  change: detectChange(state.change, action)
})


export default contentReducer