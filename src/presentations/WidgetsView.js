/**
 * Created by Drita Shujaku on 25/11/2019
 */

import React, { Component } from 'react'
import { Fab, withStyles } from '@material-ui/core'
import { Note, Image, Line, Bar, Pie, Treemap } from 'presentations/icons'
import DropdownMenu from 'presentations/DropdownMenu'
import { Add } from '@material-ui/icons'
import Information from 'presentations/icons/Information'

const styles = ({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.primary.main,
    //padding: spacing(),
    height: '100vh',
    position: 'relative',

    padding: `${spacing()}px 0`,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: spacing()
    }
  },
  addButton: {
    position: 'absolute',
/*    right: spacing(),
    bottom: spacing(4),*/
    right: spacing(6),
    bottom: spacing(4),
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

    return (
        <div className={classes.root}>
          <div className={classes.info}>
            <Information/>
            <span>Information</span>
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

export default withStyles(styles)(WidgetsView)