/**
 * Created by Drita Shujaku on 04/12/2019
 */

import React from 'react'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({size}) => ({
  root: props => ({
    width: props.width || 'auto',
    height: props.height || 320,
    //maxWidth: 600,
    maxHeight: 400,
    borderRadius: size.radius
  })
}))

const ImageWidget = (props) => {

  const classes = useStyles(props)
  const { url } = props

  return (
        <img src={url} className={classes.root} {...props}/>
  )
}

ImageWidget.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default ImageWidget