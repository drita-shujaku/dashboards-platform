import { hot } from 'react-hot-loader/root'
import React from 'react'
import 'assets/app.css'
import ThemeProvider from 'utils/ThemeProvider'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from 'pages/Login'

const App = () => {

  return (
      <ThemeProvider theme={'light'}>
        <Router>
          <Switch>
            <Route path={'/'} component={Login}/>
          </Switch>
        </Router>
      </ThemeProvider>
  )
}

export default hot(App)
