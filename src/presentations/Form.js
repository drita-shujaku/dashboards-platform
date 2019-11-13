import React from 'react'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

// noinspection JSCheckFunctionSignatures
const useStyles = makeStyles(({palette, spacing, shadows}) => ({
  form: {
    backgroundColor: palette.background.light,
    boxShadow: shadows[4],
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'center',
    maxWidth: 650,
    padding: spacing(5),
    borderRadius: 10,
    '& > *': {
      minWidth: props => props.width - spacing(5)
    },
  },
  body: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: spacing(2)
    }
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: props => props.justifyContent
  },
  warning: {
    color: palette.error.main
  },
}))

export const FormBody = (props) => {

  const { children, message } = props
  const classes = useStyles()

  return (
      <div className={classes.body}>
        {children}
        {!!message && <div className={classes.warning}>
          {message}
        </div>}
      </div>
  )
}

FormBody.propTypes = {
  message: PropTypes.string
}

export const FormActions = (props) => {
  const { children } = props
  const classes = useStyles(props)

  return (
      <div className={classes.actions}>
        {children}
      </div>
  )
}

const justifyContentValues = ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right']

FormActions.propTypes = {
  justifyContent: PropTypes.oneOf(justifyContentValues)
}

FormActions.defaultProps = {
  justifyContent: 'center'
}

const Form = (props) => {
  const { children, onSubmit } = props
  const classes = useStyles(props)

  return (
      <form className={classes.form} onSubmit={onSubmit}>
        {children}
      </form>
  )
}

Form.propTypes = {
  width: PropTypes.number,
  onSubmit: PropTypes.func.isRequired
}

Form.defaultProps = {
  width: 400
}

export default Form
