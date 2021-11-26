import { useState } from "react"
import axios from 'axios'
import { Navigate } from "react-router-dom";
import sendMail from "../Emailer/mailgun"
// import { useDropzone } from 'react-dropzone';

export default function WorkOrderForm(props) {

  const { setApplicationData, inventory, today } = props

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

  // const onDrop = useCallback(acceptedFiles => {
  //   changeState("files", acceptedFiles)
  // }, [state])

  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const handleSubmit = (event) => {
    event.preventDefault()

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
              ...prev, workorder: [...res.data], inventory: [...inventory], today: [...today]
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
                  <option disabled value="">Select Technician</option>
                  <option>Ebuka Moneme</option>
                  <option>Shuhao Zhang</option>
                  <option>Ujjawal Sidhpura </option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">Email to</label>
              <div className="select">
                <select value={state.email} onChange={(event) => changeState("email", event.target.value)}>
                  <option disabled value="">Select Technician</option>
                  <option>camoneme@gmail.com</option>
                  <option>shuhaozhangchris@gmail.com</option>
                  <option>ujjawalsidhpura@gmail.com</option>
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
                {ratings.map(rating =>
                (<><input
                  key={rating}
                  type="radio"
                  name="rating1"
                  value={rating}
                  onClick={() => changeState("importance", rating)}
                /><i></i></>)
                )}
              </span>
            </div>

            <div className="field">
              <label className="label">Deadline</label>
              <input
                className="input"
                type="date"
                value={state.date}
                onChange={(event) => changeState("date", event.target.value)}
              ></input>
            </div>

            {/* <div className="field">
							<label className="label">Files</label>

							<section className="file-container">
								<div {...getRootProps({ className: 'dropzone' })}>
									<input {...getInputProps()} />
									<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
								<aside>
									<h4>Files</h4>
									<ul>{files}</ul>
								</aside>
							</section>
						</div> */}

            <button className="button is-link submit" type="submit">Submit</button>
          </div>
          <div className="form-image">
            <img src="https://image.freepik.com/free-vector/illustration-characters-fixing-cogwheel_53876-40796.jpg" alt="form" />
          </div>
        </form>
      }

    </>
  )
}