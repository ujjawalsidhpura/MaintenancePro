import WorkOrderItems from "./WorkOrderItems"

export default function WorkOrderContainer(props) {
	console.log("======= Workorder props:", props)
	const parsedWorkOrders = props.workorder.map(workOrder => {
		return (<WorkOrderItems {...workOrder} key={workOrder._id}/>)
	}).reverse()
	console.log("======= Parsed Workorders:", parsedWorkOrders)
	
  return (
    <div className="workorder-container">
			<h1>Work Orders</h1>
			{parsedWorkOrders}
    </div>
  )
}