import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import Logo from 'presentations/icons/Logo'
import LogoTextIcon from 'presentations/icons/LogoTextIcon'
import { logIn } from 'reducers/users/UsersActions'

const useStyles = makeStyles(({palette}) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    backgroundColor: palette.background.dark,
    opacity: 0.8,
    height: '100vh',
    overflow: 'hidden',
    //color: palette.text.default,
  },
  form: {
    backgroundColor: palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    /*
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',*/
    //maxWidth: 400,
    padding: 32,
    borderRadius: 10,
    '& > *:not(:first-child):not(:last-child)': {
      marginBottom: 16,
      minWidth: 350,
    }
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24
  },
  icon: {
    width: 42,
    height: 42
  },
  logoText: {
    width: 70,
    height: 32
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  button: {
    width: '30%',
    //textTransform: 'uppercase'
  }
}))

const Login = (props) => {
  const { logIn, authenticated } = props
  const classes = useStyles()
  let location = useLocation()
  let history = useHistory()
  let { from } = location.state || { from: { pathname: "/" } }

  const [ user, setUser ] = useState({username: '', password: ''})

  useEffect(() => {
    if(authenticated) {
      history.replace(from)
    }
  }, [authenticated])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({...user, [name]: value})
  }

  const validateUser = (data) => {
    if (!user.username || !user.password) {
      alert('Please enter your credentials!')
    } else {
      logIn(data)
    }
  }

  return (
      <div className={classes.root}>
        <div className={classes.form}>
          <div className={classes.logo}>
            <Logo className={classes.icon}/>
            <LogoTextIcon className={classes.logoText}/>
          </div>
          <TextField
              name={'username'}
              label={'Username'}
              variant={'filled'}
              value={user.username}
              autoFocus={true}
              //InputProps={{disableUnderline:true}}
              fullWidth
              onChange={handleChange}
          />
          <TextField
              name={'password'}
              label={'Password'}
              variant={'filled'}
              type={'password'}
              value={user.password}
              onChange={handleChange}
          />
          <div className={classes.actions}>
            <Button
                className={classes.button}
                color={'secondary'}
                /*variant={'contained'}*/
                size={'large'}
                onClick={() => validateUser(user)}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = ({
  logIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)