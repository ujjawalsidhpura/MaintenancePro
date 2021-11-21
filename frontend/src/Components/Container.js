<<<<<<< HEAD
import Profile from "./Profile";
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
=======
import { Routes, Route } from 'react-router-dom'
>>>>>>> main
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";

export default function Container(props) {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="container is-three-quarters">
<<<<<<< HEAD
			{/* <WorkOrderContainer workorder={props.workorder}/> */}
      {/* {isAuthenticated && <Profile/>} */}
      
      {!isAuthenticated && <img id="landing-image" src="https://www.barrierbeachmanagement.com/wp-content/uploads/2014/12/buildingmanagement.jpg"></img>}
				<Routes>
					<Route path="/workorders" element={<WorkOrderContainer workorder={props.workorder}/>} />
					<Route path="/workorders/create" element={<WorkOrderForm/>} />
				</Routes>
=======
      <Routes>
        <Route path="/workorders" element={<WorkOrderContainer workorder={props.workorder} />} />
        <Route path="/workorders/create" element={<WorkOrderForm />} />
      </Routes>
>>>>>>> main
    </div>
  )
}