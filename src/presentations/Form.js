import React from 'react'
import { makeStyles } from '@material-ui/core'

// noinspection JSCheckFunctionSignatures
const useStyles = makeStyles(({palette, spacing, shadows}) => ({
  form: props => ({
    backgroundColor: palette.background.light,
    boxShadow: shadows[4],
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'center',
    maxWidth: 650,
    padding: spacing(5),
    borderRadius: 10,
    '& > *:not(:first-child):not(:last-child)': {
      marginBottom: spacing(2),
      minWidth: props.width - spacing(5) || 350,
    },
  }),
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: props => props.justifyContent || 'center'
  },
}))

export const FormActions = (props) => {
  const {children} = props
  const classes = useStyles(props)

  return (
      <div className={classes.actions}>
        {children}
      </div>
  )
}

const Form = (props) => {
  const {children} = props
  const classes = useStyles(props)

  return (
      <div className={classes.form}>
        {children}
      </div>
  )
}

export default Form
