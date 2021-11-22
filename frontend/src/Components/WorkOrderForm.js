import { useState, useCallback } from "react"
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import { Navigate } from "react-router-dom";
import FormData from 'form-data';

export default function WorkOrderForm(props) {
  const [state, setState] = useState({
    title: "",
    technician: "",
    description: "",
    importance: 0,
    date: "",
    files: []
  })

  const [submit, setSubmit] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
		console.log("accepted files", acceptedFiles)
    changeState("photos", acceptedFiles)
  }, [state])

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
	
  const handleSubmit = (event) => {

    event.preventDefault()
		const formData = new FormData()
		for (let i = 0; i < acceptedFiles.length; i++) {
		  formData.append('files[]', acceptedFiles[i])
		}
		// let formData = new FormData();
		formData.append("title", state.title)
		formData.append("technician", state.technician)
		formData.append("description", state.description)
		formData.append("importance", state.importance)
		formData.append("files", state.files)
		formData.append("created_on",  new Date().toISOString())
		formData.append("time_started", null)
		formData.append("time_completed", null)
		// formData.set("title", state.title)
		console.log("Form data", formData)
		console.log("new Form data", new FormData())
    // const workorder = {
    //   ...state,
    //   created_on: new Date().toISOString(),
    //   time_started: null,
    //   time_completed: null,
    // }

    // axios.post('/workorder', formdata,
    //   { headers: { "Content-Type": "multipart/form-data" } })
    //   .then((res) => {
    //     // setSubmit(true)
    //   })
    //   .catch((e) => console.log(e))
  }

  const ratings = [1, 2, 3, 4, 5]

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  return (
    <>

      {submit && <Navigate to="/workorders" />}

      {!submit &&
        <form encType="multipart/form-data" className="card workorder-form" autoComplete="off"
          onSubmit={handleSubmit}>
          <h1>Create Work Order</h1>

          <div class="field">
            <label class="label">Title</label>
            <input
              class="input"
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
              type="date"
              value={state.date}
              onChange={(event) => changeState("date", event.target.value)}
            ></input>
          </div>

          <div className="field">
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
          </div>

          <button className="button is-link" type="submit">Submit</button>
        </form>
      }

    </>
  )
}