/**
 * Created by Drita Shujaku on 25/11/2019
 */

import React from 'react'
import { Fade, makeStyles, Menu, MenuItem } from '@material-ui/core'

const useStyles = makeStyles(({spacing}) => ({
  root: {},
  cardDropdown: {
    boxShadow: '0px 5px 20px rgb(0, 0, 0, 0.22)',
    padding: spacing(1/2)
  },
  menuItem: {
    '& > *:not(:last-child)': {
      marginRight: spacing()
    }
  },
  icon: {
    width: 16,
    height: 16
  },
}))

const DropdownMenu = (props) => {

  const { onClose, options, ...other } = props

  const classes = useStyles()

  return (
      <Menu
          classes={{ paper: classes.cardDropdown }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          getContentAnchorEl={null}
          TransitionComponent={Fade}
          onClick={onClose}
          onClose={onClose}
          {...other}
      >
        {options.map((item, index) => (
            <MenuItem key={index} className={classes.menuItem} onClick={item.onClick}>
              {item.icon && React.cloneElement(item.icon, { className: classes.icon })}
              <span>{item.text}</span>
            </MenuItem>
        ))}
      </Menu>
  )
}

export default DropdownMenu