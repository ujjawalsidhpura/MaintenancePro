import { useState } from "react"
import WorkOrderItems from "./WorkOrderItems"

export default function WorkOrderContainer(props) {
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
	}

	const validState = () => {
		return state.title || state.tech_name || state.from_date || state.to_date
	}

	const handleQuery = (workOrder) => {
		let query;
		if (state.title && !state.tech_name && !state.from_date && !state.to_date) {
			query = workOrder.props.title.toLowerCase().includes(state.title.toLowerCase())
		}
		if (!state.title && state.tech_name && !state.from_date && !state.to_date) {
			query = workOrder.props.technician.toLowerCase().includes(state.tech_name.toLowerCase())
		}
		if (state.title && state.tech_name && !state.from_date && !state.to_date) {
			query = workOrder.props.technician.toLowerCase().includes(state.tech_name.toLowerCase()) && workOrder.props.title.toLowerCase().includes(state.title.toLowerCase())
		}
		if (!state.title && !state.tech_name && state.from_date && !state.to_date) {
			query = workOrder.props.created_on >= (state.from_date)
		}
		if (!state.title && !state.tech_name && !state.from_date && state.to_date) {
			query = workOrder.props.created_on <= (state.to_date)
		}
		if (!state.title && !state.tech_name && state.from_date && state.to_date) {
			query = workOrder.props.created_on <= (state.to_date) && workOrder.props.created_on >= (state.from_date)
		}
		if (state.title && state.tech_name && state.from_date && state.to_date) {
			query = workOrder.props.created_on <= (state.to_date) && workOrder.props.created_on >= (state.from_date) &&
			workOrder.props.technician.toLowerCase().includes(state.tech_name.toLowerCase()) && workOrder.props.title.toLowerCase().includes(state.title.toLowerCase())
		}
		// multiple possibilities can tackle later
		return query;
	}

	console.log("Props:", props)
	const parsedWorkOrders = props.workorder.map(workOrder => {
		return (<WorkOrderItems {...workOrder} key={workOrder._id}/>)
	}).reverse()
	
	const parsedWorkOrdersByQuery = validState() && parsedWorkOrders.filter(workOrder => 
		handleQuery(workOrder)
	)
	console.log("Parsed Workorders after submission", parsedWorkOrdersByQuery)

  return (
    <div className="workorder-container">
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
					<div className="date-picker">
						<div>
							<label className="label">After this date</label>
							<input
								type="date"
								value={state.from_date}
								onChange={(event) => changeState("from_date", event.target.value)}
							></input>
						</div>
						<div>
							<label className="label">Before this date</label>
							<input
								type="date"
								value={state.to_date}
								onChange={(event) => changeState("to_date", event.target.value)}
							></input>
						</div>
					</div>
	    	</div>
				<button className="button is-link" type="submit">Submit</button>
			</form>
			<h1>Work Orders</h1>
			{validState()? parsedWorkOrdersByQuery: parsedWorkOrders}
    </div>
  )
}