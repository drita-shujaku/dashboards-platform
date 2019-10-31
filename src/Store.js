import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'middleware/Thunk'
import logger from 'middleware/Logger'
import api from 'middleware/Api'
import users from 'reducers/users/Users'
import dashboards from 'reducers/dashboards/Dashboards'
import { sessionReducer, sessionService } from 'redux-react-session'

export const history = createBrowserHistory()

const reducers = combineReducers({
  users,
  dashboards,
  session: sessionReducer
})

const middleware = [api, thunk, logger]

const store = createStore(reducers, applyMiddleware(...middleware))

sessionService.initSessionService(store)
export default store

