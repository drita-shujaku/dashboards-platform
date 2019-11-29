import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { addDashboard } from 'reducers/dashboards/DashboardActions'
import Form, { FormActions, FormBody } from 'presentations/Form'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({ palette, zIndex, spacing, typography }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    //flexFlow: 'row wrap',
    backgroundColor: palette.background.default,
    //opacity: 0.8,
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: zIndex.modal,
    color: palette.text.primary,
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
  },
}))

const ProjectForm = (props) => {

  const { addDashboard, onClose, parent, dashboard } = props
  const { name = '', description = '' } = dashboard
  const classes = useStyles()

  const [ project, setProject ] = useState({ name, description, warning: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setProject({ ...project, [name]: value, warning: '' })
  }

  const saveProject = (event) => {
    event.preventDefault()
    const { name, description } = project
    if (!(name && description)) {
      setProject({ ...project, warning: 'Please fill out all the fields!' })
    } else {
      addDashboard({
        ...dashboard,
        ...(!!parent && { parentId: parent.id }),
        name,
        description
      })
      onClose()
    }
  }

  return (
      <div className={classes.root}>
        <Form width={500} onSubmit={saveProject}>
          <div className={classes.header}>
            <Typography variant={'h5'} className={classes.title}>
              {!!dashboard.name ? 'Edit project' : 'Create new project'}
            </Typography>
          </div>
          <FormBody message={project.warning}>
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
          </FormBody>
          <FormActions justifyContent={'flex-end'} classes={{ actions: classes.actions }}>
            <Button
                className={classes.button}
                size={'large'}
                onClick={onClose}
            >
              Cancel
            </Button>
            <Button
                className={classes.button}
                color={'secondary'}
                variant={'contained'}
                size={'large'}
                type={'submit'}
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

ProjectForm.propTypes = {
  parent: PropTypes.object,
  dashboard: PropTypes.object,
  onClose: PropTypes.func
}

export default connect(null, mapDispatchToProps)(ProjectForm)