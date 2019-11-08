import React from 'react'

const Page = (props) => {
  console.log('hello', props)
  const { match: { params: { id = '' }} } = props

  return (
      <div>
        {id}
      </div>
  )
}

export default Page