/**
 * Created by Drita Shujaku on 02/12/2019
 */

import React, { useEffect } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import ImageWidget from 'presentations/widgets/ImageWidget'
import Graph from 'presentations/widgets/Graph'
import Note from 'presentations/widgets/Note'
import { Delete } from 'presentations/icons'
import { GRAPH_TYPE } from 'Constants'
import draggable from 'presentations/Draggable'

const useStyles = makeStyles(({ palette, size, spacing, shadow, zIndex }) => ({
  root: {
    boxShadow: shadow.default,
    display: 'flex',
    position: 'absolute',
    '& > *': {
      borderRadius: size.radius,
    }
  },
  actions: {
    color: 'transparent',
    position: 'absolute',
    padding: spacing(2),
    cursor: 'pointer',
    '&:hover': {
      display: 'flex',
      color: palette.secondary.main
    },
    right: 0,
    top: 0,
    zIndex: 1000
  },
  icon: {
    width: size.smallIcon,
    height: size.smallIcon
  }
}))

const Widget = (props) => {

  const { item, onDelete, x, y, onMouseDown, onMouseMove, onMouseUp, ...other } = props
  const { type, id } = item
  //console.log('item received', item)

  const classes = useStyles()
  //console.log('type', item.type)

  const selectWidget = (type) => {
    switch (type) {
      case 'IMAGE':
        return ImageWidget
      case GRAPH_TYPE.LINE:
      case GRAPH_TYPE.BAR:
      case GRAPH_TYPE.PIE:
      case GRAPH_TYPE.TREEMAP:
        return Graph
      case 'TEXT':
      default:
        return Note
    }
  }

  const Card = selectWidget(type)
  return (
      <Paper onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} className={classes.root} style={{ top: y, left: x }}>
        <div className={classes.actions} onClick={() => onDelete(id)}>
          <Delete className={classes.icon}/>
        </div>
        <Card {...item} {...other}/>
        {/*{selectWidget(type)}*/}
      </Paper>
  )
}

export default draggable(Widget)