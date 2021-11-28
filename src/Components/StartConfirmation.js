import ConfirmButton from "./Buttons/ConfirmButton";
import CancelButton from "./Buttons/CancelButton";
import axios from "axios";
import { useLocation } from 'react-router-dom'

export default function StartConfirmation(props) {
	window.scrollTo(0, 0);
  const location = useLocation()
  const id = location.state?.id
  const { setApplicationData, today, inventory } = props;
  const submit_start_time = (workorder_id) => {
    axios.post('/workorder/started',
      workorder_id,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/workorder')
          .then((res) => setApplicationData(prev => ({
            ...prev, workorder: [...res.data], inventory: [...inventory], today: [...today]
          })))
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="card start-confirmation">
      <h1 className="title">Are you ready to start?</h1>
      <div className="confirm-cancel">
        <ConfirmButton onClick={() => { submit_start_time({ workorder_id: id }) }} />
        <CancelButton />
      </div>
    </div>
  )
}