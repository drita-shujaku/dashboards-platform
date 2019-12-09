/**
 * Created by Drita Shujaku on 04/12/2019
 */

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Delete } from 'presentations/icons'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(({palette, size, typography, spacing}) => ({
  root: props => ({
    width: props.width || 360,
    height: props.height || 320,
    backgroundColor: props.color || '#F6F096',
    fontWeight: typography.fontWeightBold,
    padding: spacing(2)
  }),
  placeholder: {
    color: palette.text.secondary
  }
}))

const Note = (props) => {

  const classes = useStyles(props)

  const { text } = props

  const [ note, setNote ] = useState(text)


  return (
      <div className={classes.root}>
        <div>
          {note || 'Write something...'}
        </div>
      </div>
  )
}

export default Note