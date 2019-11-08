import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addDashboard, fetchDashboards } from 'reducers/dashboards/DashboardActions'
import LeftNav from 'anatomy/LeftNav'
import { makeStyles } from '@material-ui/core'
import { Button, Fab, InputAdornment } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { logOut } from 'reducers/users/UsersActions'
import { Add } from '@material-ui/icons'
import { filteredItems } from 'reducers/dashboards/Dashboards'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'


const useStyles = makeStyles(({palette, spacing, size}) => ({
  root: {
    display: 'flex',
    backgroundColor: palette.background.main
  },
  content: {
    padding: spacing(3)
  },
  logOut: {
    marginLeft: 'auto',
    padding: spacing()
  },
  addButton: {
    position: 'fixed',
    right: spacing(6),
    bottom: spacing(4)
  },
  icon: {
    width: size.icon,
    height: size.icon
  },
  searchButton: {
    color: palette.text.secondary
  }
}))

const Dashboards = (props) => {
  const {user, fetchDashboards, dashboards} = props
  const classes = useStyles()
  console.log('props', props)

  const [search, setSearch] = useState('')

  const history = useHistory()

  useEffect(() => {
    fetchDashboards()
  }, [])

  const handleChange = (event) => {
    const {value} = event.target
    setSearch(value)
  }

  return (
      <div className={classes.root}>
        <LeftNav/>
        <div className={classes.content}>
          Welcome home {user.username}!
          <div className={classes.search}>
            <TextField
                name={'search'}
                label={'Search'}
                variant={'filled'}
                value={search}
                autoFocus={true}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.searchButton}>
                          <Search/>
                        </IconButton>
                      </InputAdornment>)
                }}
                fullWidth
            />
          </div>
        </div>
        <div className={classes.logOut}>
          <Button
              color={'secondary'}
              size={'large'}
              onClick={() => logOut()}
          >
            Log out
          </Button>
        </div>
        <Fab
            className={classes.addButton}
            color={'secondary'}
            onClick={() => history.push('/create')}
        >
          <Add className={classes.icon}/>
        </Fab>
      </div>
  )
}

const matchStateToProps = (state) => ({
  user: state.session.user,
  dashboards: filteredItems(state.dashboards),
  authenticated: state.session.authenticated
})

const matchDispatchToProps = ({
  fetchDashboards,
  logOut,
  addDashboard
})

export default connect(matchStateToProps, matchDispatchToProps)(Dashboards)