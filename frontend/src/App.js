import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';
import tester from './Helpers/helpers';


function App() {

  const [state, setState] = useState({
    workorder: null,
    inventory: null
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
          ...prev, workorder, inventory
        }))
      })
  }, [])

  /* To test POST FORM,make a button and button onclick={save}
  Place button anywhere in the div. Ideally line 95.
  <button onClick={save} > Test </button> 
  This will mimic form submittion with hardcoded data */


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
