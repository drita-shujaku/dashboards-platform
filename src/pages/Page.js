import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Page = (props) => {

  const { match: { params: { id = '' }}, dashboards } = props

  const makeBreadcrumbs = (dashboard, breadcrumbs = []) => {
    breadcrumbs = [ dashboard, ...breadcrumbs ]
    if (!!dashboard.parentId) {
      dashboard = dashboards.find(item => item.id === dashboard.parentId)
      breadcrumbs = makeBreadcrumbs(dashboard, breadcrumbs)
    }
    return breadcrumbs
  }

  const selectedDashboard = dashboards.find(dashboard => dashboard.id === id)

  const breadcrumbs = makeBreadcrumbs(selectedDashboard)

  return (
      <div>
        {breadcrumbs.map((breadcrumb, index) => {
          let separator = index < breadcrumbs.length - 1 ? ' / ' : ''
          return <span key={index} ><NavLink to={`/dashboards/${breadcrumb.id}`}>{breadcrumb.name}</NavLink>{separator}</span>
        })}
      </div>
  )
}

const mapStateToProps = (state) => ({
  dashboards: state.dashboards.items
})

export default connect(mapStateToProps)(Page)