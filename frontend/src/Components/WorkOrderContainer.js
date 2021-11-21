// Note: need to either change create work order form, or change database email to make
// parsedWorkOrdersByname working for everyone
import WorkOrderItems from "./WorkOrderItems"
import { useAuth0 } from '@auth0/auth0-react';
import { matchNameWithEmail } from '../helpers/matchNameWithEmail'

export default function WorkOrderContainer(props) {
  const { user } = useAuth0();
  console.log(user);

	console.log("======= Workorder props:", props)
	const parsedWorkOrders = props.workorder.map(workOrder => {
		return (<WorkOrderItems {...workOrder} key={workOrder._id}/>)
	}).reverse()
	console.log("======= Parsed Workorders:", parsedWorkOrders)
	
  const parsedWorkOrdersByName = user && props.workorder.map(workOrder => {
    if ( workOrder.technician === user.name) {
      return (<WorkOrderItems {...workOrder} key={workOrder._id}/>)
    }
    console.log("technician",workOrder.technician)
    user && console.log("user name",user.name)
  })

  const adminView =     
  <div className="workorder-container">
  <h1>Work Orders</h1>
  {parsedWorkOrders}
  </div>;

  const technicianView = 
  <div className="workorder-container">
  <h1>{user && user.name}'s Work Orders</h1>
  {parsedWorkOrdersByName}
  </div>;

  return (
    (user && user.email === "ujay@gmail.com") ? adminView : technicianView
  )
}