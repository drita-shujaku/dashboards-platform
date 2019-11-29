/**
 * Created by Drita Shujaku on 25/11/2019
 */

import React, { Component } from 'react'
import { Fab, Typography, withStyles } from '@material-ui/core'
import { Note, Image, Line, Bar, Pie, Treemap } from 'presentations/icons'
import DropdownMenu from 'presentations/DropdownMenu'
import { Add } from '@material-ui/icons'
import Information from 'presentations/icons/Information'
import { connect } from 'react-redux'
import { fetchContent } from 'reducers/content/ContentActions'

const styles = ({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.primary.main,
    //padding: spacing(),
    //height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: `${spacing()}px 0px`,
    marginBottom: spacing(2)
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: spacing()
    }
  },
  widgetGrid: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      marginRight: spacing(2)
    }
  },
  addButton: {
    position: 'absolute',
    /*    right: spacing(),
        bottom: spacing(4),*/
    right: spacing(),
    bottom: spacing(),
    zIndex: 1301
  }
})

const menuOptions = [
  {
    text: 'Note',
    icon: <Note/>,
    onClick: () => {
    }
  },
  {
    text: 'Image',
    icon: <Image/>,
    onClick: () => {
    }
  },
  {
    text: 'Line Chart',
    icon: <Line/>,
    onClick: () => {
    }
  },
  {
    text: 'Bar Chart',
    icon: <Bar/>,
    onClick: () => {
    }
  },
  {
    text: 'Pie Chart',
    icon: <Pie/>,
    onClick: () => {
    }
  },
  {
    text: 'Treemap',
    icon: <Treemap/>,
    onClick: () => {
    }
  }
]

class WidgetsView extends Component {

  initialState = {
    anchorEl: null
  }

  state = this.initialState

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    const { dashboard = {}, fetchContent, change } = this.props
    const { id = '' } = dashboard
    const { dashboard: { id: prevId = '' } = {}, change: prevChange } = prevProps
    console.log('id', id, 'prevId', prevId)
    console.log('detect change', change)
    if (id !== prevId) {
      console.log('should fetch')
      fetchContent(dashboard)
    }
  }

  handleClick = (event) => {
    // event.preventDefault()
    /*    this.setState({
          mouseX: event.clientX,
          mouseY: event.clientY
        })*/
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({ ...this.initialState })
  }

  render() {
    const { classes } = this.props
    const { mouseX, mouseY, anchorEl } = this.state
    //console.log('x:', mouseX, 'y:', mouseY)
    const { content } = this.props
    const items = content.map(item => item.content[0])
    console.log('content', content)

    return (
        <div className={classes.root}>
          <div className={classes.info}>
            <Information/>
            <Typography variant={'h6'}>Information</Typography>
          </div>
          <div className={classes.widgetGrid}>
            {items.length > 0 && items.map((item, index) => (
                <div key={index}>
                  {Object.keys(item).map(info => <div key={`${info}-${index}`}>{info}: {item[info]}</div>)}
                </div>
            ))}
          </div>
          {/*        <DropdownMenu
            open={mouseY !== null}
            anchorReference={'anchorPosition'}
            transformOrigin={{vertical: 'top', horizontal: 'left'}}
            anchorPosition={
              mouseY !== null && mouseX !== null
                  ? { top: mouseY, left: mouseX }
                  : undefined
            }
            onClose={this.handleClose}
            options={menuOptions}
        />*/}
          <DropdownMenu
              open={Boolean(anchorEl)}
              anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              options={menuOptions}
          />
          <Fab
              className={classes.addButton}
              color={'secondary'}
              onClick={this.handleClick}
          >
            <Add className={classes.icon}/>
          </Fab>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  content: state.content.items,
  change: state.content.change
})

const mapDispatchToProps = {
  fetchContent
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WidgetsView))