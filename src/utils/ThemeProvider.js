import React from 'react'
import Theme from 'utils/Theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const ThemeProvider = (props) => {
  const { children, theme: type } = props
  const theme = createMuiTheme(Theme.getTheme(type))
  console.log('theme', theme)

  return (
      <MuiThemeProvider theme={theme}>
        { children }
      </MuiThemeProvider>
  )
}

export default ThemeProvider