/**
 * Created by Drita Shujaku on 12/11/2019
 */

import React from 'react'
import { makeStyles } from '@material-ui/core'
import Dashboards from 'pages/Dashboards'

const useStyles = makeStyles(({}) => ({
  root: {}
}))

const Factory = (props) => {

  const classes = useStyles()

  return (
      <div className={classes.root}>
        <Dashboards>

        </Dashboards>
      </div>
  )
}

export default Factory