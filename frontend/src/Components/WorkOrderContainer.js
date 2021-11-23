// Note: need to either change create work order form, or change database email to make
// parsedWorkOrdersByname working for everyone
import { useState } from "react"
import WorkOrderItems from "./WorkOrderItems"
import { useAuth0 } from '@auth0/auth0-react';

export default function WorkOrderContainer(props) {
  const { user } = useAuth0();

	// console.log("======= Workorder props:", props)
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

	const parsedWorkOrders = props.workorder.map(workOrder => {
		return (<WorkOrderItems {...workOrder} key={workOrder._id}/>)
	}).reverse()

  const parsedWorkOrdersByQuery = validState() && parsedWorkOrders.filter(workOrder => 
    handleQuery(workOrder));

  const parsedWorkOrdersByName = user && parsedWorkOrders.filter(workOrder => 
    workOrder.props.technician === user.name
  )
  
  const adminView = 
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
			</form>
			<h1>Work Orders</h1>
			{validState()? parsedWorkOrdersByQuery: parsedWorkOrders}
    </div>

  const technicianView =
  <div className="workorder-container">
  <h1>{user && user.name}'s Work Orders</h1>
  {parsedWorkOrdersByName}
  </div>;

  return (
    (user && user.email === "ujay@gmail.com") ? adminView : technicianView
  )
}