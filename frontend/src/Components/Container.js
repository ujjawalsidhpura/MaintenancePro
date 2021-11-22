import Profile from "./Profile";
import { useAuth0 } from '@auth0/auth0-react';
import {  Routes, Route } from 'react-router-dom'
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";
import Start_confirmation from "./Start_confirmation";
import Finish_confirmation from "./Finish_confirmation";
import Today from './Today';
import InventoryContainer from './InventoryContainer';

export default function Container(props) {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="container is-three-quarters">
			{/* <WorkOrderContainer workorder={props.workorder}/> */}
      {/* {isAuthenticated && <Profile/>} */}
      
      {!isAuthenticated && <img id="landing-image" src="https://www.barrierbeachmanagement.com/wp-content/uploads/2014/12/buildingmanagement.jpg"></img>}
				<Routes>
					<Route path="/workorders" element={<WorkOrderContainer workorder={props.workorder}/>} />
					<Route path="/workorders/create" element={<WorkOrderForm/>} />
          <Route path="/start-confirmation" element={<Start_confirmation/>} /> 
          <Route path="/finish-confirmation" element={<Finish_confirmation/>} /> 
          <Route path="/today" element={<Today today={props.today} />} />
          <Route path="/inventory" element={<InventoryContainer inventory={props.inventory} />} />
				</Routes>
    </div>
  )
}