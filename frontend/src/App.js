import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import './star-rating.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';


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

  /* To test POST FORM,make a button and button onclick={save}
  Place button anywhere in the div. Ideally line 95.
  <button onClick={save} > Test </button> 
  This will mimic form submittion with hardcoded data */

  /*
  const save = () => {

    const workorder = {
      email: "ssdfsd@gma.com",
      name: "dtyrtyrtyrd",
      description: "qwerwerq",
      created_on: "2016-03-16T18:00:00Z",
      time_started: null,
      time_completed: null,
      duration: null
    }

    const inventory = {
      category: 'Tools',
      item: 'Wrench',
      price_item: 40,
      quanity: 2
    }

    const newUser = {
      user_name: 'testing new user',
      user_password: 'pass',
      email: 'user@user.come'
    }

    axios.post('/users', newUser)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))

    axios.post('/workorder', workorder,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))

    axios.post('/users', newUser,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
  }
  */

	// const createWorkOrder = () => {
	// 	const workorder = {
  //     email: "ssdfsd@gma.com",
  //     name: "dtyrtyrtyrd",
  //     description: "qwerwerq",
  //     created_on: "2016-03-16T18:00:00Z",
  //     time_started: null,
  //     time_completed: null,
  //     duration: null
  //   }

	// 	axios.post('/workorder', workorder,
  //     { headers: { "Content-Type": "application/json" } })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((e) => console.log(e))
	// }

  return (
		<BrowserRouter>
			<div className="App">
				<div class="columns">
					<div class="column is-one-quarter">
						<MenuList />

					</div>
					<div class="column ">
						<Container 
							workorder={state.workorder} 
							inventory={state.inventory} 
							// createWorkOrder={createWorkOrder}
						/>
					</div>

				</div>

			</div>
		</BrowserRouter>
  )
}

export default App;
