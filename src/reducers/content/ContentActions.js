import { CALL_API } from 'middleware/Api'
import ACTION_TYPES from 'reducers/content/ContentActionTypes'

const requestContent = () => ({
  type: ACTION_TYPES.REQUEST_CONTENT
})

const receiveContent = (data) => ({
  type: ACTION_TYPES.RECEIVE_CONTENT,
  data
})

const updateContent = (item) => ({
  type: ACTION_TYPES.UPDATE_CONTENT,
  item
})

const removeContent = (item) => ({
  type: ACTION_TYPES.DELETE_CONTENT,
  item
})

const displayMessage = (response) => ({
  type: ACTION_TYPES.DISPLAY_MESSAGE,
  response
})

const invalidateContent = () => ({
  type: ACTION_TYPES.INVALIDATE_CONTENT
})

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

/*export const fetchContent = (dashboard, content) => {
  return dispatch => {
    dispatch(requestContent())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/${dashboard.id}/content/${content.id}`
      }
    }).then(data => {
      dispatch(receiveContent(data))
      return data
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}*/

export const addContent = (item) => {
  return dispatch => {
    dispatch(requestContent())
    return dispatch({
      [CALL_API]: {
        endpoint: '/dashboard/content/',
        options: {
          method: item._id ? 'PUT' : 'POST',
          body: JSON.stringify(item)
        }
      }
    }).then(response => {
      dispatch(updateContent(response))
      return response
    })
  }
}

export const deleteContent = (item) => {
  return dispatch => {
    dispatch(requestContent())
    return dispatch({
      [CALL_API]: {
        endpoint: `/dashboard/content/${item.id}`,
        options: {
          method: 'DELETE',
          body: JSON.stringify(item)
        }
      }
    }).then(response => {
      dispatch(removeContent(response))
      return response
    }, error => {
      dispatch(displayMessage(error))
      return error
    })
  }
}
