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
import { addContent, fetchContent } from 'reducers/content/ContentActions'
import Widget from 'presentations/Widget'
import { isArrayEqual } from 'utils/helper-functions'

const styles = ({ palette, spacing, zIndex }) => ({
  root: {
    //backgroundColor: palette.primary.main,
    //padding: spacing(),
    //height: 'calc(100vh - 5%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(1, 0),
    marginBottom: spacing(2)
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing(2),
    '& > *': {
      marginRight: spacing()
    }
  },
  widgetGrid: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    '& > *': {
      marginRight: spacing(2),
      marginBottom: spacing(2),
      width: 'fit-content',
      height: 'fit-content'
    }
  },
  addButton: {
    position: 'absolute',
    right: spacing(2),
    bottom: spacing(3),
    zIndex: zIndex.modal + 1
  }
})

const menuOptions = [
  {
    text: 'Note',
    type: 'TEXT',
    icon: <Note/>
  },
  {
    text: 'Image',
    type: 'IMAGE',
    icon: <Image/>
  },
  {
    text: 'Line Chart',
    type: 'LINE',
    icon: <Line/>
  },
  {
    text: 'Bar Chart',
    type: 'BAR',
    icon: <Bar/>
  },
  {
    text: 'Pie Chart',
    type: 'PIE',
    icon: <Pie/>
  },
  {
    text: 'Treemap',
    type: 'TREE',
    icon: <Treemap/>
  }
]

class WidgetsView extends Component {

  initialState = {
    anchorEl: null
  }

  state = this.initialState

  content = (type) => {
    switch (type) {
      case 'LINE':
      case 'BAR':
      case 'PIE':
      case 'TREE':
        return {
          data: [ { category: 'Male', value: 43 }, { category: 'Female', value: 56 }, { category: 'Other', value: 1 } ]
        }
      case 'IMAGE':
        return { url: 'https://images.unsplash.com/photo-1522124624696-7ea32eb9592c' }
      case 'TEXT':
        return { text: 'Lorem Ipsum' }
      default:
        return {}
    }
  }

  componentDidMount() {
    const { dashboard, fetchContent } = this.props
    fetchContent(dashboard)
  }

  componentDidUpdate(prevProps, prevState) {
    const { dashboard = {}, fetchContent, change } = this.props
    const { id = '' } = dashboard
    const { dashboard: { id: prevId } } = prevProps
    //console.log('id', id, 'prevId', prevId)
    //console.log('detect change', change)
    // !isArrayEqual(content, prevContent)
    if (id !== prevId || change) {
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

  addWidget = (type) => {
    const { addContent, board, dashboard: { id } } = this.props
    const itemsToAdd = {
      dashboardId: id,
      ...board,
      content: [
        ...board.content,
        {
          type,
          ...this.content(type)
        }
      ]
    }
    console.log('itemsToAdd', itemsToAdd)
    addContent(itemsToAdd)

  }

  render() {
    const { classes } = this.props
    const { mouseX, mouseY, anchorEl } = this.state
    //console.log('x:', mouseX, 'y:', mouseY)
    const { board } = this.props
    const items = board.content
    console.log('content', board)
    console.log('items', items)

    return (
        <div className={classes.root}>
          <div className={classes.info}>
            <Information/>
            <Typography variant={'h5'}>Information</Typography>
          </div>
          <div className={classes.widgetGrid}>
            {items.map((item, index) => (
                <Widget key={index} item={item}/>
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
              options={menuOptions.map(item => ({ ...item, onClick: () => this.addWidget(item.type) }))}
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
  board: state.content.board,
  change: state.content.change
})

const mapDispatchToProps = {
  fetchContent,
  addContent
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WidgetsView))