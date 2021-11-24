import Profile from "./Profile";
import { useAuth0 } from '@auth0/auth0-react';
import {  Routes, Route } from 'react-router-dom'
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";
import Start_confirmation from "./Start_confirmation";
import Finish_confirmation from "./Finish_confirmation";
import Today from './Today';
import InventoryContainer from './InventoryContainer';
import InventoryForm from "./InventoryForm";

export default function Container(props) {
	const { inventory, today, workorder, setApplicationData } = props
  const { isAuthenticated } = useAuth0();

  return (
    <div>
			{/* <WorkOrderContainer workorder={props.workorder}/> */}
      {/* {isAuthenticated && <Profile/>} */}
      
      {!isAuthenticated && <img id="landing-image" src="https://www.barrierbeachmanagement.com/wp-content/uploads/2014/12/buildingmanagement.jpg"></img>}
				<Routes>
					<Route path="/workorders" element={<WorkOrderContainer workorder={workorder}/>} />
					<Route path="/workorders/create" element={<WorkOrderForm setApplicationData={setApplicationData} today={today} inventory={inventory}/>} />
          <Route path="/start-confirmation" element={<Start_confirmation/>} /> 
          <Route path="/finish-confirmation" element={<Finish_confirmation/>} /> 
          <Route path="/today" element={<Today today={today} />} />
          <Route path="/inventory" element={<InventoryContainer inventory={inventory} />} />
          <Route path="/inventory/create" element={<InventoryForm inventory={inventory} workorder={workorder} today={today} setApplicationData={setApplicationData} />} />
				</Routes>
    </div>
  )
}