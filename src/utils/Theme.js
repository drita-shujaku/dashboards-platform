const palette = {
  light: {
    primary: {
      //light: '#eaeff1',
      light: '#283642',
      main: '#293642',
      dark: '#334353',
      //dark: '#00101b',
      //dark: '#2B7285',
      contrastText: '#fffff'
    },
    secondary: {
      light: '#50c0e5',
      main: '#3cb9e2',
      //dark: '#38aed4',
      dark: '#0093BB',
      contrastText: '#ffffff'
    },
    text: {
      default: '#293642',
      primary: '#314151',
      secondary: '#94a6b8'
    },
    background: {
      light: '#ffffff',
      main: '#eaeff1',
      default: '#283642cc',
      dark: '#94A6B8'
    },
    field: {
      light: '#d9e0e6',
      dark: '#293642'
    },
    label: '#94A6B8',
    switcher: '#a3b3c2'
  },
  dark: {
    primary: {
      //light: '#eaeff1',
      light: '#283642',
      main: '#293642',
      dark: '#73818F',
      //dark: '#34576A',
      //dark: '#10161a',
      contrastText: '#94a6b8'
    },
    secondary: {
      light: '#50c0e5',
      main: '#3cb9e2',
      //dark: '#38aed4',
      dark: '#0093BB',
      contrastText: '#ffffff'
    },
    text: {
      default: '#94a6b8',
      primary: '#314151',
      //primary: '#293642',
      //primary: '#314151',
      secondary: '#94A6B8'
    },
    background: {
      light: '#8ca0b3',
      main: '#334353',
      default: '#334353'
    },
    field: {
      light: '#d9e0e6',
      dark: '#293642'
    },
    label: '#94A6B8',
    switcher: '#3cb9e2'
  }
}

const theme = (type = 'light') => ({
  type,
  palette: {
    ...palette[type]
  },
  size: {
    displayFont: 48,
    avatar: 48,
    headingFont: 28,
    icon: 24,
    headerFont: 22,
    titleFont: 16,
    defaultFont: 14,
    captionFont: 12,
    smallFont: 10,
    radius: 4,
    drawer: 300
  },
  overrides: {
    MuiInputBase: {
      input: {
        color: type === 'light' ? '#293642' : '#94a6b8',
        backgroundColor: type === 'light' ? '#d9e0e6' : '#293642',
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
        backgroundColor: type === 'light' ? '#d9e0e6' : '#293642',
        borderRadius: 4,
        '&:hover:not($disabled), &$focused': {
          backgroundColor: type === 'light' ? '#d9e0e6' : '#293642',
        },
      },
      underline: {
        '&:before, &:after': {
          borderBottom: 'none'
        },
        '&:hover:before': {
          borderBottom: 'none',
        }
      }
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
})


const Theme = {
  getTheme: (type) => ({
    ...theme(type)
  })
}

export default Theme

/* primary: {
      light: '#00101b',
      main: '#293642',
      //dark: '#334353',
      dark: '#00101b',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#50c0e5',
      main: '#3cb9e2',
      //dark: '#38aed4',
      dark: '#0093BB',
      contrastText: '#ffffff'
    },
    text: {
      default: '#293642',
      primary: '#314151',
      secondary: '#94a6b8'
    },
    background: {
      dark: '#283642',
      main: '#eaeff1',
      light: '#d9e0e6'
    },
    field: {
      light: '#d9e0e6',
      dark: '#293642'
    },
    label: '#94A6B8'
  }*/