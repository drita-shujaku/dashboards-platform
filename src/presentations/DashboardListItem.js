/**
 * Created by Drita Shujaku on 27/11/2019
 */

import React from 'react'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { MoreVert } from '@material-ui/icons'

const useStyles = makeStyles(({palette, size, spacing, typography, shadow }) => ({
  root: {
    width: '100%',
    minWidth: 'fit-content',
    color: palette.primary.contrastText,
    backgroundColor: palette.background.light,
    borderRadius: size.radius,
    boxShadow: shadow.default,
    padding: spacing(1, 3),
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing(1, 0),
      marginRight: spacing(),
    }
  },
  dashboardLink: {
    color: palette.text.primary,
    '&:hover': {
      color: palette.primary.dark
    }
  },
  title: {
    color: palette.text.primary,
    maxWidth: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: spacing(3)
  },
  description: {
    position: 'relative',
    flex: 1,
    fontSize: typography.body2.fontSize,
    height: `${typography.body1.lineHeight}em`,
    overflow: 'hidden',
  },
  moreButton: {
    padding: spacing(),
    marginRight: -spacing(2),
    marginLeft: spacing()
  },
  date: {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      zIndex: 1,
      right: 'calc(100%)',
      width: 140,
      height: `${typography.body1.lineHeight}em`,
      background: `linear-gradient(to left, ${palette.background.light}, transparent 50%)`
    }
  }
}))

const DashboardListItem = (props) => {

  const { dashboard, handleClick } = props
  const { name, description, createdAt, id } = dashboard

  const classes = useStyles()

  return (
      <div className={classes.root}>
        <div className={classes.main}>
          <Typography variant={'h6'} className={classes.title}>
            <Link to={`/dashboards/${id}`} className={classes.dashboardLink}>{name}</Link>
          </Typography>
          <Typography variant={'body1'} className={classes.description}>{description}</Typography>
        </div>
        <div className={classes.actions}>
          <span className={classes.date}>{moment(createdAt).format('DD.MM.YYYY')}</span>
          <IconButton className={classes.moreButton} onClick={(event) => handleClick(event, dashboard)}>
            <MoreVert/>
          </IconButton>
        </div>
      </div>
  )
}

export default DashboardListItem