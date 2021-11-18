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


  return (
    <div className="App">

      <section>
        <MenuList />
      </section>

      <section>
        <Container />
      </section>

    </div>
  )
}

export default App;
