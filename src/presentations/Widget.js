/**
 * Created by Drita Shujaku on 02/12/2019
 */

import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import ImageWidget from 'presentations/widgets/ImageWidget'
import Graph from 'presentations/widgets/Graph'
import Note from 'presentations/widgets/Note'
import { Delete } from 'presentations/icons'
import { GRAPH_TYPE } from 'Constants'
import draggable from 'presentations/Draggable'
import resizable from 'presentations/Resizable'

const useStyles = makeStyles(({ palette, size, spacing, shadow, zIndex }) => ({
  root: {
    boxShadow: shadow.default,
    display: 'flex',
    position: 'absolute',
    '& > *': {
      borderRadius: size.radius,
    },
    '&:hover $actions': {
      display: 'flex'
    }
  },
  resize: {
    position: 'absolute',
    right: -spacing(0.5),
    bottom: -spacing(0.5),
    '&:hover': {
      cursor: 'nwse-resize'
    },
    width: spacing(2),
    height: spacing(2)
  },
  actions: {
    display: 'none',
    color: palette.secondary.main,
    position: 'absolute',
    padding: spacing(2),
    cursor: 'pointer',
    right: 0,
    top: 0
  },
  icon: {
    width: size.smallIcon,
    height: size.smallIcon
  }
}))

const Widget = (props) => {

  const {
    item,
    onDelete,
    x, y,
    draggableListeners,
    onLocationChanged,
    onSizeChanged,
    resizeListeners,
    resizing,
    ...other
  } = props
  const { actionId, ...itemProps } = item
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
  /*
   const selectWidget = (type) => {
      switch (type) {
        case 'IMAGE':
          return <ImageWidget height={320} {...itemProps} {...other} height={undefined}/>
        case GRAPH_TYPE.LINE:
        case GRAPH_TYPE.BAR:
        case GRAPH_TYPE.PIE:
        case GRAPH_TYPE.TREEMAP:
          return <Graph width={420} height={320} {...itemProps} {...other}/>
        case 'TEXT':
        default:
          return <Note width={360} height={320} {...itemProps} {...other}/>
      }
    }
  */

  const Card = selectWidget(item.type)

  return (
      <Paper
          {...draggableListeners}
          className={classes.root}
          style={{ top: y, left: x }}
      >
        <div className={classes.actions} onClick={() => onDelete(item.id)}>
          <Delete className={classes.icon}/>
        </div>
        <Card {...itemProps} {...other}/>
        {/*{selectWidget(item.type)}*/}
        <div className={classes.resize} {...resizeListeners}/>
      </Paper>
  )
}

export default resizable(draggable(Widget))