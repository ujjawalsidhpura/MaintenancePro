import WorkOrderItems from "./WorkOrderItems"

export default function Today(props) {

  const parsedWorkOrders = props.today.map(workOrder => {
    return (<WorkOrderItems {...workOrder} key={workOrder._id} />)
  }).reverse()

  return (
    <div className="workorder-container">
      <h1>Today's Work Orders</h1>
      {parsedWorkOrders}
    </div>
  )
}