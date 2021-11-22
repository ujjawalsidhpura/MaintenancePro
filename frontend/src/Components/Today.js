import WorkOrderItems from "./WorkOrderItems"
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const dataForPieChart = technicianArray.map(technician =>
    { if (technician !== null) {
      return {
        name: technician && technician.split(" ")[0],
        unfinishedtasks:  workOrderByTechnician(props.today, technician).length,
        fill: COLORS[technicianArray.indexOf(technician)]
      }
    }
    }
  );
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y+10} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {dataForPieChart[index].name}
        {'\r\n'}
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      
    );
  };
  console.log(dataForPieChart);
  return (
    <div className="workorder-container">
      <h1>Today's Work Orders</h1>
      <h2>There are {props.today.length} unfinished tasks</h2>
      { summaryForEachTechnicain }
      <PieChart width={400} height={400}>
        <Pie 
        isAnimationActive={false}
        label={renderCustomizedLabel}
        labelLine={false}
        cx={200}
        cy={200}
        data={dataForPieChart} 
        dataKey="unfinishedtasks" 
        outerRadius={150} 
        fill="#fff" 
        >
      {dataForPieChart.map(eachPie => {
          return (<h1>{eachPie.unfinishedtasks}</h1>)
      })}
        </Pie>
      </PieChart>
      {parsedWorkOrders}
    </div>
  )
}