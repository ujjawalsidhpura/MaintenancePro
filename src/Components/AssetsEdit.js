import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AssetsEdit(props) {

  window.scrollTo(0, 0);
  const location = useLocation()
  const assetData = location.state?.props

  const { setApplicationData } = props;
  const [state, setState] = useState(assetData.props)

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  const [submit, setSubmit] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      ...state
    }

    axios.post('/assets/edit',
      data,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/assets')
          .then((res) => setApplicationData(prev => ({
            ...prev, assets: [...res.data]
          })))
        setSubmit(true)
      })
      .catch((e) => console.log(e))
  }

  return (
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
        </form>}
    </>
  )
}