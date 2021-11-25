import react from 'react';
import React, { PureComponent, useState, useEffect } from 'react';
import { ComposedChart, Area, Pie, LineChart, Line, BarChart, PieChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Summary(props) {
  const { workorder } = props;
  console.log("workorders", workorder);

  // console.log("year of workorder",workorder[0].created_on.split("T")[0].split("-")[0])
  // console.log("month of workorder",workorder[0].created_on.split("T")[0].split("-")[1])


  /* 
     This function takes two paramerters workorders array and year (string)
     The output will be an array of objects that contain the information of workorders
     for each month of the specific year
  */
  const workorderFilteredByMonth = function (workorders, year) {
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
      if (workorder.created_on.split("T")[0].split("-")[0] === year) {
        output[workorder.created_on.split("T")[0].split("-")[1] - 1].total_workorder_created += 1;

        if (!workorder.time_completed || workorder.time_completed.split("T")[0].split("-")[1] > workorder.created_on.split("T")[0].split("-")[1]) {
          output[workorder.created_on.split("T")[0].split("-")[1] - 1].unfinished_workorder += 1;
        }

        if (workorder.time_completed) {
          output[workorder.time_completed.split("T")[0].split("-")[1] - 1].completed_workorder += 1;
        }

        if (workorder.duration) {
          output[workorder.created_on.split("T")[0].split("-")[1] - 1].duration += workorder.duration;
        }
      }
    }

    return output;
  };

  const [year, setYear] = useState("2021");

  let workOrderSummary2021 = workorderFilteredByMonth(workorder, "2021");
  const [workOrderSummary, setWorkOrderSummary] = useState(workOrderSummary2021);
  console.log("summary workorders", workOrderSummary);

  const calculateMostEfficientMonth = function (workorders) {
    let leastAvgDuration = Infinity;
    let mostEfficientMonth = "";
    for (const workorder of workorders) {
      let efficient = workorder.duration / workorder.total_workorder_created;
      if (efficient < leastAvgDuration) {
        leastAvgDuration = efficient
        mostEfficientMonth = workorder.month;
      }
    }
    return `The most efficient month throughout the year is ${mostEfficientMonth},
              The average time to complete the workorders in this month is ${(leastAvgDuration / 1000 / 3600).toFixed(2)} hours`;
  }


  const mostEfficientMonth = calculateMostEfficientMonth(workOrderSummary);

  const calculateBusiestMonth = function (workorders) {
    let mostworkorders = 0;
    let busiestMonth = "";
    for (const workorder of workorders) {
      if (workorder.total_workorder_created >= mostworkorders) {
        mostworkorders = workorder.total_workorder_created;
        busiestMonth = workorder.month;
      }
    }
    return `The busiest month throughout the year is ${busiestMonth},
            The total number of workorders being created in this month is ${mostworkorders}`;
  }

  const busiestMonth = calculateBusiestMonth(workOrderSummary);

  const eachTechnician = function (workorders) {
    const output = [];
    for (const workorder of workorders) {
      if (!output.includes(workorder.technician)) {
        output.push(workorder.technician);
      }
    }
    return output;
  }

  const technicianArray = eachTechnician(workorder);

  const completedWorkOrderByTechnician = function (workorders, technician) {
    return workorders.filter(workorder =>
      workorder.technician == technician && workorder.time_completed
    )
  }

  const calculateAvgDuration = function (workorders) {
    let total_duration = 0;
    for (const workorder of workorders) {
      if (workorder.duration) total_duration += workorder.duration;
    }
    const avg_duration = total_duration / workorders.length;
    return avg_duration
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#9b59b6', '#e74c3c'];

  const dataForEachTech = technicianArray.map(technician => {
    if (technician !== null) {
      return {
        name: technician,
        completed_tasks: completedWorkOrderByTechnician(workOrderSummary, technician).length,
        avg_duration: calculateAvgDuration(workOrderSummary) / 1000 / 3600,
        fill: COLORS[technicianArray.indexOf(technician)]
      }
    }
  }
  );
  const RADIAN = Math.PI / 180;
  console.log(process.env.REACT_APP_ADMIN_EMAIL);
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

  const getMostEfficientTechnician = function (technicianData) {
    let mostEfficientTech = ""
    let lowest_avg_duration = Infinity;
    for (const eachTechData of technicianData) {
      if (eachTechData.avg_duration <= lowest_avg_duration) {
        lowest_avg_duration = eachTechData.avg_duration;
        mostEfficientTech = eachTechData.name;
      }
    }
    return `The most efficient technician is ${mostEfficientTech}, ${mostEfficientTech} completes one work order in an average of ${(lowest_avg_duration).toFixed(2)} hours`
  }

  const getMostHardWorkingTechnician = function (technicianData) {
    let mostHardWorkingTech = ""
    let mostCompletedWorkOrders = 0;
    for (const eachTechData of technicianData) {
      if (eachTechData.completed_tasks >= mostCompletedWorkOrders) {
        mostCompletedWorkOrders = eachTechData.completed_tasks;
        mostHardWorkingTech = eachTechData.name;
      }
    }
    return `The technician with the most completed workorder is ${mostHardWorkingTech}, with ${mostCompletedWorkOrders} completed workorders`
  }
  const mostEfficientTechnician = getMostEfficientTechnician(dataForEachTech);
  const mostHardWorkingTechnician = getMostHardWorkingTechnician(dataForEachTech);

  console.log(dataForEachTech);

  const handleYearChange = (event) => {
    console.log("event target value", event.target.value);
    setYear(event.target.value);
  }

  useEffect(() => {
    console.log("year,", year);
    const x = workorderFilteredByMonth(workorder, year);
    setWorkOrderSummary(x)
  }, [year])

  useEffect(() => {


  }, [workOrderSummary]);


  const Dropdown = ({
    options = [
      { value: "2021" },
      { value: "2020" },
      { value: "2019" }
    ]
  }) => {
    return (
      <select
        value={year}
				className="dropdown input"
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


  return (
		<>
			<div className="summary-page" >
				<h1 className="title summary-header">Summary of <Dropdown />: </h1>
				<div className="summary-content">

					<div className="card summary-field">
						<div className="summary-paragraph">
							<p class="tag is-light">Most Efficient Month</p>
							<h2><i>{mostEfficientMonth}</i></h2>
						</div>
						<div className="summary-paragraph">
							<p class="tag is-light">Most Efficient Technician</p>
							<h2><i>{mostEfficientTechnician}</i></h2>
						</div>
						<div className="summary-paragraph">
							<p class="tag is-light">Most Completed Workorders</p>
							<h2><i>{mostHardWorkingTechnician}</i></h2>
						</div>
						<div className="summary-paragraph">
							<p class="tag is-light">Busiest Month</p>
							<h2><i>{busiestMonth}</i></h2>
						</div>
					</div>

					<div className="card summary-field">
						<h1><b>Work Order Summary for year {year}</b></h1>
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
							<Legend wrapperStyle={{ top: 0, left: 25 }} />
							<Area type="monotone" dataKey="total_workorder_created" fill="#8884d8" stroke="#8884d8" />
							<Bar dataKey="completed_workorder" barSize={20} fill="#413ea0" />
							<Line type="monotone" dataKey="unfinished_workorder" stroke="#ff7300" />
						</ComposedChart>
					</div>

					<div className="card summary-field">
						<h1><b>Work Orders Completed by Technicians for year {year}</b></h1>
						<ResponsiveContainer 
							width="100%" 
							height={250}
						>
							<PieChart width={400} height={400}>
								<Legend wrapperStyle={{ top: 10, left: 25 }} />
								<Pie
									isAnimationActive={false}
									label={renderCustomizedLabel}
									labelLine={false}
									cx={300}
									cy={120}
									data={dataForEachTech}
									dataKey="completed_tasks"
									outerRadius={100}
									fill="#fff"
								>
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>

					<div className="card summary-field">
						<h1><b>Avg Time Spent on Workorder for each Technician</b></h1>
						<BarChart
							width={500}
							height={300}
							data={dataForEachTech}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="avg_duration" fill="#8884d8" />
						</BarChart>
					</div>
				</div>
			</div>
		</>
  )
}