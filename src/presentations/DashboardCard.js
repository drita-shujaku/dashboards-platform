/**
 * Created by Drita Shujaku on 11/13/2019
 */

import React, { useState } from 'react'
import { IconButton, makeStyles, Menu, MenuItem, Typography, Fade } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom'
import moment from 'moment'
import { DeleteOutlined, EditOutlined, MoreVert } from '@material-ui/icons'
import { deleteDashboard } from 'reducers/dashboards/DashboardActions'

const useStyles = makeStyles(({ spacing, size, palette, shadows }) => ({
  root: {
    minWidth: 320,
    minHeight: 200,
    backgroundColor: palette.background.light,
    borderRadius: size.radius,
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.16)',
    padding: `${spacing(2)}px ${spacing(3)}px`,
    '& > *': {
      padding: `${spacing()}px 0px`
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moreButton: {
    padding: spacing(),
    marginRight: -spacing(2),
    position: 'relative'
  },
  cardDropdown: {
    boxShadow: '0px 5px 20px rgb(0, 0, 0, 0.22)'
  },
  menuItem: {
    '& > *:not(:last-child)': {
      marginRight: spacing()
    }
  },
  main: {},
  title: {
    paddingBottom: spacing()
  },
  dashboardLink: {
    textDecoration: 'none',
    color: palette.text.primary,
    '&:hover': {
      color: palette.primary.dark
    }
  },
  label: {
    borderRadius: 100,
    backgroundColor: palette.secondary.light,
    padding: `${spacing()}px ${spacing(2)}px`,
    margin: spacing(1/2),
    display: 'inline-block'
  },
  labelLink: {
    textDecoration: 'none',
    color: palette.secondary.main
  }
}))

const DashboardLabel = (props) => {

  const { dashboard: { name, id } } = props
  const classes = useStyles(props)

  return (
      <div className={classes.label}>
        <NavLink to={`/dashboards/${id}`} className={classes.labelLink}>{name}</NavLink>
      </div>
  )
}

const DashboardCard = (props) => {

  const { dashboard, onDelete, onEdit } = props
  const { name, description, children, createdAt, id } = dashboard

  const numberOfChildren = children.length
  const classes = useStyles()
  const popperId = 'popper'

  const [ anchorEl, setAnchorEl ] = useState(null)
  const popperOpen = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
      <div className={classes.root}>
        <div className={classes.actions}>
          <div>
          {!!numberOfChildren &&
            <span>
              {numberOfChildren} {numberOfChildren > 1 ? 'children' : 'child'} &bull;
            </span>
          }
          <span> {moment(createdAt).format('DD.MM.YYYY')}</span>
          </div>
          <IconButton
              className={classes.moreButton}
              aria-describedby={popperId}
              aria-controls={'options'}
              aria-haspopup={'true'}
              onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
              classes={{paper: classes.cardDropdown}}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              getContentAnchorEl={null}
              id={popperId}
              anchorEl={anchorEl}
              open={popperOpen}
              TransitionComponent={Fade}
              onClick={handleClose}
              onClose={handleClose}
          >
            <MenuItem
                className={classes.menuItem}
                onClick={() => onEdit(dashboard)}
            >
              <EditOutlined/>
              <span>edit</span>
            </MenuItem>
            <MenuItem
                className={classes.menuItem}
                onClick={() => onDelete(dashboard)}>
              <DeleteOutlined/>
              <span>delete</span>
            </MenuItem>
          </Menu>
        </div>
        <div className={classes.main}>
          <Typography variant={'h6'} className={classes.title}>
            <Link to={`/dashboards/${id}`} className={classes.dashboardLink}>{name}</Link>
          </Typography>
          <Typography variant={'body2'}>{description}</Typography>
        </div>
        <div className={classes.footer}>
          {children.map((child, index) => <DashboardLabel key={`child-${index}`} dashboard={child}/>)}
        </div>
      </div>
  )
}

export default DashboardCard