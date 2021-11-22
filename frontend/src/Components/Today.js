import WorkOrderItems from "./WorkOrderItems"

export default function Today(props) {
  console.log("today at glance",props.today);
  const parsedWorkOrders = props.today.map(workOrder => {
    return (<WorkOrderItems {...workOrder} key={workOrder._id} />)
  }).reverse()

  const workOrderByTechnician = function(workorders, technician) {
    return workorders.filter(workorder => 
        workorder.technician === technician
      )
  }

  console.log(workOrderByTechnician(parsedWorkOrders, "Shuhao Zhang"))
  return (
    <div className="workorder-container">
      <h1>Today's Work Orders</h1>
      <h2>There are {props.today.length} unfinished tasks</h2>
      {parsedWorkOrders}
    </div>
  )
}