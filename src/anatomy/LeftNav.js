import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { switchTheme } from 'reducers/Theme'
import { VisibilityOutlinedIcon, KeyboardArrowLeftOutlinedIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { dashboardsHierarchy } from 'reducers/dashboards/Dashboards'

const useStyles = makeStyles(({size, spacing, palette}) => ({
  root: {
    display: 'flex',
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
    color: palette.common.white
  },
  open: {
    width: size.drawer
  },
  title: {},
  directory: {
    color: palette.text.secondary
  },
  list: {
    paddingLeft: spacing(2)
  },
  childrenList: {
    listStyleType: 'none',
    padding:
        spacing()
  },
  switchTheme: {
    alignSelf: 'center',
    marginTop: 'auto'
  }

}))

const LeftNav = (props) => {

  const { type, switchTheme, dashboards } = props
  const classes = useStyles()

  const [open, setOpen] = useState(true)


  const capitalize = (text) => {
    let [first, ...rest] = text
    return first.toUpperCase() + rest.join("")
  }

  const theme = capitalize(type)

  console.log('dashboards', dashboards)

  const renderList = (dashboards, level) => {
    const notEmpty = dashboards.length > 0
    return (
      notEmpty && <ul className={clsx(classes.list, level && classes.childrenList)}>
        {dashboards.map(dashboard => {
          return (
              <li key={dashboard.id}>
                {dashboard.name}
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
            Overview
          </Typography>
          <div className={classes.directory}>
            {renderList(dashboards, 0)}
          </div>
        </div>
        <div className={classes.switchTheme}>
          <span>{theme} mode</span>
        </div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  type: state.theme,
  dashboards: dashboardsHierarchy(state)
})

const matchDispatchToProps = {
  switchTheme
}

export default connect(mapStateToProps, matchDispatchToProps)(LeftNav)