/**
 * Created by Drita Shujaku on 02/12/2019
 */

import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import ImageWidget from 'presentations/widgets/ImageWidget'
import Graph from 'presentations/widgets/Graph'
import Note from 'presentations/widgets/Note'

const useStyles = makeStyles(({ size, spacing, shadow}) => ({
  root: {
    borderRadius: size.radius,
    boxShadow: shadow.default,
    display: 'flex'
  }
}))

const Widget = (props) => {

  const { item, ...other } = props
  const { type } = item

  console.log('item received', item)

  const classes = useStyles()
  console.log('type', item.type)

  const renderWidget = (type) => {
    switch (type) {
      case 'IMAGE':
        return ImageWidget
      case 'LINE':
      case 'BAR':
      case 'PIE':
      case 'TREE':
        return Graph
      case 'TEXT':
        return Note
    }
  }

  const Card = renderWidget(type)

  return (
      <Paper className={classes.root}>
        <Card {...item} {...other}/>
      </Paper>
  )
}

export default Widget