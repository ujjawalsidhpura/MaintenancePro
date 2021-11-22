import Confirm_button from "./Buttons/Confirm_button";
import Cancel_button from "./Buttons/Cancel_button";
import axios from "axios";
import { useLocation } from 'react-router-dom'

export default function Start_confirmation(props){
  console.log(useLocation());
  const location = useLocation()
  const id = location.state?.id


  const submit_start_time = (workorder_id) => {
    axios.post('/workorder/started',
    workorder_id,
    { headers: { "Content-Type": "application/json" } })
      .then((res) => {
      console.log(res)
    })
  .catch((e) => console.log(e))
  }

  return (
    <div className="start-confirmation">
      <h1>Are you sure to start?</h1>
      <Confirm_button onClick = {()=>{submit_start_time({workorder_id: id})}}/>
      <Cancel_button/>
    </div>
  )
}