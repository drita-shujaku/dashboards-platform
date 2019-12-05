import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({ palette, size, typography }) => ({
  breadcrumbs: {
    fontSize: size.titleFont,
    fontWeight: 500,
    color: palette.text.default
  },
  navLink: {
    color: palette.text.default,
    '&:hover': {
      color: palette.secondary.main
    }
  }
}))

const Header = (props) => {

  const { breadcrumbs, separator } = props

  const classes = useStyles()

  return (
      <div className={classes.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, index) => {
          let lastBreadcrumb = index === breadcrumbs.length - 1
          return (
              <span key={index}>
                <NavLink
                    className={classes.navLink}
                    to={`/dashboards/${breadcrumb.id}`}
                >
                  {breadcrumb.name}
                </NavLink>
                {!lastBreadcrumb && <span> {separator} </span>}
          </span>)
        })}
      </div>
  )
}

Header.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  separator: PropTypes.string
}

Header.defaultProps = {
  separator: '/'
}

export default Header