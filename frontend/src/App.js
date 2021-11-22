import './App.css';
import './star-rating.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';
import tester from './Helpers/helpers';


// <button onClick={tester} > Test </button> 

function App() {

  const [state, setState] = useState({
    workorder: [],
    inventory: []
  })

  useEffect(() => {
    Promise.all(
      [
        axios.get('/workorder'),
        axios.get('/inventory')
      ]
    )
      .then((all) => {
        const workorder = all[0].data
        const inventory = all[1].data
        setState(prev => ({
          ...prev, workorder: [...workorder], inventory: [...inventory]
        }))
      })
  }, [])


  return (
    <div className="App">
      <div class="columns">
        <div class="column is-one-quarter">
          <MenuList />

        </div>
        <div class="column ">
          <Container workorder={state.workorder} inventory={state.inventory} />
          <button onClick={tester} > Test </button>
        </div>
      </div>
    </div>
  )
}

export default App;
