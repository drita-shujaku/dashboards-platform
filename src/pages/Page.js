import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({}) => ({
  root: {

  }
}))

const Page = (props) => {

  const classes = useStyles()

  return (
      <div className={classes.root}></div>
  )
}

export default Page