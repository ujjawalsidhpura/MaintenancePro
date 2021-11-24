import WorkOrderItems from "./WorkOrderItems"
import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function Today(props) {

  const parsedWorkOrders = props.today.map(workOrder => {
    return (<WorkOrderItems {...workOrder} key={workOrder._id} />)
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

  const summaryForEachTechnicain = technicianArray.map(technician => {
    return (<h2>{technician} has {workOrderByTechnician(props.today, technician).length} unfinished tasks</h2>)
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
    <div className="workorder-container">
      <h1>Today's Work Orders</h1>
      <h2>There are {props.today.length} unfinished tasks</h2>
      {summaryForEachTechnicain}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart title="hello" width={400} height={400}>
          <Legend wrapperStyle={{ top: 0, left: 25 }} />
          <Pie
            isAnimationActive={false}
            label={renderCustomizedLabel}
            labelLine={false}
            cx={300}
            cy={120}
            data={dataForPieChart}
            dataKey="unfinishedtasks"
            outerRadius={100}
            fill="#fff"
          >

          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {parsedWorkOrders}
    </div>
  )
}