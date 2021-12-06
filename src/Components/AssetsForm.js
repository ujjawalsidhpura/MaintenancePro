import { useState } from "react"
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


export default function AssetsForm(props) {

  const { user } = useAuth0();
  const { setApplicationData, workorder, today, inventory } = props

  const [state, setState] = useState({
    name: '',
    brand: '',
    model: '',
    serial: '',
    last_serviced_on: '',
    next_service_on: '',
    anticipated_life: '',
    installed_on: ''
  })

  const [submit, setSubmit] = useState(false)

  const handleSubmit = (event) => {

    event.preventDefault()
    const asset = {
      ...state
    }

    axios.post('/assets', asset,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/assets')
          .then((res) => {
            setApplicationData(prev => ({
              ...prev, workorder: [...workorder], assets: [...res.data], today: [...today],
              inventory: [...inventory]
            }))
            setSubmit(true)
          })
      })
      .catch((e) => console.log(e))
  }

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  return (
    (user && user.email === "admin@gmail.com") ?
      <>
        {submit && <Navigate to="/assets" />}

        {!submit &&
          <form
            className="card workorder-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-content">
              <h1 className="title">Add Asset</h1>

              <div className="field">
                <label className="label">Name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={state.name}
                  onChange={(event) => changeState("name", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Brand</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Brand"
                  value={state.brand}
                  onChange={(event) => changeState("brand", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Model</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Model"
                  value={state.model}
                  onChange={(event) => changeState("model", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Serial</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Serial"
                  value={state.serial}
                  onChange={(event) => changeState("serial", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Last Serviced On</label>
                <input
                  className="input"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={state.last_serviced_on}
                  onChange={(event) => changeState("last_serviced_on", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Next Service On</label>
                <input
                  className="input"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={state.next_service_on}
                  onChange={(event) => changeState("next_service_on", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Anticipated Life</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Years"
                  value={state.anticipated_life}
                  onChange={(event) => changeState("anticipated_life", event.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Installed On</label>
                <input
                  className="input"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={state.installed_on}
                  onChange={(event) => changeState("installed_on", event.target.value)}
                />
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