import WorkOrderItems from "./WorkOrderItems"
import Filter from "./Filter"

export default function WorkOrderContainer(props) {
	const parsedWorkOrders = props.workorder.map(workOrder => {
		return (<WorkOrderItems {...workOrder} key={workOrder._id}/>)
	}).reverse()
	
  return (
    <div className="workorder-container">
			<Filter/>
			<h1>Work Orders</h1>
			{parsedWorkOrders}
    </div>
  )
}