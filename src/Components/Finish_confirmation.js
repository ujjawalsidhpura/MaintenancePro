import Confirm_button from "./Buttons/Confirm_button";
import Cancel_button from "./Buttons/Cancel_button";
import axios from "axios";
import { useLocation } from 'react-router-dom'

export default function Finish_confirmation(props){
  const location = useLocation()
  const id = location.state?.id

  const { setApplicationData, inventory, today} = props;

  const submit_end_time = (workorder_id) => {
    axios.post('/workorder/completed',
      workorder_id,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/workorder')
             .then((res)=>setApplicationData(prev => ({
              ...prev, workorder: [...res.data], inventory: [...inventory], today: [...today]
            })))
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="card start-confirmation">
      <h1 className="title">Are you done with this work order?</h1>
			<div className="confirm-cancel">
				<Confirm_button onClick = {()=>{submit_end_time({workorder_id: id})}}/>
				<Cancel_button/>
			</div>
    </div>
  )
}