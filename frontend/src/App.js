import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';


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

  //To test POST FORM,make a button and button onclick={save}
  // const save = () => {

  //   const workorder = {
  //     "email": "sdfsdfsdf@gma.com",
  //     "name": "dddghfghdd",
  //     "description": "testing post eh another",
  //     "created_on": "2016-03-16T16:00:00Z",
  //     "time_started": null,
  //     "time_completed": null,
  //     "duration": null
  //   }

  //   const inventory = {
  //     category: 'Tools',
  //     item: 'Screw driver',
  //     price_item: 20,
  //     quanity: 4
  //   }

  //   axios.post('/inventory', inventory,
  //     { headers: { "Content-Type": "application/json" } })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((e) => console.log(e))

  //   axios.post('/workorder', workorder,
  //     { headers: { "Content-Type": "application/json" } })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((e) => console.log(e))
  // }

  return (
    <div className="App">
      <div class="columns">
        <div class="column is-one-quarter">
          <MenuList />

        </div>
        <div class="column ">
          <Container workorder={state.workorder} inventory={state.inventory} />

        </div>

      </div>
    </div>
  )
}

export default App;
