import WorkOrderItems from "./WorkOrderItems"

export default function WorkOrderContainer(props) {
	let parsedWorkOrders
	props.workorder? 
	parsedWorkOrders = props.workorder.map(workOrder => <WorkOrderItems {...workOrder} key={workOrder._id}/>): 
	parsedWorkOrders = null;

  return (
    <div className="workorder-container">
			<h1>Work Orders</h1>
			{parsedWorkOrders}
    </div>
  )
}