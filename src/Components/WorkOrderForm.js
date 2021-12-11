import { Fragment, useState } from "react"
import axios from 'axios'
import { Navigate } from "react-router-dom";
import sendMail from "../Emailer/mailgun";
import { useAuth0 } from '@auth0/auth0-react';
// import { useDropzone } from 'react-dropzone';

export default function WorkOrderForm(props) {
  window.scrollTo(0, 0);
  const { user } = useAuth0();

  const { setApplicationData, inventory, today, assets } = props

  const [state, setState] = useState({
    title: "",
    technician: "",
    email: "",
    description: "",
    importance: 0,
    date: "",
    files: []
  })

  const [submit, setSubmit] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    // As more technicians are added, more emails will be added.
    // eslint-disable-next-line no-unused-expressions
    state.technician === 'Technician One' ? state.email = 'maintenanceprotechnicianone@gmail.com' : null
    // eslint-disable-next-line no-unused-expressions
    state.technician === 'Technician Two' ? state.email = 'maintenanceprotechniciantwo@gmail.com' : null

    const workorder = {
      ...state,
      created_on: new Date().toISOString(),
      time_started: null,
      time_completed: null,
    }

    axios.post('/workorder', workorder,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/workorder')
          .then((res) => {
            setApplicationData(prev => ({
              ...prev, workorder: [...res.data], inventory: [...inventory], today: [...today], assets: [...assets]
            }))
            setSubmit(true)
          })

      })
      .then(() => {
        //Sends Email to the Technician with Workorder details
        const message = {
          from: 'Admin <admin@maintenancePro.com>',
          to: state.email,
          subject: `MaintenancePro New WorkOrder: ${state.title}`,
          text:
            `
          Hello ${state.technician}, there has been a new work request for you. \n
          Description: ${state.description}. \n
          Deadline is ${state.date}. \n
          Please check your workorders in MaintenancePro and proceed.\n
          Regards, \n
          Admin, MaintenancePro
          `
        };

        sendMail(message)

      })
      .catch((e) => console.log(e))

  }

  const ratings = [1, 2, 3, 4, 5]

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  return (
    (user && user.email === "maintanenceproadm@gmail.com") ?
      <>

        {submit && <Navigate to="/workorders" />}

        {!submit &&
          <form
            encType="multipart/form-data"
            className="card workorder-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-content">

              <h1 className="title">Create Work Order</h1>

              <div className="field">
                <label className="label">Title</label>
                <input

                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={state.title}
                  onChange={(event) => changeState("title", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Assign to</label>
                <div className="select">
                  <select value={state.technician} onChange={(event) => changeState("technician", event.target.value)}>
                    <option key="select" disabled value="">Select Technician</option>
                    <option key="Technician One">Technician One</option>
                    <option key="Technician Two">Technician Two</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <textarea
                  className="textarea"
                  placeholder="Textarea"
                  value={state.description}
                  onChange={(event) => changeState("description", event.target.value)}
                ></textarea>
              </div>

              <div className="field">
                <label className="label">Importance</label>
                <span className="star-rating">
                  {ratings.map((rating, index) =>
                  (<Fragment key={index}><input
                    key={index}
                    type="radio"
                    name="rating1"
                    value={rating}
                    onClick={() => changeState("importance", rating)}
                  /><i></i></Fragment>)
                  )}
                </span>
              </div>

              <div className="field">
                <label key="label" className="label">Deadline</label>
                <input
                  key="input"
                  className="input"
                  type="date"
                  value={state.date}
                  onChange={(event) => changeState("date", event.target.value)}
                ></input>
              </div>

              <button className="button is-link submit" type="submit">Submit</button>
            </div>
            <div className="form-image">
              <img src="https://image.freepik.com/free-vector/illustration-characters-fixing-cogwheel_53876-40796.jpg" alt="form" />
            </div>
          </form>
        }

      </> : <></>
  )
}