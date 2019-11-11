import { hot } from 'react-hot-loader/root'
import React, { Fragment, lazy, Suspense } from 'react'
import 'assets/app.css'
import store, { history } from 'Store'
import ThemeProvider from 'utils/ThemeProvider'
import { Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import PrivateRoute from 'PrivateRoute'
import { Provider } from 'react-redux'
import LoadingIndicator from 'utils/LoadingIndicator'
const Login = lazy(() => import('pages/Login'))
const Dashboards = lazy(() => import('pages/Dashboards'))
const Page = lazy(() => import('pages/Page'))
const CreateProject = lazy(() => import('pages/CreatePoject'))
//import Page from 'pages/Page'

const App = () => {

  return (
      <Provider store={store}>
        <ThemeProvider>
          <Fragment>
            <CssBaseline/>
            <Router history={history}>
              <Suspense fallback={<LoadingIndicator />}>
                <Switch>
                  <Route path={'/login'}>
                    <Login/>
                  </Route>
                  <Route path={'/create'}>
                    <CreateProject/>
                  </Route>
                  <PrivateRoute path={'/dashboards/:id'}>
                    <Page/>
                  </PrivateRoute>
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
