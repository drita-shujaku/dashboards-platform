import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addDashboard, deleteDashboard, fetchDashboards, filter } from 'reducers/dashboards/DashboardActions'
import LeftNav from 'anatomy/LeftNav'
import { Button, Fab, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { Add, Search } from '@material-ui/icons'
import { logOut } from 'reducers/users/UsersActions'
import { appendChildren, filteredItems } from 'reducers/dashboards/Dashboards'
import Header from 'anatomy/Header'
import Project from 'pages/Project'
import DashboardsGrid from 'presentations/DashboardsGrid'


const useStyles = makeStyles(({ palette, spacing, size }) => ({
  root: {
    position: 'relative',
  },
  page: {
    display: 'flex',
    backgroundColor: palette.background.main,
    color: palette.primary.contrastText
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
  const {
    user,
    fetchDashboards,
    deleteDashboard,
    dashboards,
    filteredDashboards,
    dashboardsChange,
    search,
    filter,
    match: { params: { id = '' } }
  } = props
  const classes = useStyles()

  const [ project, setProject ] = useState({ editing: {}, open: false })
  const [ selectedDashboard, selectDashboard ] = useState(undefined)
  let dashboard = undefined

  useEffect(() => {
    fetchDashboards()
  }, [ dashboardsChange, id ])

  useEffect(() => {
    selectDashboard(dashboards.find(dashboard => dashboard.id === id))
  }, [ dashboards, id ])

  const handleChange = (event) => {
    const { value } = event.target
    filter(value)
  }

  const onDelete = (item) => {
    console.log('here we are')
    deleteDashboard(item)
  }

  const onEdit = (item) => {
    setProject({ editing: item, open: true })
  }

  const onClose = () => {
    setProject({editing: {}, open: false})
  }

  const makeBreadcrumbs = (dashboard = [], breadcrumbs = []) => {
    breadcrumbs = [ dashboard, ...breadcrumbs ]
    if (!!dashboard.parentId) {
      const parent = dashboards.find(item => item.id === dashboard.parentId)
      breadcrumbs = makeBreadcrumbs(parent, breadcrumbs)
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

            <DashboardsGrid
                dashboards={appendChildren(filteredDashboards, selectedDashboard)}
                onDelete={onDelete}
                onEdit={onEdit}
            />

          </div>
          <div className={classes.logOut}>
            {user.username}
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
              onClick={() => setProject({...project, open: true})}
          >
            <Add className={classes.icon}/>
          </Fab>
        </div>
        {project.open && <Project onClose={onClose} parent={selectedDashboard} dashboard={project.editing}/>}
      </div>
  )
}

const matchStateToProps = (state) => ({
  user: state.session.user,
  dashboards: state.dashboards.items,
  filteredDashboards: filteredItems(state.dashboards),
  authenticated: state.session.authenticated,
  dashboardsChange: state.dashboards.change,
  search: state.dashboards.search
})

const matchDispatchToProps = ({
  fetchDashboards,
  logOut,
  addDashboard,
  deleteDashboard,
  filter
})

export default connect(matchStateToProps, matchDispatchToProps)(Dashboards)