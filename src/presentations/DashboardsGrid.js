/**
 * Created by Drita Shujaku on 14/11/2019
 */

import React, { useState } from 'react'
import { Fab, makeStyles } from '@material-ui/core'
import DashboardCard from 'presentations/DashboardCard'
import DropdownMenu from 'presentations/DropdownMenu'
import { Delete, Edit } from 'presentations/icons'
import { Add } from '@material-ui/icons'
import DashboardListItem from 'presentations/DashboardListItem'

const useStyles = makeStyles(({ spacing, size }) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    minHeight: '100vh',
    padding: `${spacing()}px 0`,
    alignContent: 'flex-start',
    '& > *': {
      margin: spacing(2),
      marginLeft: 0,
      marginTop: 0
    }
  },
  list: {
    width: '100%',
    '& > *': {
      marginTop: spacing(),
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& > *:not(:first-child)': {
      paddingLeft: spacing(5)
    }
  },
  addButton: {
    position: 'fixed',
    right: spacing(6),
    bottom: spacing(4)
  }
}))

const DashboardsGrid = (props) => {

  const { dashboards, onEdit, onDelete, ...rest } = props
  const listView = rest.view === 'list'
  const classes = useStyles()

  const Item = listView ? DashboardListItem : DashboardCard

  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ currentDashboard, setCurrentDashboard ] = useState(null)

  const handleClick = (event, dashboard) => {
    setCurrentDashboard(dashboard)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const cardMenu = [
    {
      text: 'edit',
      icon: <Edit/>,
      onClick: () => onEdit(currentDashboard)
    },
    {
      text: 'delete',
      icon: <Delete/>,
      onClick: () => onDelete(currentDashboard)
    }
  ]

  const renderDashboards = (dashboards, level) => {
    return dashboards.map((dashboard, index) => {
      return (
          <div className={classes[rest.view]} key={index}>
            <Item
                key={`dashboard-${dashboard.id}`}
                dashboard={dashboard}
                handleClick={handleClick}
                {...rest}
            />
            {listView && level < 1 && renderDashboards(dashboard.children, level + 1)}
          </div>)
    })
  }

  return (
      <div className={classes.root}>
        {renderDashboards(dashboards, 0)}
        <DropdownMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            options={cardMenu}
        />
        <Fab
            className={classes.addButton}
            color={'secondary'}
            onClick={() => onEdit()}
        >
          <Add/>
        </Fab>
      </div>
  )
}
export default DashboardsGrid