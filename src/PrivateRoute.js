import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({children, ...props}) => {
  const { authenticated } = props
  return (
      <Route
          {...props}
          render={({location}) =>
             authenticated ? (
                children
            ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: {
                      from: location
                    }
                  }}
                />
            )
          }
      />
  )
}


const matchStateToProps = (state) => ({
  authenticated: state.session.authenticated
})

export default connect(matchStateToProps)(PrivateRoute)