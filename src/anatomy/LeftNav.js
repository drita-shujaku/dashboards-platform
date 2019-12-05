import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { switchTheme } from 'reducers/Theme'
import { KeyboardArrowLeftOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { dashboardsHierarchy } from 'reducers/dashboards/Dashboards'
import LoadingIndicator from 'utils/LoadingIndicator'
import { NavLink, Link } from 'react-router-dom'
import { truncate } from 'utils/helper-functions'
import Switch from 'presentations/Switch'

const useStyles = makeStyles(({size, spacing, palette, zIndex, shadow, typography}) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'column',
    overflowX: 'hidden',
    height: '100%',
    width: 0,
    //position: 'relative',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: spacing(5),
    //paddingLeft: spacing(5),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    boxShadow: shadow.drawer,
    zIndex: zIndex.drawer
  },
  open: {
    minWidth: size.drawer
  },
  title: {
    marginBottom: spacing(3),
    fontSize: size.headingFont
  },
  directory: {
    color: palette.text.secondary,
    fontSize: typography.body1.fontSize,
    textOverflow: 'ellipsis'
  },
  link: {
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
    fontSize: typography.body1.fontSize
  }
}))

const change = (type) => type === 'light' ? 'dark' : 'light'

const LeftNav = (props) => {

  const { type, switchTheme, dashboards, dashboardsLoading } = props
  const classes = useStyles()

  const [open, setOpen] = useState(true)

  //console.log('dashboards', dashboards)

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
                  {truncate(dashboard.name, 30)}
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
            {renderList(dashboards, 0)}
            {dashboardsLoading && <LoadingIndicator/>}
          </div>
        </div>
        <div className={classes.switchTheme}>
          <span>Dark mode</span>
          <Switch onClick={() => switchTheme(change(type))} theme={type}/>
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