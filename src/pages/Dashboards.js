import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addDashboard, deleteDashboard, fetchDashboards, filter } from 'reducers/dashboards/DashboardActions'
import LeftNav from 'anatomy/LeftNav'
import { Button, Fab, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { Add, Search } from '@material-ui/icons'
import { logOut } from 'reducers/users/UsersActions'
import { appendChildren, filteredItems } from 'reducers/dashboards/Dashboards'
import Header from 'anatomy/Header'
import ProjectForm from 'pages/ProjectForm'
import DashboardsGrid from 'presentations/DashboardsGrid'
import { GridViewIcon, ListViewIcon } from 'presentations/icons'
import clsx from 'clsx'
import Page from 'pages/Page'
import WidgetsView from 'presentations/WidgetsView'
import { fetchContent } from 'reducers/content/ContentActions'


const useStyles = makeStyles(({ palette, spacing, size }) => ({
  /*  root: {
      position: 'relative',
    },*/
  page: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: palette.background.main,
    color: palette.primary.contrastText
  },
  content: {
    width: '100%',
    height: '100%',
    padding: spacing(5)
  },
  breadcrumbs: {
    marginBottom: spacing(2)
  },
  search: {
    marginBottom: spacing(2),
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between'
  },
  viewMode: {
    alignSelf: 'flex-end'
  },
  gridViewMode: {
    '&:hover, &$active': {
      color: palette.secondary.main,
      cursor: 'pointer'
    }
  },
  listViewMode: {
    stroke: palette.text.secondary,
    marginRight: spacing(),
    '&:hover, &$active': {
      stroke: palette.secondary.main,
      cursor: 'pointer'
    }
  },
  active: {},
  logOut: {
    position: 'absolute',
    padding: spacing(),
    right: 0,
    top: 0,
    '& > *': {
      padding: spacing(),
    }
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

const VIEW_MODE = { GRID: 'grid', LIST: 'list' }

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
  const [ viewMode, setViewMode ] = useState(VIEW_MODE.GRID)

  const modeIsSelected = (type) => viewMode === type

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
    deleteDashboard(item)
  }

  const onEdit = (item = {}) => {
    setProject({ editing: item, open: true })
  }

  const onClose = () => {
    setProject({ editing: {}, open: false })
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
      <Page>
        {project.open && <ProjectForm onClose={onClose} parent={selectedDashboard} dashboard={project.editing}/>}
        <LeftNav/>
        <div className={classes.content}>
          <div className={classes.logOut}>
            <span>{user.username}</span>
            <Button
                color={'secondary'}
                size={'large'}
                onClick={() => logOut()}
            >
              Log out
            </Button>
          </div>
          <div className={classes.header}>
            {!!selectedDashboard && <div className={classes.breadcrumbs}>
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
              <div className={classes.viewMode}>
                <ListViewIcon
                    className={clsx(classes.listViewMode, modeIsSelected(VIEW_MODE.LIST) && classes.active)}
                    onClick={() => setViewMode(VIEW_MODE.LIST)}
                />
                <GridViewIcon
                    className={clsx(classes.gridViewMode, modeIsSelected(VIEW_MODE.GRID) && classes.active)}
                    onClick={() => setViewMode(VIEW_MODE.GRID)}
                />
              </div>
            </div>
          </div>
          <DashboardsGrid
              dashboards={appendChildren(filteredDashboards, selectedDashboard)}
              onDelete={onDelete}
              onEdit={onEdit}
              view={viewMode}
          />
          <WidgetsView dashboard={selectedDashboard}/>

        </div>
      </Page>
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