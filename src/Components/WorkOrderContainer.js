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
	<>
		<form className="card workorder-filter" onSubmit={handleSubmit}>
			<h2 className="title">Work Orders</h2>
			<div>
				<h2><strong>Filters</strong></h2>
			</div>
			<div className="filters">
				<div className="filter-input">
					<input 
						className="input" 
						type="text" 
						placeholder="WorkOrder Title" 
						value={state.title}
	    	    onChange={(event) => changeState("title", event.target.value)}
					/>
				</div>
				<div className="filter-input">
					<input 
						className="input" 
						type="text" placeholder="Technician name" 
						value={state.tech_name}
	    	    onChange={(event) => changeState("tech_name", event.target.value)}
					/>
				</div>
				<div className="filter-input">
					<div className="date-picker">
						<div className="from-to">
							<label className="date-label">From</label>
							<input
								type="date"
								value={state.from_date}
								className="date-input"
								onChange={(event) => changeState("from_date", event.target.value)}
							></input>
						</div>
						<div className="from-to">
							<label className="date-label">To</label>
							<input
								type="date"
								value={state.to_date}
								className="date-input"
								onChange={(event) => changeState("to_date", event.target.value)}
							></input>
						</div>
					</div>
	    	</div>
			</div>
		</form>
		<div className="card workorder-labels">
			<span><strong>Title</strong></span>
			<span><strong>Technician</strong></span>
			<span><strong>Description</strong></span>
			<span><strong>Created</strong></span>
			<span><strong>Duration</strong></span>
			<span><strong>Status</strong></span>
		</div>
  	<div className="workorder-container">
			
			{validState()? parsedWorkOrdersByQuery: parsedWorkOrders}
    </div>
	</>

  const technicianView =
  <div className="workorder-container">
  <h1>{user && user.name}'s Work Orders</h1>
  {parsedWorkOrdersByName}
  </div>;

  return (
    (user && user.email === "admin@gmail.com") ? adminView : technicianView
  )
}