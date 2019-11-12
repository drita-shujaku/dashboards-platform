import { PAGES } from 'Constants'

const routes = (dashboards) => ([
  {
    id: PAGES.DASHBOARDS,
    display: 'Dashboards'
  },
    ...dashboards.map(dashboard => ({
      id: PAGES.DASHBOARDS + `/${dashboard.id}`,
      display: dashboard.name
    }))
])

export default routes