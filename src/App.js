import { hot } from 'react-hot-loader/root'
import React, { Fragment, lazy, Suspense } from 'react'
import 'assets/app.css'
import store, { history } from 'Store'
import ThemeProvider from 'utils/ThemeProvider'
import { Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import PrivateRoute from 'PrivateRoute'
import { Provider } from 'react-redux'
// import Login from 'pages/Login'
// import Dashboards from 'pages/Dashboards'
const Login = lazy(() => import('pages/Login'))
const Dashboards = lazy(() => import('pages/Dashboards'))

const App = () => {

  return (
      <Provider store={store}>
        <ThemeProvider theme={'light'}>
          <Fragment>
            <CssBaseline/>
            <Router history={history}>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path={'/login'}>
                    <Login/>
                  </Route>
                  <PrivateRoute path={'/'}>
                    <Dashboards/>
                  </PrivateRoute>
                </Switch>
              </Suspense>
            </Router>
          </Fragment>
        </ThemeProvider>
      </Provider>
  )
}

export default hot(App)
