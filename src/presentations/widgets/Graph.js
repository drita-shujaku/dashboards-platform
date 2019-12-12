/**
 * Created by Drita Shujaku on 04/12/2019
 */

import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import echarts from 'echarts'
import { GRAPH_TYPE } from 'Constants'
import clsx from 'clsx'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: props => props.width || 420,
    height: props => props.height || 320,
    margin: spacing()
  }
}))


const configureGraph = (type, data) => {
  switch (type) {
    case GRAPH_TYPE.LINE:
    case GRAPH_TYPE.BAR:
      return {
        xAxis: {
          type: 'category',
          data: data.map(item => item.name),
          axisLabel: {
            rotate: data.length > 3 ? -45 : 0,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
        }
      }
    default:
      return {}
  }
}

const Graph = (props) => {

  const { data, type, id } = props

  const classes = useStyles(props)

  const chartRef = useRef(null)
  let chart = null

  useEffect(() => {
    chart = echarts.init(chartRef.current)
    chart.setOption({
      ...configureGraph(type, data),
      series: [ {
        name: 'Data',
        data,
        type: type.toLowerCase()
      } ]
    })
    return () => {
      chart.dispose()
      chart = null
    }
  }, [])


  return (
      <div className={clsx(classes.root, id)} ref={chartRef}/>
  )

}

export default Graph