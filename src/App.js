import './App.css';
import './star-rating.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuList from './Components/MenuList';
import Container from './Components/Container';


function App(props) {
  const [applicationData, setApplicationData] = useState({
    workorder: [],
    inventory: [],
    today: []
  })

  useEffect(() => {
    Promise.all(
      [
        axios.get('/workorder'),
        axios.get('/inventory'),
        axios.get('/today')
      ]
    )
      .then((all) => {
        const workorder = all[0].data
        const inventory = all[1].data
        const today = all[2].data
        setApplicationData(prev => ({
          ...prev, workorder: [...workorder], inventory: [...inventory], today: [...today]
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
			/>
    </div>
  )
}

export default App;
