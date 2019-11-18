import React, { useState } from 'react'
import { Fab, makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { switchTheme } from 'reducers/Theme'
import { VisibilityOutlined, KeyboardArrowLeftOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { dashboardsHierarchy } from 'reducers/dashboards/Dashboards'
import LoadingIndicator from 'utils/LoadingIndicator'
import { NavLink, Link } from 'react-router-dom'

const useStyles = makeStyles(({size, spacing, palette, shadows}) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'column',
    overflowX: 'hidden',
    height: '100vh',
    width: 0,
    //position: 'relative',
    top: 0,
    left: 0,
    padding: spacing(5),
    //paddingLeft: spacing(5),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    boxShadow: '10px 0px 30px rgb(0, 0, 0, 0.3)'
  },
  open: {
    minWidth: size.drawer
  },
  title: {
    marginBottom: spacing(3)
  },
  directory: {
    color: palette.text.secondary,
    textOverflow: 'ellipsis'
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      color: palette.secondary.main
    }
  },
  dashboardsLink: {
    color: palette.secondary.contrastText
  },
  menuLink: {
    color: palette.text.secondary
  },
  activeMenuLink: {
    color: palette.secondary.main
  },
  list: {
    paddingLeft: spacing(),
    '& > *': {
      padding: spacing(1/2)
    },
    '& > :last-child': {
      paddingBottom: 0
    }
  },
  childrenList: {
    listStyleType: 'none'
  },
  switchTheme: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignSelf: 'center',
    alignItems: 'center',
  },
  switcher: {
    position: 'relative',
    height: spacing(4) + spacing(),
    width: spacing(8),
    borderRadius: 100,
    padding: spacing(1/2),
    marginLeft: spacing(),
    cursor: 'pointer',
    backgroundColor: palette.switcher
  },
  light: {
      left: spacing(1/2),
  },
  dark: {
      left: `calc(100% - ${spacing(4) + spacing(1/2)}px)`
  },
  fabRoot: {
    position: 'absolute',
    minHeight: size.icon,
    width: spacing(4),
    transition: 'all 300ms',
    height: spacing(4),
  },
  icon: {
    height: 18,
    width: 18
  }
}))

const theme = (type) => type === 'light' ? 'dark' : 'light'

const LeftNav = (props) => {

  const { type, switchTheme, dashboards, dashboardsLoading } = props
  const classes = useStyles()

  const [open, setOpen] = useState(true)

  const displayCharacters = (string, number) => {
    return string.length > number ? string.substr(0, number) + '...' : string
  }


  const capitalize = (text) => {
    let [first, ...rest] = text
    return first.toUpperCase() + rest.join("")
  }

  //const theme = capitalize(type)

  console.log('dashboards', dashboards)

  const renderList = (dashboards, level) => {
    const notEmpty = dashboards.length > 0
    return (
      notEmpty && <ul className={clsx(classes.list, level && classes.childrenList)}>
        {dashboards.map(dashboard => {
          return (
              <li key={dashboard.id}>
                <NavLink
                    to={`/dashboards/${dashboard.id}`}
                    className={clsx(classes.link, classes.menuLink)}
                    activeClassName={classes.activeMenuLink}
                >
                  {displayCharacters(dashboard.name, 30)}
                </NavLink>
                {renderList(dashboard.children, level + 1)}
              </li>)
        })}
      </ul>
    )
  }


  return (
      <div className={clsx(classes.root, open && classes.open)}>
        <div>
          <Typography variant={'h5'} className={classes.title}>
            <Link to={'/dashboards'} className={clsx(classes.link, classes.dashboardsLink)}>Overview</Link>
          </Typography>
          <div className={classes.directory}>
            {dashboardsLoading ? <LoadingIndicator/> : renderList(dashboards, 0)}
          </div>
        </div>
        <div className={classes.switchTheme}>
          <span>Dark mode</span>
          <div
              className={classes.switcher}
              onClick={() => switchTheme(theme(type))}
          >
            <Fab classes={{root: classes.fabRoot}} className={classes[type]}>
              <VisibilityOutlined className={classes.icon}/>
            </Fab>
          </div>
        </div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  type: state.theme,
  dashboards: dashboardsHierarchy(state),
  dashboardsLoading: state.dashboards.request.isLoading
})

const matchDispatchToProps = {
  switchTheme
}

export default connect(mapStateToProps, matchDispatchToProps)(LeftNav)