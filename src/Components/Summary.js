import react from 'react';
import React, { PureComponent, useState, useEffect  } from 'react';
import { ComposedChart, Area, LineChart, Line,BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Summary(props){
  const { workorder } = props;
  console.log("workorders", workorder);

  // console.log("year of workorder",workorder[0].created_on.split("T")[0].split("-")[0])
  // console.log("month of workorder",workorder[0].created_on.split("T")[0].split("-")[1])


  const workorderFilteredByMonth = function(workorders, year) {
    const output = [
      {
        month: "Jan",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Feb",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Mar",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Apr",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "May",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Jun",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Jul",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Aug",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Sep",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Oct",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Nov",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      },
      {
        month: "Dec",
        total_workorder_created: 0,
        completed_workorder: 0,
        unfinished_workorder: 0,
        duration: 0
      }
    ];
    for (const workorder of workorders) {
      // This line of code get the month of workorder.created_on
      if (workorder.created_on.split("T")[0].split("-")[0]===year){
      output[workorder.created_on.split("T")[0].split("-")[1]-1].total_workorder_created += 1;

      if (!workorder.time_completed || workorder.time_completed.split("T")[0].split("-")[1] > workorder.created_on.split("T")[0].split("-")[1]) {
        output[workorder.created_on.split("T")[0].split("-")[1]-1].unfinished_workorder += 1;
      } 
      
      if (workorder.time_completed) {
        output[workorder.time_completed.split("T")[0].split("-")[1]-1].completed_workorder += 1;
      }  
      
      if (workorder.duration) {
        output[workorder.created_on.split("T")[0].split("-")[1]-1].duration += workorder.duration;
      }
    }
    }

    return output;
  };

  const [year, setYear] = useState("2021");

  let workOrderSummary2021 = workorderFilteredByMonth(workorder, "2021");
  const [workOrderSummary, setWorkOrderSummary] = useState(workOrderSummary2021);
  console.log("summary workorders", workOrderSummary); 

  const handleYearChange = (event) => {
    console.log("event target value",event.target.value);
    setYear(event.target.value);
  }

  useEffect(()=>{
    console.log("year,",year);
    const x = workorderFilteredByMonth(workorder, year);
    setWorkOrderSummary(x)
  }, [year])

  useEffect(() =>{


  }, [workOrderSummary]);


  const Dropdown = ({
    options = [
      {value: "2021"},
      {value: "2020"},
      {value: "2019"}
    ]
  }) => {
    return (
        <select
          value={year}
          onChange={e => {
            handleYearChange(e);
            // console.log("summary workorders", workOrderSummary)
            // setWorkOrderSummary(workorderFilteredByMonth(workorder, e.target.value))
            // setSelectedOption(e.target.value)
            }
          }>

          {options.map(o => (
            <option key={o.value} value={o.value}>{o.value}</option>
          ))}
        </select>
    );
  };

  return(
    
    <div className="summary-page" >
    <Dropdown/>
    <h1>Summary of Year 2021</h1>
    <ComposedChart
      width={500}
      height={400}
      data={workOrderSummary}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend wrapperStyle={{top: 0, left: 25}}/>
      <Area type="monotone" dataKey="total_workorder_created" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="completed_workorder" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="unfinished_workorder" stroke="#ff7300" />
    </ComposedChart>
    </div>
  )
}