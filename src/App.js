import './App.css';
import './star-rating.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';
import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_ENDPOINT
const socket = io(ENDPOINT, {
  "rejectUnauthorized": false,
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

function App() {

  const [applicationData, setApplicationData] = useState({
    workorder: [],
    inventory: [],
    today: [],
    messages: []
  })

  useEffect(() => {
    Promise.all(
      [
        axios.get('/workorder'),
        axios.get('/inventory'),
        axios.get('/today'),
        axios.get('/messages')
      ]
    )
      .then((all) => {
        const workorder = all[0].data
        const inventory = all[1].data
        const today = all[2].data
        const messages = all[3].data
        setApplicationData(prev => ({
          ...prev, workorder: [...workorder], inventory: [...inventory], today: [...today], messages: [...messages]
        }))
      })
  }, [])



  return (
    <div className="App">
      <MenuList />
      <Container
        workorder={applicationData.workorder}
        inventory={applicationData.inventory}
        today={applicationData.today}
        setApplicationData={setApplicationData}
        messages={applicationData.messages}
        socket={socket}
      />
    </div>
  )
}

export default App;
