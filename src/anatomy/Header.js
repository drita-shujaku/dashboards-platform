import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({palette, size}) => ({
  breadcrumbs: {
    fontSize: size.headerFont,
  },
  navLink: {
    color: palette.text.default,
    textDecoration: 'none',
    '&:hover': {
      color: palette.secondary.main
    }
  }
}))

const Header = (props) => {

  const { match: { params: { id = '' }}, dashboards } = props

  const classes = useStyles()

  const makeBreadcrumbs = (dashboard, breadcrumbs = []) => {
    breadcrumbs = [ dashboard, ...breadcrumbs ]
    if (!!dashboard.parentId) {
      dashboard = dashboards.find(item => item.id === dashboard.parentId)
      breadcrumbs = makeBreadcrumbs(dashboard, breadcrumbs)
    }
    return breadcrumbs
  }

  const selectedDashboard = dashboards.find(dashboard => dashboard.id === id)

  const breadcrumbs = makeBreadcrumbs(selectedDashboard)

  return (
      <div>
        {breadcrumbs.map((breadcrumb, index) => {
          let separator = index < breadcrumbs.length - 1 ? ' / ' : ''
          return <span key={index} className={classes.breadcrumbs}>
            <NavLink
                className={classes.navLink}
                to={`/dashboards/${breadcrumb.id}`}
                exact>
              {breadcrumb.name}
            </NavLink>
            <span>{separator}</span>
          </span>
        })}
      </div>
  )
}

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.items
})

export default connect(mapStateToProps)(Header)