import WorkOrderItems from "./WorkOrderItems"
import TodayItems from "./TodayItems";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend} from 'recharts';
export default function Today(props) {

  const parsedWorkOrders = props.today.map(workOrder => {
    return (<TodayItems {...workOrder} key={workOrder._id} />)
  }).reverse()

  const workOrderByTechnician = function (workorders, technician) {
    return workorders.filter(workorder =>
      workorder.technician == technician
    )
  }

  const eachTechnician = function (workorders) {
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
      return (<p>{technician} has {workOrderByTechnician(props.today, technician).length} unfinished tasks</p>)
    }
  );
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#9b59b6', '#e74c3c'];

  const dataForPieChart = technicianArray.map(technician => {
    if (technician !== null) {
      return {
        name: technician && technician.split(" ")[0],
        unfinishedtasks: workOrderByTechnician(props.today, technician).length,
        fill: COLORS[technicianArray.indexOf(technician)]
      }
    }
  }
  );
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>

    );
  };
  return (
		<>
    	<div className="today-panel">
    	  <h1 className="title">Today's Work Orders</h1>
				<div className="card today-summary">
    	  	<h2 className="card-header card-header-title">There are {props.today.length} unfinished tasks</h2>
  				<div className="card-content">
  				  <div className="content today-summary-content">
							<div className="tech-summary">
    	  				{ summaryForEachTechnicain }
							</div>
							<PieChart 
								title="hello" 
								width={300} 
								height={200}
							>
								<Pie 
								isAnimationActive={false}
								label={renderCustomizedLabel}
								labelLine={false}
								cx={100}
								cy={80}
								data={dataForPieChart} 
								dataKey="unfinishedtasks" 
								outerRadius={70} 
								fill="#fff" 
								>
							</Pie>
							<Legend 
								wrapperStyle={{top: 150, left: -25}}
							/>
							</PieChart>
  				  </div>
  				</div>	
				</div>
    	</div>
			<div className="card today-labels">
				<span><strong>Title</strong></span>
				<span><strong>Technician</strong></span>
				<span><strong>Description</strong></span>
				<span><strong>Created</strong></span>
				<span><strong>Status</strong></span>
			</div>
			<div className="today-container">
    		{parsedWorkOrders}
			</div>
		</>
  )
}