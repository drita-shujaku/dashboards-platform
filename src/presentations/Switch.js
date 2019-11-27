/**
 * Created by Drita Shujaku on 21/11/2019
 */

import React from 'react'
import { Fab, makeStyles } from '@material-ui/core'
import { VisibilityOutlined } from '@material-ui/icons'

const useStyles = makeStyles(({palette, spacing, size}) => ({
  root: {},
  switcher: {
    position: 'relative',
    height: spacing(4) + spacing(),
    width: spacing(8),
    borderRadius: 100,
    padding: spacing(1/2),
    marginLeft: spacing(),
    cursor: 'pointer',
    backgroundColor: palette.switcher
  },
  light: {
    left: spacing(1/2),
  },
  dark: {
    left: `calc(100% - ${spacing(4) + spacing(1/2)}px)`
  },
  fabRoot: {
    position: 'absolute',
    minHeight: size.icon,
    width: spacing(4),
    transition: 'all 300ms',
    height: spacing(4),
  },
  icon: {
    height: 18,
    width: 18
  }
}))

const Switch = (props) => {

  const { onClick, theme } = props
  const classes = useStyles(props)

  return (
      <div className={classes.switcher} onClick={onClick}>
        <Fab classes={{root: classes.fabRoot}} className={classes[theme]}>
          <VisibilityOutlined className={classes.icon}/>
        </Fab>
      </div>
  )
}

export default Switch