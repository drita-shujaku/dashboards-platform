import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDashboards } from 'reducers/dashboards/DashboardActions'
import LeftNav from 'anatomy/LeftNav'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({palette, spacing, size}) => ({
  root: {
    display: 'flex'
  },
  content: {
    padding: spacing(2)
  }
}))

const Dashboards = (props) => {
  const { user, fetchDashboards, dashboards } = props
  const classes = useStyles()

  useEffect(() => {
    fetchDashboards()
  }, [])

  return (
      <div className={classes.root}>
        <LeftNav/>
        <div className={classes.content}>
          Welcome home {user.username}!
        </div>
      </div>
  )
}

const matchStateToProps = (state) => ({
  user: state.session.user,
  dashboards: state.dashboards.items,
  authenticated: state.session.authenticated
})

const matchDispatchToProps = ({
  fetchDashboards
})

export default connect(matchStateToProps, matchDispatchToProps)(Dashboards)