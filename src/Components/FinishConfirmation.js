import ConfirmButton from "./Buttons/ConfirmButton";
import CancelButton from "./Buttons/CancelButton";
import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useState } from "react";

export default function FinishConfirmation(props) {
  window.scrollTo(0, 0);
  const location = useLocation()
  const id = location.state?.id

  const [state, setState] = useState('')

  const { setApplicationData, inventory, today } = props;

  const data = {
    remark: state,
    workorder_id: id
  }

  const submitEndTime = (data) => {
    axios.post('/workorder/completed',
      data,
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
      <h2 className="title confirm-mssg">Are you done with this work order?</h2>
      <h3>If yes, then please put your remark before finishing the job.</h3>
      <input
        className="input remark"
        type="text"
        placeholder="Remark"
        value={state}
        onChange={(event) => setState(event.target.value)}
      />
      <div className="confirm-cancel">
        <ConfirmButton onClick={() => { submitEndTime(data) }} />
        <CancelButton />
      </div>
    </div>
  )
}