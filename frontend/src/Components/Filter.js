import { useState } from "react"

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

	return (
		<form className="card workorder-filter" onSubmit>
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
		</form>
	)
}