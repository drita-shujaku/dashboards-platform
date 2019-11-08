import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles, Typography } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { addDashboard } from 'reducers/dashboards/DashboardActions'
import Form, { FormActions } from 'presentations/Form'

const useStyles = makeStyles(({palette, size, spacing, typography}) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    backgroundColor: palette.background.default,
    opacity: 0.8,
    height: '100vh',
    overflow: 'hidden',
    //color: palette.text.default,
  },
  title: {
    fontWeight: typography.fontWeightBold,
    fontSize: '1.70rem'
  },
  header: {
    marginBottom: spacing(5),
    alignSelf: 'flex-start'
  },
  actions: {
    '& > *:not(:last-child)': {
      marginRight: spacing(2)
    }
  }
}))

const CreateProject = (props) => {

  const { addDashboard } = props
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: {pathname: "/" } }
  const [ project, setProject ] = useState({ name: '', description: '' })

  const handleChange = (event) => {
    const {name, value} = event.target
    setProject({...project, [name]: value})
  }

  const saveProject = () => {
    addDashboard(project)
    history.push(from)
  }

  return (
      <div className={classes.root}>
        <Form width={500}>
          <div className={classes.header}>
            <Typography variant={'h5'} className={classes.title}>
              Create new project
            </Typography>
          </div>
          <TextField
              name={'name'}
              label={'Name'}
              variant={'filled'}
              value={project.name}
              autoFocus={true}
              onChange={handleChange}
              fullWidth
          />
          <TextField
              name={'description'}
              label={'Description'}
              variant={'filled'}
              type={'description'}
              value={project.description}
              onChange={handleChange}
              multiline
              fullWidth
              rows={'7'}
          />
          <FormActions justifyContent={'flex-end'} classes={{actions: classes.actions}}>
            <Button
                className={classes.button}
                size={'large'}
                onClick={() => { history.push('/dashboards') }}
            >
              Cancel
            </Button>
            <Button
                className={classes.button}
                color={'secondary'}
                variant={'contained'}
                size={'large'}
                onClick={saveProject}
            >
              Save
            </Button>
          </FormActions>
        </Form>
      </div>
  )
}

const mapDispatchToProps = ({
  addDashboard
})

export default connect(null, mapDispatchToProps)(CreateProject)