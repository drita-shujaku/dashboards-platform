/**
 * Created by Drita Shujaku on 14/11/2019
 */

import React from 'react'
import { makeStyles } from '@material-ui/core'
import DashboardCard from 'presentations/DashboardCard'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    '& > *': {
      margin: spacing(2),
      marginLeft: 0,
      marginBottom: 0
    }
  }
}))

const DashboardsGrid = (props) => {

  const { dashboards, onDelete, onEdit } = props
  const classes = useStyles()

  return (
      <div className={classes.root}>
        {
          dashboards.map((dashboard, index) => {
            return <DashboardCard dashboard={dashboard} onDelete={onDelete} onEdit={onEdit} key={`dashboard-${index}`}/>
          })
        }
      </div>
  )
}

export default DashboardsGrid