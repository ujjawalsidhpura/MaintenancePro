import WorkOrderItems from "./WorkOrderItems"

export default function WorkOrders(props) {
	let parsedWorkOrders
	props.workorder? 
	parsedWorkOrders = props.workorder.map(workOrder => <WorkOrderItems {...workOrder} key={workOrder._id}/>): 
	parsedWorkOrders = null;

  return (
    <div className="container">
			<h1>Work Orders</h1>
			{parsedWorkOrders}
    </div>
  )
}