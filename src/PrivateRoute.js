import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({children, ...props}) => {
  const { authenticated, token } = props

  return (
      <Route
          {...props}
          render={props =>
             authenticated ? (
                token && React.cloneElement(children, props)
            ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: {
                      from: props.location
                    }
                  }}
                />
            )
          }
      />
  )
}


const matchStateToProps = (state) => ({
  authenticated: state.session.authenticated,
  token: state.session.user
})

export default connect(matchStateToProps)(PrivateRoute)