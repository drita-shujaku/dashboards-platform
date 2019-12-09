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
import { updateContent, removeContent, synchronize, fetchContent } from 'reducers/content/ContentActions'
import Widget from 'presentations/Widget'
import { GRAPH_TYPE } from 'Constants'
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
    height: '100vh',
    position: 'relative'
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
    type: GRAPH_TYPE.LINE,
    icon: <Line/>
  },
  {
    text: 'Bar Chart',
    type: GRAPH_TYPE.BAR,
    icon: <Bar/>
  },
  {
    text: 'Pie Chart',
    type: GRAPH_TYPE.PIE,
    icon: <Pie/>
  },
  {
    text: 'Treemap',
    type: GRAPH_TYPE.TREEMAP,
    icon: <Treemap/>
  }
]

class WidgetsView extends Component {

  initialState = {
    anchorEl: null
  }

  state = this.initialState

  componentDidMount() {
    const { dashboard, fetchContent } = this.props
    fetchContent(dashboard)
  }

  componentDidUpdate(prevProps, prevState) {
    const { dashboard = {}, fetchContent, change, board, board: { actionId }, synchronize } = this.props
    const { id = '' } = dashboard
    const { dashboard: { id: prevId }, change: prevChange, board: { actionId: prevActionId } } = prevProps
    if (id !== prevId) {
      fetchContent(dashboard)
    }

    if (prevActionId !== actionId) {
      synchronize(board, id)
    }
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({ ...this.initialState })
  }

  addWidget = (type) => {
    // TODO: add initial layout to be at the bottom of the container
    this.addOrUpdate({ type })
  }

  addOrUpdate = (item) => {
    const { updateContent } = this.props
    updateContent(item)
  }

  onDelete = (id) => {
    const { removeContent } = this.props
    removeContent({ id })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const { board } = this.props
    const items = board.content
    return (
        <div className={classes.root}>
          <div className={classes.info}>
            <Information/>
            <Typography variant={'h5'}>Information</Typography>
          </div>
          <div className={classes.widgetGrid}>
            {items.map((item, index) => {
              const layout = item.layout || { x: 0, y: 0}
              const { x = 0, y = 0 } = layout
              return (
                  <Widget
                    key={item.id}
                    x={x} y={y}
                    onLocationChanged={(x, y) => this.addOrUpdate({ ...item, layout: { ...layout, x, y } })}
                    item={item}
                    onDelete={this.onDelete}/>
              )
            })}
          </div>
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
  updateContent,
  removeContent,
  synchronize
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WidgetsView))