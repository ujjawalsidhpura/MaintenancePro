import WorkOrderItems from "./WorkOrderItems"

export default function Today(props) {
  console.log("today at glance",props.today);
  const parsedWorkOrders = props.today.map(workOrder => {
    return (<WorkOrderItems {...workOrder} key={workOrder._id} />)
  }).reverse()

  const workOrderByTechnician = function(workorders, technician) {
    return workorders.filter(workorder => 
        workorder.technician == technician
      )
  }

  const eachTechnician = function(workorders) {
    const output = [];
    for (const workorder of workorders) {
      if (!output.includes(workorder.technician)) {
        output.push(workorder.technician);
      }
    }
    return output;
  }

  const technicianArray = eachTechnician(props.today);
  
  const summaryForEachTechnicain = technicianArray.map(technician =>
    {
      return (<h2>{technician} has {workOrderByTechnician(props.today, technician).length} unfinished tasks</h2>)
    }
  );
  for (const technician of technicianArray) {
    console.log(`${technician} has ${workOrderByTechnician(props.today, technician).length} unfinished tasks`)
  }
  // console.log("eachtechnician",eachTechnician(props.today));
  // console.log("workOrderByTechnician",workOrderByTechnician(props.today, "Ujjawal Sidhpura"))
  return (
    <div className="workorder-container">
      <h1>Today's Work Orders</h1>
      <h2>There are {props.today.length} unfinished tasks</h2>
      { summaryForEachTechnicain }
      {parsedWorkOrders}
      
    </div>
  )
}