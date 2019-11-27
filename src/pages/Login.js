import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { Logo, LogoTextIcon } from 'presentations/icons'
import { logIn } from 'reducers/users/UsersActions'
import Form, { FormActions, FormBody } from 'presentations/Form'

const useStyles = makeStyles(({ palette, spacing, size, shadows }) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    //flexFlow: 'row wrap',
    backgroundColor: palette.background.default,
    //opacity: 0.8,
    height: '100%',
    //overflow: 'hidden',
    color: palette.text.default,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: spacing(3)
  },
  icon: {
    width: spacing(6),
    height: spacing(6)
  },
  logoText: {
    width: 70,
    height: spacing(4),
    color: palette.text.primary
  },
  button: {
    textTransform: 'uppercase'
  }
}))

const Login = (props) => {
  const { logIn, user: { token }, authenticated } = props
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const { from } = location.state || { from: { pathname: "/" } }

  const [ user, setUser ] = useState({ username: '', password: '', message: '' })

  const message = {
    empty: 'Please fill in your credentials!'
  }

  useEffect(() => {
    if (token) {
      history.replace(from)
    }
  }, [ token ])


  const displayError = (message) => {
    setUser({ ...user, message })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value, ...(user.message && { message: '' }) })
  }

  const validateUser = (event) => {
    event.preventDefault()
    if (!user.username || !user.password) {
      displayError(message.empty)
    } else {
      logIn(user).then(null, error => {
        displayError(error.message)
      })
    }
  }

  return (
      <div className={classes.root}>
        <Form onSubmit={validateUser}>
          <div className={classes.header}>
            <Logo className={classes.icon}/>
            <LogoTextIcon className={classes.logoText}/>
          </div>
          <FormBody message={user.message}>
            <TextField
                name={'username'}
                label={'Username'}
                variant={'filled'}
                value={user.username}
                autoFocus={true}
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
          </FormBody>
          <FormActions className={classes.actions}>
            <Button
                className={classes.button}
                size={'large'}
                type={'submit'}
            >
              Log in
            </Button>
          </FormActions>
        </Form>
      </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
  invalid: state.session.invalid
})

const mapDispatchToProps = ({
  logIn
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)