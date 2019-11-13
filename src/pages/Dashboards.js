import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Switch } from 'react-router-dom'
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
import Header from 'anatomy/Header'
import CreateProject from 'pages/CreatePoject'
import Form, { FormActions } from 'presentations/Form'


const useStyles = makeStyles(({ palette, spacing, size }) => ({
  root: {
    position: 'relative',
  },
  page: {
    display: 'flex',
    backgroundColor: palette.background.main
  },
  content: {
    padding: spacing(5)
  },
  header: {
    paddingBottom: spacing(2)
  },
  search: {
    marginBottom: spacing(2)
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
  searchIcon: {
    color: palette.text.secondary
  },
  createForm: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 5
  }
}))

const Dashboards = (props) => {
  const { user, fetchDashboards, dashboards, match: { params: { id = '' } } } = props
  const classes = useStyles()

  console.log('dashboards props', props)

  const [ search, setSearch ] = useState('')
  const [ openCreate, setOpenCreate ] = useState(false)
  const [ selectedDashboard, selectDashboard ] = useState(undefined)

  useEffect(() => {
    fetchDashboards()
  }, [ openCreate ])

  useEffect(() => {
    selectDashboard(dashboards.find(dashboard => dashboard.id === id))
  }, [ id, dashboards ])

  const handleChange = (event) => {
    const { value } = event.target
    setSearch(value)
  }

  const onClose = () => {
    setOpenCreate(false)
  }

  const makeBreadcrumbs = (dashboard = [], breadcrumbs = []) => {
    breadcrumbs = [ dashboard, ...breadcrumbs ]
    if (!!dashboard.parentId) {
      dashboard = dashboards.find(item => item.id === dashboard.parentId)
      breadcrumbs = makeBreadcrumbs(dashboard, breadcrumbs)
    }
    return breadcrumbs
  }

  const breadcrumbs = makeBreadcrumbs(selectedDashboard)

  return (
      <div className={classes.root}>
        <div className={classes.page}>
          <LeftNav/>
          <div className={classes.content}>
            {!!selectedDashboard && <div className={classes.header}>
              <Header breadcrumbs={breadcrumbs}/>
            </div>}
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
                          <IconButton className={classes.searchIcon}>
                            <Search/>
                          </IconButton>
                        </InputAdornment>)
                  }}
              />
            </div>
            <div>Welcome home {user.username}!</div>
            <div></div>
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
              /*onClick={() => history.push('/create')}*/
              onClick={() => setOpenCreate(true)}
          >
            <Add className={classes.icon}/>
          </Fab>
        </div>
        {openCreate && <CreateProject onClose={onClose} parent={selectedDashboard}/>}
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