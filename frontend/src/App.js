import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import './star-rating.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';
import tester from './Helpers/helpers';

// Tester is a helper function that mimics all get and post requests. We will route our requests from that File. 
// <button onClick={tester} > Test </button> is for testing 

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
        console.log(all[0].data)
        console.log(all[1].data)
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
          <button onClick={tester} > Test </button>
        </div>
        <div class="column ">
          <Container workorder={state.workorder} inventory={state.inventory} />

        </div>
      </div>
    </div>
  )
}

export default App;
