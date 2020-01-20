import ACTION_TYPES from 'reducers/users/UsersActionTypes'

const user = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTHENTICATE_USER:
      return state
    case ACTION_TYPES.RECEIVE_USER:
      return { username: action.item.username }
    default:
      return state
  }
}

const usersReducer = (state = {}, action) => ({
  user: user(state.user, action)
})

export default usersReducer