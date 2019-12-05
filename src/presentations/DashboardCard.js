/**
 * Created by Drita Shujaku on 11/13/2019
 */

import React from 'react'
import { CardActions, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom'
import moment from 'moment'
import { MoreVert } from '@material-ui/icons'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(({ spacing, size, palette, typography, shadow }) => ({
  root: {
    color: palette.primary.contrastText,
    minHeight: 270,
    width: 480,
    backgroundColor: palette.background.light,
    borderRadius: size.radius,
    boxShadow: shadow.default,
    padding: spacing(2, 3),
    '& > *': {
      padding: spacing(1, 0)
    },
    display: 'flex',
    flexDirection: 'column'
  },
  bullet: {
    display: 'inline-block',
    margin: spacing(0, 1),
    transform: 'scale(1.5)',
  },
  moreButton: {
    padding: spacing(),
    marginRight: -spacing()
  },
  title: {
    fontSize: size.titleFont,
    fontWeight: typography.fontWeightMedium,
    whiteSpace: 'nowrap',
    width: 'initial',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: palette.text.default
  },
  dashboardLink: {
    color: palette.text.primary,
    '&:hover': {
      color: palette.primary.dark
    }
  },
  label: {
    borderRadius: 100,
    backgroundColor: palette.secondary.light,
    color: palette.secondary.main,
    padding: spacing(1, 2),
    margin: spacing(0, 1, 1/2, 0),
    display: 'inline-block',
    border: `1px solid ${palette.border}`,
    maxWidth: 160,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  description: {
    marginTop: spacing(),
    marginBottom: spacing(),
    wordBreak: 'break-word',
    fontSize: typography.body2.fontSize,
    height: `${typography.body1.lineHeight * 2}em`,
    overflow: 'hidden'
  },
  footer: {
    marginTop: 'auto',
    display: 'block',
    paddingBottom: 0
  }
}))

const DashboardLabel = (props) => {

  const { dashboard: { name, id } } = props
  const classes = useStyles(props)

  return (
      <NavLink to={`/dashboards/${id}`} className={classes.label}>
        <Typography variant={'caption'}>{name}</Typography>
      </NavLink>
  )
}

const DashboardCard = (props) => {

  const { dashboard, handleClick } = props
  const { name, description, children, createdAt, id } = dashboard

  const classes = useStyles(props)

  const bull = <span className={classes.bullet}>&bull;</span>
  const date = <span>{moment(createdAt).format('DD.MM.YYYY')}</span>

  const numberOfChildren = children.length


  return (
      <Card className={classes.root}>
        <CardHeader
            action={
              <IconButton className={classes.moreButton} onClick={(event) => handleClick(event, dashboard)}>
                <MoreVert/>
              </IconButton>
            }
            subheader={
              <Typography variant={'caption'}>
                {!!numberOfChildren &&
                <span>
                  {numberOfChildren} {numberOfChildren > 1 ? 'children' : 'child'}
                  {bull}
                </span>}
                {date}
              </Typography>
            }
        />
        <CardContent>
          <Typography variant={'h5'} className={classes.title}>
            <Link to={`/dashboards/${id}`} className={classes.dashboardLink}>{name}</Link>
          </Typography>
          <Typography variant={'body1'} className={classes.description}>{description}</Typography>
        </CardContent>
        <CardActions className={classes.footer}>
          {children.map((child, index) => <DashboardLabel key={`child-${index}`} dashboard={child}/>)}
        </CardActions>
      </Card>
  )
}

export default DashboardCard