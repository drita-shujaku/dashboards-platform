/**
 * Created by Drita Shujaku on 04/12/2019
 */

import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({}) => ({
  root: {
    width: 320,
    height: 300
  }
}))

const Note = (props) => {

  const classes = useStyles()

  const { text } = props

  return (
      <div className={classes.root}>
        {text}
      </div>
  )
}

export default Note