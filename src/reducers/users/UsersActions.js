import ACTION_TYPES from 'reducers/users/UsersActionTypes'
import { CALL_API } from 'middleware/Api'
import { sessionService } from 'redux-react-session'

export const authenticateUser = (data) => ({
  type: ACTION_TYPES.AUTHENTICATE_USER,
  data
})

/*export const receiveUser = (item) => ({
  type: ACTION_TYPES.RECEIVE_USER,
  item
})*/

export const logIn = (data) => {
  return (dispatch) => {
    dispatch(authenticateUser(data))
    return dispatch({
      [CALL_API]: {
        endpoint: '/authenticate/',
        options: {
          method: 'POST',
          body: JSON.stringify(data)
        }
      }
    }).then(response => {
      sessionService.saveSession(response)
      return response
    }).then(({ token }) => {
      const { username } = data
      sessionService.saveUser({ username, token })
    })
  }
}