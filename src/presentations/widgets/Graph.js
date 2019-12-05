/**
 * Created by Drita Shujaku on 04/12/2019
 */

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import echarts from 'echarts'

const styles = ({
  root: {
    width: 400,
    height: 320
  }
})

const options = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  }
}

class Graph extends Component {

  chartRef = React.createRef()

  componentDidMount() {
    const { data, type } = this.props
    const chart = echarts.init(this.chartRef.current)
    chart.setOption({
      ...options,
      xAxis: {
        ...options.xAxis,
        data: data.map(item => item.category)
      },
      series: [{
        data,
        type: type.toLowerCase()
      }]
    })
  }

  render() {
    const { classes } = this.props
    return (
        <div className={classes.root} ref={this.chartRef}>

        </div>
    )
  }
}

export default withStyles(styles)(Graph)