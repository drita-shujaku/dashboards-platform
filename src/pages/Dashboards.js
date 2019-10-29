import React from 'react'
import { connect } from 'react-redux'

const Dashboards = (props) => {
  const { user } = props
  return (
      <div>Welcome home {user.username}!</div>
  )
}

const matchStateToProps = (state) => ({
  user: state.session.user
})

export default connect(matchStateToProps)(Dashboards)