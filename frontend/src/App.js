import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
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

  /* To test POST FORM,make a button and button onclick={save}
  Place button anywhere in the div. Ideally line 95.
  <button onClick={save} > Test </button> 
  This will mimic form submittion with hardcoded data */

  const save = () => {

    // const workorder = {
    //   email: "ujay@gmail.com",
    //   name: "Ujjawal Sidhpura",
    //   description: "zcvxber6456",
    //   created_on: "2016-03-16T18:00:00Z",
    //   time_started: null,
    //   time_completed: null,
    //   duration: null
    // }

    // axios.post('/workorder', workorder,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => console.log(e))

    // const inventory = {
    //   category: 'Tools',
    //   item: 'Wrench',
    //   price_item: 40,
    //   quanity: 2
    // }

    // axios.post('/inventory', inventory,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => console.log(e))

    // const newUser = {
    //   user_name: 'testing new user',
    //   user_password: 'pass',
    //   email: 'user@user.come'
    // }
    // axios.post('/users', newUser,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => console.log(e))

    // const queryData = {
    //   to_date: "2021-11-20",
    //   from_date: "2021-03-16"
    // }
    // axios.post('/workorder/range', queryData,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((e) => console.log(e))

    // const queryData = {
    //   tech_name: "Ujjawal sidhpura",
    //   to_date: "2021-11-20",
    //   from_date: "2021-03-16"
    // }
    // axios.post('/workorder/technicianAndRange', queryData,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((e) => console.log(e))

    // const start_clicked = {
    //   workorder_id: "6197dc385b64958f9f41ab1f"
    // }

    // axios.post('/workorder/started',
    //   start_clicked,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => console.log(e))

    // const completed_click = {
    //   workorder_id: "6197dc385b64958f9f41ab1f"
    // }

    // axios.post('/workorder/completed',
    //   completed_click,
    //   { headers: { "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => console.log(e))
  }


  return (
    <div className="App">
      <div class="columns">
        <div class="column is-one-quarter">
          <MenuList />
          <button onClick={save} > Test </button>
        </div>
        <div class="column ">
          <Container workorder={state.workorder} inventory={state.inventory} />

        </div>
      </div>
    </div>
  )
}

export default App;
