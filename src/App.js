import { hot } from 'react-hot-loader/root'
import React from 'react'

const App = () => {

  const [ array, setArray ] = React.useState([])
  const number = 7

  React.useEffect(() => {
    setArray(Array(number).fill(null).map((number, index) => index + 1))
  }, [number])
  const create = (item, index) => {
    return <div key={`${item} ${index}`}>
      {item}
    </div>
  }
  return (
      <div>
        <h2>Hello, hello! Do you want to play?</h2>
        <h2>YES please!!</h2>
        <h3>What game do you want to play?</h3>
        <h4>Hmm... let's count to {number}!</h4>
        <div>{array.map(create)}</div>
      </div>
  )
}

export default hot(App)
