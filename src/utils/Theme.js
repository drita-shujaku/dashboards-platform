const theme = (type = 'light') => ({
  type,
  palette: {
    primary: {
      light: '#eaeff1',
      main: '#293642',
      dark: '#334353'
    },
    secondary: {
      //light: '#d8f1f9',
      main: '#3cb9e2',
      dark: '#34576a',
      contrastText: '#ffffff'
    },
    text: {
      default: '#293642',
      primary: '#314151',
      secondary: '#94a6b8'
    },
    background: {
      dark: '#283642'
    },
    field: {
      light: '#d9e0e6',
      dark: '#293642'
    },
    label: '#94A6B8'

  },
  overrides: {
    MuiInputBase: {
      input: {
        color: '#293642',
        backgroundColor: '#d9e0e6',
        borderRadius: 4
      },
      root: {
        '&:hover:not($disabled):before': {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          height: '100%',
          borderRadius: 4
        }
      }
    },
    MuiFilledInput: {
      root: {
        borderRadius: 4
      },
      underline: {
        '&:before, &:after': {
          borderBottom: 'none'
        },
        '&:hover:before': {
          borderBottom: 'none',
        }
      }
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})


const Theme = {
  getTheme: (type) => ({
    ...theme(type)
  })
}

export default Theme