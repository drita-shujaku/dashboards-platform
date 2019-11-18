import { CALL_API } from 'middleware/Api'
import ACTION_TYPES from 'reducers/dashboards/DashboardsActionTypes'

const requestDashboards = () => ({
  type: ACTION_TYPES.REQUEST_DASHBOARDS
})

const receiveDashboards = (data) => ({
  type: ACTION_TYPES.RECEIVE_DASHBOARDS,
  data
})

const updateDashboard = (item) => ({
  type: ACTION_TYPES.UPDATE_DASHBOARD,
  item
})

const removeDashboard = (item) => ({
  type: ACTION_TYPES.DELETE_DASHBOARD,
  item
})

const displayMessage = (response) => ({
  type: ACTION_TYPES.DISPLAY_MESSAGE,
  response
})

export const filter = (text) => ({
  type: ACTION_TYPES.FILTER,
  text
})

export const fetchDashboards = () => {
  return dispatch => {
    dispatch(requestDashboards())
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/'
      }
    }).then(data => {
      dispatch(receiveDashboards(data))
      return data
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}

export const addDashboard = (item) => {
  return dispatch => {
    dispatch(requestDashboards())
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/',
        options: {
          method: item._id ? 'PUT' : 'POST',
          body: JSON.stringify(item)
        }
      }
    }).then(response => {
      dispatch(updateDashboard(response))
      return response
    })
  }
}

export const deleteDashboard = (item) => {
  return dispatch => {
    dispatch(requestDashboards())
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/',
        options: {
          method: 'DELETE',
          body: JSON.stringify(item)
        }
      }
    }).then(response => {
      dispatch(removeDashboard(response))
      return response
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}
