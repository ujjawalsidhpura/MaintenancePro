import { useState } from "react"
import axios from "axios";

export default function Filter(props) {
	const [state, setState] = useState({
		title: "",
    tech_name: "",
    from_date: "",
    to_date: "",
	})

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

	const handleSubmit = (event) => {
		event.preventDefault();
		// Range only
		axios.post('/workorder/filter', state,
		{ headers: { "Content-Type": "application/json" } })
		.then((res) => {
			console.log(res.data)
		})
		.catch((e) => console.log(e))
		// if (!state.title && !state.tech_name) {
		// 	axios.post('/workorder/range', state,
		// 	{ headers: { "Content-Type": "application/json" } })
		// 	.then((res) => {
		// 		console.log(res.data)
		// 	})
		// 	.catch((e) => console.log(e))
		// } else if (!state.title) {
		// 	axios.post('/workorder/technicianAndRange', state,
    // 	{ headers: { "Content-Type": "application/json" } })
    // 	.then((res) => {
    // 	  console.log(res.data)
    // 	})
    // 	.catch((e) => console.log(e))
		// } else if (!state.tech_name && !state.from_date && !state.to_date){
		// 	axios.post('/workorder/title', state,
    // 	{ headers: { "Content-Type": "application/json" } })
    // 	.then((res) => {
    // 	  console.log(res.data)
    // 	})
    // 	.catch((e) => console.log(e))
		// } else if (!state.title && !state.from_date && !state.to_date){
		// 	axios.post('/workorder/technician', state,
    // 	{ headers: { "Content-Type": "application/json" } })
    // 	.then((res) => {
    // 	  console.log(res.data)
    // 	})
    // 	.catch((e) => console.log(e))
		// }
	}

	return (
		<form className="card workorder-filter" onSubmit={handleSubmit}>
			<div>
				<h2>Filter Workorders</h2>
			</div>
			<div>
				<label className="label">Technician name:</label>
				<input 
					class="input" 
					type="text" placeholder="Text input" 
					value={state.tech_name}
    	    onChange={(event) => changeState("tech_name", event.target.value)}
				/>
			</div>
			<div>
				<label className="label">WorkOrder Title:</label>
				<input 
					class="input" 
					type="text" placeholder="Text input" 
					value={state.title}
    	    onChange={(event) => changeState("title", event.target.value)}
				/>
			</div>
			<div>
    	  <label className="label">Date</label>
    	  <label className="label">From</label>
    	  <input
    	    type="date"
    	    value={state.from_date}
    	    onChange={(event) => changeState("from_date", event.target.value)}
    	  ></input>
    	  <label className="label">To</label>
    	  <input
    	    type="date"
    	    value={state.to_date}
    	    onChange={(event) => changeState("to_date", event.target.value)}
    	  ></input>
    	</div>
			<button className="button is-link" type="submit">Submit</button>
		</form>
	)
}