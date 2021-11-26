import ConfirmButton from "./Buttons/ConfirmButton";
import CancelButton from "./Buttons/CancelButton";
import axios from "axios";
import { useLocation } from 'react-router-dom'

export default function FinishConfirmation(props) {
  const location = useLocation()
  const id = location.state?.id

  const { setApplicationData, inventory, today } = props;

  const submitEndTime = (workorder_id) => {
    axios.post('/workorder/completed',
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
      <h1 className="title confirm-mssg">Are you done with this work order?</h1>
      <div className="confirm-cancel">
        <ConfirmButton onClick={() => { submitEndTime({ workorder_id: id }) }} />
        <CancelButton />
      </div>
    </div>
  )
}