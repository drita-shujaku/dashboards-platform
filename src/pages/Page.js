import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({palette, size}) => ({
  root: {
    height: '100%',
    display: 'flex',
    backgroundColor: palette.background.main,
    color: palette.primary.contrastText,
    position: 'relative',
    overflowY: 'auto',
    marginLeft: size.drawer,
    //alignItems: 'stretch'
/*    '& > *': {
      flex: 1
    }*/
  }
}))

const Page = (props) => {

  const { children } = props
  const classes = useStyles(props)

  return (
      <div className={classes.root}>
        {children}
      </div>
  )
}

export default Page