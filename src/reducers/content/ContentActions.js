import { CALL_API } from 'middleware/Api'
import ACTION_TYPES from 'reducers/content/ContentActionTypes'

const requestContent = () => ({
  type: ACTION_TYPES.REQUEST_CONTENT
})

const receiveContent = (data) => ({
  type: ACTION_TYPES.RECEIVE_CONTENT,
  data
})

const displayMessage = (response) => ({
  type: ACTION_TYPES.DISPLAY_MESSAGE,
  response
})

const invalidateContent = () => ({
  type: ACTION_TYPES.INVALIDATE_CONTENT
})

/**
 * Add or modify an existing widget within a content model
 * @param data
 * @returns {{data: *, type: *}}
 */
export const updateContent = (item) => ({
  type: ACTION_TYPES.UPDATE_CONTENT,
  item
})

/**
 * Removes a widget from the content model
 * @param data
 * @returns {{data: *, type: *}}
 */
export const removeContent = (item) => ({
  type: ACTION_TYPES.DELETE_CONTENT,
  item
})

/**
 * Fetches the dashboard content
 * @param dashboard
 * @returns {function(*): *}
 */
export const fetchContent = (dashboard) => {
  return dispatch => {
    dispatch(requestContent())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/${dashboard.id}/content/`
      }
    }).then(data => {
      dispatch(receiveContent(data))
      return data
    }, error => {
      dispatch(displayMessage(error))
      dispatch(invalidateContent())
      return error
    })
  }
}

/**
 * Synchronizes the state changes of the redux bo
 * TODO: Room for improvement: Manage synchronize loading, messagingard with the backend API
 * @param item
 * @param id
 * @returns {function(*): *}
 */
export const synchronize = (item, id) => {
  console.log('content to synchronize', item)
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/content/',
        options: {
          method: item._id ? 'PUT' : 'POST',
          body: JSON.stringify({...item, dashboardId: id})
        }
      }
    }).then(response => {
      if (!item._id) {
        dispatch(receiveContent(response))
      }
      return response
    })
  }
}
