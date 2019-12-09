import React, { Component } from 'react'

const Draggable = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      const { x, y } = props
      this.state = {
        x: x || 0,
        y: y || 0
      }
    }

    componentDidMount () {
      document.addEventListener("mousemove", this.onMouseMove)
      document.addEventListener("mouseup", this.onMouseUp)
    }

    componentWillUnmount () {
      document.removeEventListener("mousemove", this.onMouseMove)
      document.removeEventListener("mouseup", this.onMouseUp)
    }

    onMouseDown = (event) => {
      event.preventDefault()
      let pageX = event.pageX
      let pageY = event.pageY
      const { x, y } = this.state
      this.setState({
        location: {
          x: pageX - x,
          y: pageY - y
        }
      })
    }

    onMouseMove = (event) => {
      const { location } = this.state
      if (!location) {
        return
      }
      event.preventDefault()

      const { pageX, pageY } = event
      this.setState({
        x: pageX - location.x,
        y: pageY - location.y
      })
    }

    onMouseUp = (event) => {
      event.preventDefault()
      this.setState({
        location: undefined
      })

      const { onLocationChanged } = this.props
      if (!!onLocationChanged) {
        const { x, y } = this.state
        onLocationChanged(x, y)
      }
    }

    render() {
      const { x, y } = this.state
      const listeners = {
        onMouseDown: this.onMouseDown,
        onMouseMove: this.onMouseMove,
        onMouseUp: this.onMouseUp
      }
      console.log('x', x, 'y', y)
      return <Component {...listeners} {...this.props} x={x} y={y} />
    }
  }
}

export default Draggable
