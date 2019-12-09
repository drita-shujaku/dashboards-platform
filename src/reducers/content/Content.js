import ACTION_TYPES from 'reducers/content/ContentActionTypes'
import uuid from 'uuid'
import { GRAPH_TYPE } from 'Constants'

const initialState = {
  content: []
}
const widgetFromType = (type) => {
  switch (type) {
    case GRAPH_TYPE.LINE:
    case GRAPH_TYPE.BAR:
    case GRAPH_TYPE.PIE:
    case GRAPH_TYPE.TREEMAP:
      return {
        data: [ { name: 'Male', value: 43 }, { name: 'Female', value: 56 }, { name: 'Other', value: 1 } ]
      }
    case 'IMAGE':
      return { url: 'https://images.unsplash.com/photo-1522124624696-7ea32eb9592c' }
    case 'TEXT':
      return { text: '' }
    default:
      return {}
  }
}

const content = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_CONTENT:
      return action.data.content.map(next => ({...next, id: uuid.v1()}))
    case ACTION_TYPES.UPDATE_CONTENT:
      const found = state.find(next => next.id === action.item.id)
      if (!found) {
        return [...state, {...widgetFromType(action.item.type), type: action.item.type, id: uuid.v1(), actionId: uuid.v1()}]
      }
      return state.map(next => {
        if (next.id === action.item.id) {
          return {...action.item, actionId: uuid.v1()}
        }
        return next
      })
    case ACTION_TYPES.DELETE_CONTENT:
      return state.filter(next => next.id !== action.item.id)
    default:
      return state
  }
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_CONTENT:
    case ACTION_TYPES.DELETE_CONTENT:
      return {...state, content: content(state.content, action), actionId: uuid.v1()}
    case ACTION_TYPES.RECEIVE_CONTENT:
      return {...action.data, content: content(state.content, action)}
    case ACTION_TYPES.INVALIDATE_CONTENT:
      return initialState
    default:
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

/**
 * TODO: Room for improvement, make this reusable
 * @param state
 * @param action
 * @returns {{isLoading: boolean, response: {code: number, message: string}}|{isLoading: boolean, response}}
 */
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


const contentReducer = (state = {}, action) => ({
  board: board(state.board, action),
  request: request(state.request, action)
})


export default contentReducer