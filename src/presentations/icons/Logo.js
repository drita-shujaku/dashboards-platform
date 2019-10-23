import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const Logo = props => {
  return (
      <SvgIcon {...props}  viewBox={'0 0 24 24'}>
        <g>
          <polygon style={{fill: '#3bbae3'}} points="12,4.5 18.5,8.2 22.4,6 12,0 1.6,6 5.5,8.2 	"/>
          <polygon style={{fill: '#1b9ad1'}} points="18.5,8.2 18.5,8.2 18.5,15.7 12,19.4 12,24 22.4,18.1 22.4,6 	"/>
          <polygon style={{fill: '#086c9e'}} points="5.5,20.3 1.6,18.1 1.6,6 5.5,8.2 5.5,20.3 	"/>
        </g>
      </SvgIcon>
  )
}

export default Logo