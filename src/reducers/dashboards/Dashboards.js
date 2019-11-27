import ACTION_TYPES from 'reducers/dashboards/DashboardsActionTypes'
import moment from 'moment'

const dashboards = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.RECEIVE_DASHBOARDS:
      return action.data
    case ACTION_TYPES.UPDATE_DASHBOARD:
      const { item } = action
      const found = state.find(dashboard => dashboard.id === item.id)
      if (!found) {
        return [ ...state, item ]
      }
      return state.map(dashboard => {
        if (dashboard.id === item.id) {
          return item
        }
        return dashboard
      })
    case ACTION_TYPES.DELETE_DASHBOARD:
      return state.filter(dashboard => dashboard.id !== action.item.id)
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
    case ACTION_TYPES.RECEIVE_DASHBOARDS:
      return defaultRequestState
    case ACTION_TYPES.REQUEST_DASHBOARDS:
      return {
        ...defaultRequestState,
        isLoading: true
      }
    default:
      return state
  }
}

const search = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.FILTER:
      return action.text
    default:
      return state
  }
}

export const filteredItems = (state) => {
  const { items, search } = state
  console.log('search is', search)
  return items.filter(item => {
    const { name, description } = item
    return [name, description].join().toLowerCase().includes(search.toLowerCase())
  })
  //    .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
}

export const detectChange = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DASHBOARD:
    case ACTION_TYPES.DELETE_DASHBOARD:
      return true
    default:
      return false
  }
}


const dashboardsReducer = (state = {}, action) => ({
  items: dashboards(state.items, action),
  request: request(state.request, action),
  search: search(state.search, action),
  change: detectChange(state.change, action)
})

export const appendChildren = (dashboards, current) => {
  const callback = (item) => !!current ? current.id === item.parentId : !item.parentId
  return dashboards.filter(callback).map(item => ({
    ...item,
    children: appendChildren(dashboards, item)
  }))
}

export const dashboardsHierarchy = (state) => {
  const { dashboards: { items = [] } } = state
  return appendChildren(items)
}
export default dashboardsReducer